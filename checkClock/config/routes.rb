Rails.application.routes.draw do
  resources :employees
  resources :branches
  get '/', to: 'home#index'
  get '/dashboard', to: 'dashboard#index'
  get '/admin-login', to: 'login#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
