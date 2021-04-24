class BookmarksController < ApplicationController
    def index
        render json: {type: 'index'}
    end

    def create
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
