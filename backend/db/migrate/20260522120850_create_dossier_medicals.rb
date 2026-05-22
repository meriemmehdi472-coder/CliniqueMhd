class CreateDossierMedicals < ActiveRecord::Migration[8.1]
  def change
    create_table :dossier_medicals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :numero_dossier
      t.string :groupe_sanguin

      t.timestamps
    end
  end
end
