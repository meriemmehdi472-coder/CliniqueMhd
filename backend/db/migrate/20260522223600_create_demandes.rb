class CreateDemandes < ActiveRecord::Migration[8.1]
  def change
    create_table :demandes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :assistant, null: false, foreign_key: true
      t.string :type_demande
      t.text :message
      t.string :status
      t.datetime :date_traitement

      t.timestamps
    end
  end
end
