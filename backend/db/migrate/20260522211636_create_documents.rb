class CreateDocuments < ActiveRecord::Migration[8.1]
  def change
    create_table :documents do |t|
      t.references :dossier_medical, null: false, foreign_key: true
      t.references :uploaded_by, null: false, foreign_key: { to_table: :users }
      t.string :nom_fichier
      t.string :chemin_fichier
      t.string :type_document
      t.string :extension
      t.string :status

      t.timestamps
    end
  end
end
