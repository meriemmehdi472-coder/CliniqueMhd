class CreateClinicTables < ActiveRecord::Migration[7.1]
  def up
    create_table :patients, primary_key: :id_patient, if_not_exists: true do |t|
      t.string :nom, null: false
      t.string :prenom, null: false
      t.date :date_naissance
      t.text :sexe
      t.string :email
      t.string :telephone
      t.string :adresse
    end

    create_table :assistants, primary_key: :id_assistant, if_not_exists: true do |t|
      t.string :nom, null: false
      t.string :prenom, null: false
      t.string :email
      t.string :telephone
    end

    create_table :medecins, primary_key: :id_medecin, if_not_exists: true do |t|
      t.string :nom, null: false
      t.string :prenom, null: false
      t.string :specialite
      t.string :email
      t.string :telephone
      t.bigint :id_assistant
      t.index :id_assistant
    end

    create_table :rendez_vous, primary_key: :id_rdv, if_not_exists: true do |t|
      t.bigint :id_patient, null: false
      t.bigint :id_medecin, null: false
      t.bigint :id_assistant
      t.date :date, null: false
      t.time :heure_rdv, null: false
      t.string :motif
      t.string :statut
      t.index :id_patient
      t.index :id_medecin
      t.index :id_assistant
    end

    create_table :documents, primary_key: :id_document, if_not_exists: true do |t|
      t.bigint :id_patient, null: false
      t.string :nom, null: false
      t.text :type
      t.string :chemin_fichier, null: false
      t.date :date_televersement, null: false
      t.index :id_patient
    end

    create_table :diagnostics, primary_key: :id_diagnostic, if_not_exists: true do |t|
      t.bigint :id_rdv, null: false
      t.string :compte_rendu
      t.string :data_diagnostic
      t.index :id_rdv
    end

    create_table :disponibilites, if_not_exists: true do |t|
      t.date :date, null: false
      t.bigint :medcin_id, null: false
      t.time :heure, null: false
      t.string :statut
      t.index :medcin_id
    end

    add_clinic_foreign_key :documents, :patients, column: :id_patient, primary_key: :id_patient
    add_clinic_foreign_key :rendez_vous, :patients, column: :id_patient, primary_key: :id_patient
    add_clinic_foreign_key :rendez_vous, :medecins, column: :id_medecin, primary_key: :id_medecin
    add_clinic_foreign_key :rendez_vous, :assistants, column: :id_assistant, primary_key: :id_assistant
    add_clinic_foreign_key :diagnostics, :rendez_vous, column: :id_rdv, primary_key: :id_rdv
    add_clinic_foreign_key :disponibilites, :medecins, column: :medcin_id, primary_key: :id_medecin
    add_clinic_foreign_key :medecins, :assistants, column: :id_assistant, primary_key: :id_assistant
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "La migration de base ne supprime pas les tables et leurs données."
  end

  private

  def add_clinic_foreign_key(from_table, to_table, **options)
    column = options.fetch(:column)
    return if foreign_key_exists?(from_table, to_table, column: column)

    add_foreign_key(from_table, to_table, **options)
  end
end
