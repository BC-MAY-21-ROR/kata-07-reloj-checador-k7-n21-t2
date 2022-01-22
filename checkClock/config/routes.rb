Rails.application.routes.draw do
  devise_for :admins

  root to: "home#index"

  resources :employees
  resources :branches
  
  get '/dashboard', to: 'dashboard#index'
  # get '/admin-login', to: 'login#index'
  post '/check-in', to: 'home#check_in'
  post '/check-employee', to: 'home#check_employee'
end

