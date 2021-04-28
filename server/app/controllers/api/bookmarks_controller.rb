class Api::BookmarksController < ApplicationController

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
        bookmark = Bookmark.find(params[:id])
        bookmark.update(city: params[:city], country: params[:country], weather: params[:weather])
        render json: {type: 'Successfully updated entry'}
    end

    def destroy
        Bookmark.destroy(params[:id])
        render json: {message: 'Entry has been deleted'} 
    end
end
