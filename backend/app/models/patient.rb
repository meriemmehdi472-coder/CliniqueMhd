class Patient < ApplicationRecord
  self.primary_key = :id_patient

  belongs_to :user, optional: true
  has_many :rendez_vous, class_name: "RendezVous", foreign_key: :id_patient, primary_key: :id_patient, dependent: :restrict_with_error
  has_many :documents, foreign_key: :id_patient, primary_key: :id_patient, dependent: :restrict_with_error

  validates :user, presence: true, on: :create
  validate :user_must_have_patient_role

  private

  def user_must_have_patient_role
    errors.add(:user, "doit avoir le rôle patient") if user && user.role != "patient"
  end
end
