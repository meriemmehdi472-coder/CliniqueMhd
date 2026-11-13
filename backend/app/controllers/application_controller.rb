class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  attr_reader :current_user

  private

  def authenticate_user!
    @current_user = User.find_by(id: session[:user_id])
    render json: { error: "Authentification requise." }, status: :unauthorized unless @current_user
  end

  def user_json(user)
    profile = case user.role
    when "patient" then user.patient
    when "medecin" then user.medecin
    when "assistant" then user.assistant
    end

    { id: user.id, email: user.email, role: user.role, nom: profile&.nom, prenom: profile&.prenom }
  end
end
