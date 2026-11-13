class AssignSpecialtyToAssistants < ActiveRecord::Migration[7.1]
  def up
    add_reference :assistants, :specialty, foreign_key: true, index: { unique: true }

    execute <<~SQL
      WITH assistant_specialty_candidates AS (
        SELECT id_assistant, MIN(specialty_id) AS specialty_id
        FROM medecins
        WHERE id_assistant IS NOT NULL
        GROUP BY id_assistant
        HAVING COUNT(*) = COUNT(specialty_id)
          AND COUNT(DISTINCT specialty_id) = 1
      ), unambiguous_specialties AS (
        SELECT id_assistant, specialty_id
        FROM (
          SELECT id_assistant,
                 specialty_id,
                 COUNT(*) OVER (PARTITION BY specialty_id) AS assistant_count
          FROM assistant_specialty_candidates
        ) candidates
        WHERE assistant_count = 1
      )
      UPDATE assistants
      SET specialty_id = unambiguous_specialties.specialty_id
      FROM unambiguous_specialties
      WHERE assistants.id_assistant = unambiguous_specialties.id_assistant
    SQL
  end

  def down
    remove_reference :assistants, :specialty, foreign_key: true
  end
end
