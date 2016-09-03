class AuthenticationController < ApplicationController
  def authenticate_user
    user = User.find_for_database_authentication(email: params[:email])
    if !user
      return render json: {errors: {email:['Invalid Email']}}, status: :unauthorized
    end
    if user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: {errors: {password:['Invalid Password']}}, status: :unauthorized
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, email: user.email}
    }
  end
end
