class BookmarksController < ApplicationController
    def index
        render json: {type: 'index'}
    end

    def create
        puts params[:city]
        puts params[:country]
        puts params[:conditions]
        render json: {type: 'create'}
    end

    def show
        render json: {type: 'show'}
    end

    def destroy
        render json: {type: 'update'}
    end

    def destroy
        render json: {type: 'destroy'} 
    end
end
