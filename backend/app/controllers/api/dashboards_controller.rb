module Api
  class DashboardsController < ApplicationController
    before_action :authenticate_user!

    def show
      unless User::ROLES.include?(params[:role]) && current_user.role == params[:role]
        return render json: { error: "Accès interdit pour ce rôle." }, status: :forbidden
      end

      render json: { user: user_json(current_user), role: current_user.role }
    end
  end
end
