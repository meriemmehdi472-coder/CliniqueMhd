class CreateRendezVous < ActiveRecord::Migration[8.1]
  def change
    create_table :rendez_vous do |t|
      t.references :client, null: false, foreign_key: { to_table: :users }
      t.references :medecin, null: false, foreign_key: true
      t.references :assistant, null: false, foreign_key: true
      t.date :date_rdv
      t.time :heure_debut
      t.time :heure_fin
      t.text :motif
      t.string :status

      t.timestamps
    end
  end
end