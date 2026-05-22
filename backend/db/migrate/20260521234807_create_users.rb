class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.date :birth_date
      t.string :password_digest
      t.string :role
      t.string :status

      t.timestamps
    end
  end
end
