class Medecin < ApplicationRecord
  self.primary_key = :id_medecin

  belongs_to :user, optional: true
  belongs_to :specialty, optional: true
  belongs_to :assistant, optional: true, foreign_key: :id_assistant, primary_key: :id_assistant
  has_many :rendez_vous, class_name: "RendezVous", foreign_key: :id_medecin, primary_key: :id_medecin, dependent: :restrict_with_error
  has_many :disponibilites, class_name: "Disponibilite", foreign_key: :medcin_id, primary_key: :id_medecin, dependent: :restrict_with_error

  validates :user, presence: true, on: :create
  validate :user_must_have_medecin_role
  validate :assistant_must_share_specialty

  private

  def user_must_have_medecin_role
    errors.add(:user, "doit avoir le rôle médecin") if user && user.role != "medecin"
  end

  def assistant_must_share_specialty
    return unless assistant

    if assistant.specialty_id.blank?
      errors.add(:assistant, "doit avoir une spécialité affectée")
    elsif specialty_id != assistant.specialty_id
      errors.add(:specialty, "doit être celle de l’assistant")
    end
  end
end
