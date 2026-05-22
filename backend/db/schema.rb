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

ActiveRecord::Schema[8.1].define(version: 2026_05_22_223600) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "allergies", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.bigint "dossier_medical_id", null: false
    t.string "niveau_risque"
    t.string "nom"
    t.datetime "updated_at", null: false
    t.index ["dossier_medical_id"], name: "index_allergies_on_dossier_medical_id"
  end

  create_table "antecedent_medicals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "date_diagnostic"
    t.text "description"
    t.bigint "dossier_medical_id", null: false
    t.string "nom"
    t.datetime "updated_at", null: false
    t.index ["dossier_medical_id"], name: "index_antecedent_medicals_on_dossier_medical_id"
  end

  create_table "assistants", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_assistants_on_user_id"
  end

  create_table "consultations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "diagnostic"
    t.bigint "medecin_id", null: false
    t.text "notes"
    t.text "prescription"
    t.bigint "rendez_vou_id", null: false
    t.string "status"
    t.text "traitement"
    t.datetime "updated_at", null: false
    t.index ["medecin_id"], name: "index_consultations_on_medecin_id"
    t.index ["rendez_vou_id"], name: "index_consultations_on_rendez_vou_id"
  end

  create_table "demandes", force: :cascade do |t|
    t.bigint "assistant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "date_traitement"
    t.text "message"
    t.string "status"
    t.string "type_demande"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["assistant_id"], name: "index_demandes_on_assistant_id"
    t.index ["user_id"], name: "index_demandes_on_user_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "chemin_fichier"
    t.datetime "created_at", null: false
    t.bigint "dossier_medical_id", null: false
    t.string "extension"
    t.string "nom_fichier"
    t.string "status"
    t.string "type_document"
    t.datetime "updated_at", null: false
    t.bigint "uploaded_by_id", null: false
    t.index ["dossier_medical_id"], name: "index_documents_on_dossier_medical_id"
    t.index ["uploaded_by_id"], name: "index_documents_on_uploaded_by_id"
  end

  create_table "dossier_medicals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "groupe_sanguin"
    t.string "numero_dossier"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_dossier_medicals_on_user_id"
  end

  create_table "medecins", force: :cascade do |t|
    t.integer "anciennete"
    t.datetime "created_at", null: false
    t.text "description"
    t.jsonb "reseaux_sociaux", default: [], null: false
    t.string "specialite"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_medecins_on_user_id"
  end

  create_table "rendez_vous", force: :cascade do |t|
    t.bigint "assistant_id", null: false
    t.bigint "client_id", null: false
    t.datetime "created_at", null: false
    t.date "date_rdv"
    t.time "heure_debut"
    t.time "heure_fin"
    t.bigint "medecin_id", null: false
    t.text "motif"
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["assistant_id"], name: "index_rendez_vous_on_assistant_id"
    t.index ["client_id"], name: "index_rendez_vous_on_client_id"
    t.index ["medecin_id"], name: "index_rendez_vous_on_medecin_id"
  end

  create_table "users", force: :cascade do |t|
    t.date "birth_date"
    t.datetime "created_at", null: false
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.string "phone"
    t.string "role"
    t.string "status"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "allergies", "dossier_medicals"
  add_foreign_key "antecedent_medicals", "dossier_medicals"
  add_foreign_key "assistants", "users"
  add_foreign_key "consultations", "medecins"
  add_foreign_key "consultations", "rendez_vous"
  add_foreign_key "demandes", "assistants"
  add_foreign_key "demandes", "users"
  add_foreign_key "documents", "dossier_medicals"
  add_foreign_key "documents", "users", column: "uploaded_by_id"
  add_foreign_key "dossier_medicals", "users"
  add_foreign_key "medecins", "users"
  add_foreign_key "rendez_vous", "assistants"
  add_foreign_key "rendez_vous", "medecins"
  add_foreign_key "rendez_vous", "users", column: "client_id"
end
