module Api
  class DashboardsController < ApplicationController
    before_action :authenticate_user!

    def show
      unless User::ROLES.include?(params[:role]) && current_user.role == params[:role]
        return render json: { error: "Accès interdit pour ce rôle." }, status: :forbidden
      end

      dashboard = case current_user.role
      when "patient" then patient_dashboard
      when "medecin" then doctor_dashboard
      when "assistant" then assistant_dashboard
      end

      return render json: { error: "Aucun profil n’est associé à ce compte." }, status: :not_found unless dashboard

      render json: dashboard
    end

    private

    def patient_dashboard
      profile = current_user.patient
      return unless profile

      appointments = upcoming_appointments(profile.rendez_vous)
        .includes(medecin: :specialty)
        .order(:date, :heure_rdv)

      documents = profile.documents.order(date_televersement: :desc)

      {
        role: "patient",
        stats: {
          upcoming_appointments: appointments.count,
          documents: documents.count
        },
        appointments: appointments.limit(8).map { |appointment| serialize_appointment(appointment) },
        documents: documents.limit(8).map { |document| serialize_document(document) }
      }
    end

    def doctor_dashboard
      profile = current_user.medecin
      return unless profile

      appointments = upcoming_appointments(profile.rendez_vous)
        .includes(:patient, medecin: :specialty)
        .order(:date, :heure_rdv)
      today_appointments = upcoming_appointments(profile.rendez_vous).where(date: Date.current)
      availability = profile.disponibilites
        .where("date >= ?", Date.current)
        .order(:date, :heure)

      {
        role: "medecin",
        stats: {
          today_appointments: today_appointments.count,
          upcoming_appointments: appointments.count,
          patients: profile.rendez_vous.distinct.count(:id_patient),
          diagnostics: Diagnostic.joins(:rendez_vous).where(rendez_vous: { id_medecin: profile.id_medecin }).count
        },
        appointments: appointments.limit(8).map { |appointment| serialize_appointment(appointment) },
        availability: availability.limit(5).map { |slot| serialize_availability(slot) }
      }
    end

    def assistant_dashboard
      profile = current_user.assistant
      return unless profile

      appointments = upcoming_appointments(profile.rendez_vous)
        .includes(:patient, medecin: :specialty)
        .order(:date, :heure_rdv)
      today_appointments = upcoming_appointments(profile.rendez_vous).where(date: Date.current)
      patient_ids = profile.rendez_vous.select(:id_patient)
      documents = Document.where(id_patient: patient_ids)

      {
        role: "assistant",
        stats: {
          today_appointments: today_appointments.count,
          pending_appointments: pending_appointments(profile.rendez_vous).count,
          doctors: profile.medecins.count,
          documents: documents.count
        },
        appointments: appointments.limit(8).map { |appointment| serialize_appointment(appointment) },
        documents: documents.order(date_televersement: :desc).limit(5).map { |document| serialize_document(document) }
      }
    end

    def pending_appointments(scope)
      scope.where(date: Date.current..)
        .where("LOWER(COALESCE(statut, '')) IN (?)", %w[en attente en_attente à confirmer a_confirmer pending])
    end

    def upcoming_appointments(scope)
      scope.where("date >= ?", Date.current)
        .where("LOWER(COALESCE(statut, '')) NOT IN (?)", %w[annulé annule cancelled canceled])
    end

    def serialize_appointment(appointment)
      {
        id: appointment.id_rdv,
        date: appointment.date,
        time: appointment.heure_rdv&.strftime("%H:%M"),
        status: appointment.statut.presence || "Planifié",
        reason: appointment.motif,
        patient: person_name(appointment.patient),
        doctor: person_name(appointment.medecin, prefix: "Dr"),
        specialty: appointment.medecin.specialty&.name
      }
    end

    def serialize_document(document)
      {
        id: document.id_document,
        name: document.nom,
        type: document.type,
        date: document.date_televersement
      }
    end

    def serialize_availability(slot)
      { date: slot.date, time: slot.heure&.strftime("%H:%M"), status: slot.statut }
    end

    def person_name(profile, prefix: nil)
      return unless profile

      [prefix, profile.prenom, profile.nom].compact_blank.join(" ")
    end
  end
end
