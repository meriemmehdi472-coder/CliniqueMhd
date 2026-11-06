# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2026_11_04_000700) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assistants", primary_key: "id_assistant", force: :cascade do |t|
    t.string "nom", null: false
    t.string "prenom", null: false
    t.string "email"
    t.string "telephone"
  end

  create_table "diagnostics", primary_key: "id_diagnostic", force: :cascade do |t|
    t.bigint "id_rdv", null: false
    t.string "compte_rendu"
    t.string "data_diagnostic"
    t.index ["id_rdv"], name: "index_diagnostics_on_id_rdv"
  end

  create_table "disponibilites", force: :cascade do |t|
    t.date "date", null: false
    t.bigint "medcin_id", null: false
    t.time "heure", null: false
    t.string "statut"
    t.index ["medcin_id"], name: "index_disponibilites_on_medcin_id"
  end

  create_table "documents", primary_key: "id_document", force: :cascade do |t|
    t.bigint "id_patient", null: false
    t.string "nom", null: false
    t.text "type"
    t.string "chemin_fichier", null: false
    t.date "date_televersement", null: false
    t.index ["id_patient"], name: "index_documents_on_id_patient"
  end

  create_table "medecins", primary_key: "id_medecin", force: :cascade do |t|
    t.string "nom", null: false
    t.string "prenom", null: false
    t.string "specialite"
    t.string "email"
    t.string "telephone"
    t.bigint "id_assistant"
    t.index ["id_assistant"], name: "index_medecins_on_id_assistant"
  end

  create_table "patients", primary_key: "id_patient", force: :cascade do |t|
    t.string "nom", null: false
    t.string "prenom", null: false
    t.date "date_naissance"
    t.text "sexe"
    t.string "email"
    t.string "telephone"
    t.string "adresse"
  end

  create_table "rendez_vous", primary_key: "id_rdv", force: :cascade do |t|
    t.bigint "id_patient", null: false
    t.bigint "id_medecin", null: false
    t.bigint "id_assistant"
    t.date "date", null: false
    t.time "heure_rdv", null: false
    t.string "motif"
    t.string "statut"
    t.index ["id_assistant"], name: "index_rendez_vous_on_id_assistant"
    t.index ["id_medecin"], name: "index_rendez_vous_on_id_medecin"
    t.index ["id_patient"], name: "index_rendez_vous_on_id_patient"
  end

  add_foreign_key "diagnostics", "rendez_vous", column: "id_rdv", primary_key: "id_rdv"
  add_foreign_key "disponibilites", "medecins", column: "medcin_id", primary_key: "id_medecin"
  add_foreign_key "documents", "patients", column: "id_patient", primary_key: "id_patient"
  add_foreign_key "medecins", "assistants", column: "id_assistant", primary_key: "id_assistant"
  add_foreign_key "rendez_vous", "assistants", column: "id_assistant", primary_key: "id_assistant"
  add_foreign_key "rendez_vous", "medecins", column: "id_medecin", primary_key: "id_medecin"
  add_foreign_key "rendez_vous", "patients", column: "id_patient", primary_key: "id_patient"
end
