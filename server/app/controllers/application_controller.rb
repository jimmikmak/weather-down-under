class ApplicationController < ActionController::API
  before_action :user_exists

    def encode_token(user_id)
        JWT.encode user_id, nil, 'none'
    end
    
    def decode_token
        auth_token = request.headers['token']
        if auth_token
            p auth_token
            begin
                JWT.decode auth_token, nil, false
            rescue StandardError
                p 'NIL'
                nil
            end
        end
    end

    def user_exists
        valid = decode_token
        p "valid"
        p valid
      if valid
        true
      else
        render json: { message: 'Unauthorized' }, status: :unauthorized
      end
    end
end
