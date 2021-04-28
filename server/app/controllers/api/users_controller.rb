class Api::UsersController < ApplicationController
    before_action :user_exists, except: [:create]

    def index
        render json: User.all
    end

    def create
      user = User.create(user_params)
      if user.valid?
          render json: user, status: 201
      else
          render json: { message: 'Unable to create user' }, status: 500
      end
    end

    def show
        puts params[:id]
        render json: User.find(params[:id])
    end

    def update
       render json: User.find(params[:id]).update(user_params)
    end

    def destroy
        User.destroy(params[:id])
        render json: {message: 'User has been deleted'} 
    end

    def user_params
        params.required(:user).permit(:name, :password)
    end
end
