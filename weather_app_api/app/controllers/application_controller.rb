class ApplicationController < ActionController::API

    def encode_token user_id
        JWT.encode(user_id, 'top-secret-password-!@#$%')
    end
    
    def decode_token
        auth_token = request_headers['Authorization']
        if auth_token
            token = auth_token.split[' ']
            p "TOKEN"
            p token
            begin
                JWT.decode token[1], 'top-secret-password-!@#$%'
            rescue StandardError
                nil
            end
        end
    end

end
