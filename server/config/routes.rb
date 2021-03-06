Rails.application.routes.draw do
  get '/welcome', to: 'welcome#index'
  namespace :api do
    post 'auth/login', to: 'auth#login'
    resources :bookmarks
    resources :users
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
