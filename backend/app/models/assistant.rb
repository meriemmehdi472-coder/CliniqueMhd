class Assistant < ApplicationRecord
  self.primary_key = :id_assistant

  belongs_to :user, optional: true
  has_many :medecins, class_name: "Medecin", foreign_key: :id_assistant, primary_key: :id_assistant, dependent: :nullify
  has_many :rendez_vous, class_name: "RendezVous", foreign_key: :id_assistant, primary_key: :id_assistant, dependent: :nullify

  validates :user, presence: true, on: :create
  validate :user_must_have_assistant_role

  private

  def user_must_have_assistant_role
    errors.add(:user, "doit avoir le rôle assistant") if user && user.role != "assistant"
  end
end
