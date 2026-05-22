class Document < ApplicationRecord
  belongs_to :dossier_medical
  belongs_to :uploaded_by, class_name: "User"
end