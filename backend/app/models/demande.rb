class Demande < ApplicationRecord
  belongs_to :user
  belongs_to :assistant
end
