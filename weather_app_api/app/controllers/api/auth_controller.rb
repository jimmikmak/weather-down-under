class Api::AuthController < ApplicationController
  before_action :user_exists, except: [:login]
  
def login
    user = User.find_by(name: params[:name])
    if user&.authenticate(params[:password])
      token = encode_token(user.id)
      render json: { user: user, token: token }
    else
      render json: { message: 'user not found' }, status: :not_found
    end
  end
end
