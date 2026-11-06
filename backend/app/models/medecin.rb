class Medecin < ApplicationRecord
  self.primary_key = :id_medecin

  belongs_to :user, optional: true
  belongs_to :specialty, optional: true
  belongs_to :assistant, optional: true, foreign_key: :id_assistant, primary_key: :id_assistant
  has_many :rendez_vous, class_name: "RendezVous", foreign_key: :id_medecin, primary_key: :id_medecin, dependent: :restrict_with_error
  has_many :disponibilites, class_name: "Disponibilite", foreign_key: :medcin_id, primary_key: :id_medecin, dependent: :restrict_with_error

  validates :user, presence: true, on: :create
  validate :user_must_have_medecin_role

  private

  def user_must_have_medecin_role
    errors.add(:user, "doit avoir le rôle médecin") if user && user.role != "medecin"
  end
end
