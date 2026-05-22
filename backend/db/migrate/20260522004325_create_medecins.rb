class CreateMedecins < ActiveRecord::Migration[8.1]
  def change
    create_table :medecins do |t|
      t.references :user, null: false, foreign_key: true
      t.string :specialite
      t.integer :anciennete
      t.text :description
      t.jsonb :reseaux_sociaux

      t.timestamps
    end
  end
end
