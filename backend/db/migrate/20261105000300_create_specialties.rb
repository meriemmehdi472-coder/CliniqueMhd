class CreateSpecialties < ActiveRecord::Migration[7.1]
  def up
    create_table :specialties do |t|
      t.string :name, null: false
      t.text :description
      t.timestamps
    end

    add_index :specialties, "LOWER(name)", unique: true, name: "index_specialties_on_lower_name"
    add_reference :medecins, :specialty, foreign_key: true

    execute <<~SQL
      INSERT INTO specialties (name, created_at, updated_at)
      SELECT DISTINCT ON (LOWER(BTRIM(specialite))) BTRIM(specialite), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      FROM medecins
      WHERE specialite IS NOT NULL AND BTRIM(specialite) <> ''
      ORDER BY LOWER(BTRIM(specialite)), BTRIM(specialite)
      ON CONFLICT DO NOTHING
    SQL

    execute <<~SQL
      UPDATE medecins
      SET specialty_id = specialties.id
      FROM specialties
      WHERE medecins.specialite IS NOT NULL
        AND LOWER(BTRIM(medecins.specialite)) = LOWER(BTRIM(specialties.name))
    SQL
  end

  def down
    remove_reference :medecins, :specialty, foreign_key: true
    drop_table :specialties
  end
end
