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
    { id: user.id, email: user.email, role: user.role, nom: user.patient&.nom, prenom: user.patient&.prenom }
  end
end
