module Api
  class AppointmentsController < ApplicationController
    before_action :authenticate_user!
    before_action :require_patient!
    before_action :set_appointment, only: %i[update destroy]

    rescue_from ActiveRecord::RecordNotFound do
      render json: { error: "Rendez-vous introuvable." }, status: :not_found
    end

    def doctors
      doctors = Medecin.includes(:specialty).order(:nom, :prenom)

      render json: {
        doctors: doctors.map { |doctor|
          {
            id: doctor.id_medecin,
            name: ["Dr", doctor.prenom, doctor.nom].compact_blank.join(" "),
            specialty: doctor.specialty&.name
          }
        }
      }
    end

    def index
      appointments = current_user.patient.rendez_vous
                                 .includes(medecin: :specialty)
                                 .order(date: :desc, heure_rdv: :desc)

      render json: {
        appointments: appointments.map { |appointment| appointment_json(appointment) }
      }
    end

    def create
      appointment = current_user.patient.rendez_vous.new(appointment_params)
      appointment.statut = "En attente"

      unless valid_slot?(appointment)
        return render json: {
          error: "La date, l'heure ou le créneau choisi est invalide ou déjà réservé."
        }, status: :unprocessable_entity
      end

      if appointment.save
        render json: { appointment: appointment_json(appointment) }, status: :created
      else
        render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      unless manageable_appointment?(@appointment)
        return render json: {
          error: "Ce rendez-vous ne peut plus être déplacé."
        }, status: :unprocessable_entity
      end

      @appointment.assign_attributes(appointment_params)

      unless valid_slot?(@appointment)
        return render json: {
          error: "La date, l'heure ou le créneau choisi est invalide ou déjà réservé."
        }, status: :unprocessable_entity
      end

      if @appointment.save
        render json: { appointment: appointment_json(@appointment) }, status: :ok
      else
        render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      unless manageable_appointment?(@appointment)
        return render json: {
          error: "Ce rendez-vous ne peut plus être annulé."
        }, status: :unprocessable_entity
      end

      if @appointment.update(statut: "Annulé")
        head :no_content
      else
        render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def appointment_params
      params.require(:appointment).permit(:id_medecin, :date, :heure_rdv, :motif)
    end

    def require_patient!
      return if current_user&.role == "patient" && current_user.patient.present?

      render json: { error: "Accès réservé au patient." }, status: :forbidden
    end

    def set_appointment
      @appointment = current_user.patient.rendez_vous.find(params[:id])
    end

    def valid_slot?(appointment)
      return false unless appointment.date.present? && appointment.heure_rdv.present?
      return false unless future_slot?(appointment.date, appointment.heure_rdv)
      return false unless Medecin.exists?(id_medecin: appointment.id_medecin)

      already_booked = RendezVous
                       .where(id_medecin: appointment.id_medecin,
                              date: appointment.date,
                              heure_rdv: appointment.heure_rdv)
                       .where.not(statut: "Annulé")

      already_booked = already_booked.where.not(id_rdv: appointment.id_rdv) if appointment.persisted?

      already_booked.none?
    end

    def manageable_appointment?(appointment)
      appointment.statut != "Annulé" && future_slot?(appointment.date, appointment.heure_rdv)
    end

    def future_slot?(date, time)
      return false if date.blank? || time.blank?

      appointment_time = Time.zone.parse("#{date} #{time}")
      appointment_time.present? && appointment_time > Time.current
    rescue ArgumentError, TypeError
      false
    end

    def appointment_json(appointment)
      {
        id: appointment.id_rdv,
        doctor_id: appointment.id_medecin,
        doctor: ["Dr", appointment.medecin.prenom, appointment.medecin.nom].compact_blank.join(" "),
        specialty: appointment.medecin.specialty&.name,
        date: appointment.date,
        time: appointment.heure_rdv.strftime("%H:%M"),
        reason: appointment.motif,
        status: appointment.statut
      }
    end
  end
end
