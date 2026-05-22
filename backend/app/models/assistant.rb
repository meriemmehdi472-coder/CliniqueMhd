class Assistant < ApplicationRecord
  belongs_to :user
 has_many :rendez_vous, class_name: "RendezVou", dependent: :destroy
 has_many :demandes, dependent: :destroy
end
