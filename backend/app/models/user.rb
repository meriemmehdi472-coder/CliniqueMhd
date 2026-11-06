class User < ApplicationRecord
  ROLES = %w[patient medecin assistant].freeze

  has_one :patient, dependent: :restrict_with_error
  has_one :medecin, dependent: :restrict_with_error
  has_one :assistant, dependent: :restrict_with_error

  normalizes :email, with: ->(email) { email.strip.downcase }

  validates :email, :password_digest, :role, presence: true
  validates :email, uniqueness: { case_sensitive: false }
  validates :role, inclusion: { in: ROLES }
end
