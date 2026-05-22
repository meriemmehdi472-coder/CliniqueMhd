class User < ApplicationRecord
  has_secure_password
  has_one :medecin, dependent: :destroy
  has_one :assistant, dependent: :destroy
  has_one :dossier_medical, dependent: :destroy
  has_many :uploaded_documents, class_name: "Document", foreign_key: :uploaded_by_id, dependent: :destroy
  has_many :documents, dependent: :destroy
  has_many :rendez_vous, class_name: "RendezVou", foreign_key: :client_id, dependent: :destroy
  has_many :demandes, dependent: :destroy

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true
  validates :status, presence: true
end
