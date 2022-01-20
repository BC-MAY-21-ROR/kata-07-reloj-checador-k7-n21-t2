Rails.application.routes.draw do
  devise_for :admins

  root to: "home#index"

  resources :employees
  resources :branches
  
  get '/dashboard', to: 'dashboard#index'
  # get '/admin-login', to: 'login#index'

end

