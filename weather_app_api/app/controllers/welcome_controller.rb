class WelcomeController < ApplicationController
    def index
        render json: {name: 'James'}
    end
end