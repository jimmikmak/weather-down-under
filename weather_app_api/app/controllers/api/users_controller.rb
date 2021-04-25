class Api::UsersController < ApplicationController
    def index
        render json: User.all
    end

def create
    user = User.create(user_params)
    if user_valid?
        render json: user, status: 201
    else
        render json: {message: 'Unable to create user'}, status: 500
    end
end

    def show
        puts params[:id]
        render json: User.find(params[:id])
    end

    def update
        bookmark = Bookmark.find(params[:id])
        bookmark.update(city: params[:city], country: params[:country], weather: params[:weather])
        render json: {type: 'Successfully updated entry'}
    end

    def destroy
        User.destroy(params[:id])
        render json: {message: 'User has been deleted'} 
    end

    def user_params
        params.required(:user).permit(:name, :password)
    end
end
