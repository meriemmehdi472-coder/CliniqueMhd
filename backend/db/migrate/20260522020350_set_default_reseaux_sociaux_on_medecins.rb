class SetDefaultReseauxSociauxOnMedecins < ActiveRecord::Migration[8.1]
  def up
    change_column_default :medecins, :reseaux_sociaux, []

    execute <<~SQL
      UPDATE medecins
      SET reseaux_sociaux = '[]'
      WHERE reseaux_sociaux IS NULL;
    SQL

    change_column_null :medecins, :reseaux_sociaux, false
  end

  def down
    change_column_default :medecins, :reseaux_sociaux, nil
    change_column_null :medecins, :reseaux_sociaux, true
  end
end