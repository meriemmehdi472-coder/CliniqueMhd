class Document < ApplicationRecord
  self.primary_key = :id_document
  self.inheritance_column = :_type_disabled

  belongs_to :patient, foreign_key: :id_patient, primary_key: :id_patient
end
