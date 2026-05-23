class EmailLog < ApplicationRecord
  belongs_to :destinataire, class_name: "User"
end
