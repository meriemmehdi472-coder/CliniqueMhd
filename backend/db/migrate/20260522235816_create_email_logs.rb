class CreateEmailLogs < ActiveRecord::Migration[8.1]
  def change
    create_table :email_logs do |t|
      t.references :destinataire, null: false, foreign_key: {to_table: :users}
      t.string :type_email
      t.string :status
      t.datetime :date_envoi

      t.timestamps
    end
  end
end
