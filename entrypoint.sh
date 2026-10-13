#!/bin/bash -e

# Prepare database if running rails server or general startup
cd /rails
bundle exec rails db:prepare || true

# Start Nginx in the background
echo "Starting Nginx..."
nginx

# Start Rails server in the foreground
echo "Starting Rails server..."
exec bundle exec rails server -b 0.0.0.0 -p 3000
