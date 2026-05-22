class CreateConsultations < ActiveRecord::Migration[8.1]
  def change
    create_table :consultations do |t|
      t.references :rendez_vou, null: false, foreign_key: true
      t.references :medecin, null: false, foreign_key: true
      t.text :diagnostic
      t.text :traitement
      t.text :prescription
      t.text :notes
      t.string :status

      t.timestamps
    end
  end
end
