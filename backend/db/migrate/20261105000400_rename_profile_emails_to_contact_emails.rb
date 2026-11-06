class RenameProfileEmailsToContactEmails < ActiveRecord::Migration[7.1]
  def change
    rename_column :patients, :email, :email_contact
    rename_column :medecins, :email, :email_contact
    rename_column :assistants, :email, :email_contact
  end
end
