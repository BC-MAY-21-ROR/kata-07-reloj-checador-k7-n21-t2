Rails.application.routes.draw do
  devise_for :admins

  root to: "home#index"

  resources :employees
  resources :branches
  
  get '/dashboard', to: 'dashboard#index'
  # get '/admin-login', to: 'login#index'
  get '/get-info-employee/:secret_code', to: 'home#get_employee'
  post '/check-employee', to: 'home#check_employee'
  post '/out-employee', to: 'home#out_employee'
  get '/admin-login', to: 'login#index'

  post '/test', to: 'home#getBranches'
end

