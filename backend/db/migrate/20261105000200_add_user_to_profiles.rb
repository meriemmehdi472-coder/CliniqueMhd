class AddUserToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_reference :patients, :user, foreign_key: true, index: { unique: true }
    add_reference :medecins, :user, foreign_key: true, index: { unique: true }
    add_reference :assistants, :user, foreign_key: true, index: { unique: true }
  end
end
