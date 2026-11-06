class RemoveLegacySpecialiteFromMedecins < ActiveRecord::Migration[7.1]
  def up
    remove_column :medecins, :specialite, :string
  end

  def down
    add_column :medecins, :specialite, :string

    execute <<~SQL
      UPDATE medecins
      SET specialite = specialties.name
      FROM specialties
      WHERE medecins.specialty_id = specialties.id
    SQL
  end
end
