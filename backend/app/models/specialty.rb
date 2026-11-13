class Specialty < ApplicationRecord
  has_many :medecins, dependent: :restrict_with_error
  has_one :assistant, dependent: :restrict_with_error

  normalizes :name, with: ->(name) { name.strip }

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
