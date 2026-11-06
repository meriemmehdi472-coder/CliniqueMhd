class Diagnostic < ApplicationRecord
  self.primary_key = :id_diagnostic

  belongs_to :rendez_vous, class_name: "RendezVous", foreign_key: :id_rdv, primary_key: :id_rdv
end
