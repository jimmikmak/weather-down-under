class ApplicationController < ActionController::API

    def encode_token user_id
        JWT.encode(user_id, 'top-secret-password-!@#$%')
    end
    
    def decode_token
    end

end
