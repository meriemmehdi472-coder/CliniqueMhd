class CreateAllergies < ActiveRecord::Migration[8.1]
  def change
    create_table :allergies do |t|
      t.references :dossier_medical, null: false, foreign_key: true
      t.string :nom
      t.text :description
      t.string :niveau_risque

      t.timestamps
    end
  end
end
