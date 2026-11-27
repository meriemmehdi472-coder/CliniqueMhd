# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# These profiles make the patient appointment flow usable in a fresh local
# environment. They are intentionally excluded from production and preproduction.
if Rails.env.development?
  [
    { first_name: "Jean", last_name: "Martin", specialty: "Médecine générale" },
    { first_name: "Nadia", last_name: "Bernard", specialty: "Cardiologie" }
  ].each do |doctor_data|
    specialty = Specialty.find_or_create_by!(name: doctor_data[:specialty])
    email = "#{doctor_data[:first_name].parameterize}.#{doctor_data[:last_name].parameterize}@localhost.test"
    user = User.find_or_initialize_by(email: email)

    unless user.persisted?
      user.role = "medecin"
      user.password = SecureRandom.hex(32)
      user.save!
    end

    Medecin.find_or_create_by!(user: user) do |doctor|
      doctor.nom = doctor_data[:last_name]
      doctor.prenom = doctor_data[:first_name]
      doctor.email_contact = email
      doctor.specialty = specialty
    end
  end
end
