class Disponibilite < ApplicationRecord
  belongs_to :medecin, foreign_key: :medcin_id, primary_key: :id_medecin
end
