class TestSidekiqJob < ApplicationJob
  queue_as :default

  def perform
    Rails.logger.info"Sidekiq fonctionel"
  end
end
