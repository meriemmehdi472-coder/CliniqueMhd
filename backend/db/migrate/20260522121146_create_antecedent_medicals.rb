class CreateAntecedentMedicals < ActiveRecord::Migration[8.1]
  def change
    create_table :antecedent_medicals do |t|
      t.references :dossier_medical, null: false, foreign_key: true
      t.string :nom
      t.text :description
      t.date :date_diagnostic

      t.timestamps
    end
  end
end
