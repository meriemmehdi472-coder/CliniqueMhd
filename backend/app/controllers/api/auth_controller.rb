module Api
  class AuthController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :csrf

    def csrf
      render json: { csrf_token: form_authenticity_token }
    end

    def register
      user = nil
      User.transaction do
        user = User.create!(email: params.require(:email), password: params.require(:password), role: "patient")
        user.create_patient!(
          nom: params.require(:nom),
          prenom: params.require(:prenom),
          date_naissance: params[:date_naissance],
          email_contact: user.email,
          telephone: params[:telephone],
          adresse: params[:adresse],
          sexe: params[:sexe]
        )
      end
      reset_session
      session[:user_id] = user.id
      render json: { user: user_json(user) }, status: :created
    rescue ActionController::ParameterMissing => error
      render json: { error: "Le champ #{error.param} est obligatoire." }, status: :unprocessable_entity
    rescue ActiveRecord::RecordInvalid => error
      render json: { errors: error.record.errors.full_messages }, status: :unprocessable_entity
    end

    def create
      user = User.find_by(email: params[:email].to_s.strip.downcase)
      unless user&.authenticate(params[:password].to_s)
        return render json: { error: "Email ou mot de passe incorrect." }, status: :unauthorized
      end

      reset_session
      session[:user_id] = user.id
      render json: { user: user_json(user) }
    end

    def show
      authenticate_user!
      render json: { user: user_json(current_user) } if current_user
    end

    def destroy
      reset_session
      head :no_content
    end
  end
end
