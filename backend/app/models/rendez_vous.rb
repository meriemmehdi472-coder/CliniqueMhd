class RendezVous < ApplicationRecord
  self.primary_key = :id_rdv

  belongs_to :patient, foreign_key: :id_patient, primary_key: :id_patient
  belongs_to :medecin, foreign_key: :id_medecin, primary_key: :id_medecin
  belongs_to :assistant, optional: true, foreign_key: :id_assistant, primary_key: :id_assistant
  has_many :diagnostics, class_name: "Diagnostic", foreign_key: :id_rdv, primary_key: :id_rdv, dependent: :restrict_with_error
end
