class RendezVou < ApplicationRecord
  belongs_to :client, class_name: "User"
  belongs_to :medecin
  belongs_to :assistant
  has_one :consultation, dependent: :destroy
end