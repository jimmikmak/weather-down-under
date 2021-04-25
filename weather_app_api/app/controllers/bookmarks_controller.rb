class BookmarksController < ApplicationController
    def index
        render json: Bookmark.all
    end

    def create
        bookmark = Bookmark.create(city: params[:city], country: params[:country], weather: params[:weather])
        bookmark_valid = bookmark.valid?
        if bookmark_valid
          render json: {message: 'Successfully created bookmark'}, status: 200
        else
          render json: {message: 'Unable to create bookmark'}, status: 400
        end
    end

    def show
        puts params[:id]
        render json: Bookmark.find(params[:id])
    end

    def update
        
        render json: {type: 'update'}
    end

    def destroy
        render json: {type: 'destroy'} 
    end
end
