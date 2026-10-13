# syntax = docker/dockerfile:1

ARG RUBY_VERSION=3.2.2

# --- Stage 1: Build Frontend ---
FROM node:22-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build Backend Gems ---
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim AS backend-base
WORKDIR /rails

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test"

FROM backend-base AS backend-build
RUN apt-get update -qq \
    && apt-get install --no-install-recommends -y \
    build-essential gcc g++ make libc6-dev git libpq-dev libvips pkg-config
COPY backend/Gemfile backend/Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

COPY backend/ ./
RUN bundle exec bootsnap precompile app/ lib/

# --- Stage 3: Final Unified Runtime Image ---
FROM backend-base

# Install runtime dependencies including nginx
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips postgresql-client nginx && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives
RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default
# Copy built gems and backend code
COPY --from=backend-build /usr/local/bundle /usr/local/bundle
COPY --from=backend-build /rails /rails

# Copy built frontend assets to Nginx web root
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script and make executable
COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

WORKDIR /rails

EXPOSE 80 3000

ENTRYPOINT ["/usr/bin/entrypoint.sh"]
