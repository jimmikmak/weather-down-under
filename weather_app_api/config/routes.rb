Rails.application.routes.draw do
  get '/welcome', to: 'welcome#index'
  resources :bookmarks
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end