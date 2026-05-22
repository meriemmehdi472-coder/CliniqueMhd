class DossierMedical < ApplicationRecord
  belongs_to :user

  has_many :allergies,class_name: "Allergy",  dependent: :destroy
  has_many :antecedent_medicals, dependent: :destroy
end