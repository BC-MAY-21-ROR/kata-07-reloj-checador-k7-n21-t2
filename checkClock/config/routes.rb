Rails.application.routes.draw do
  devise_for :admins

  root "home#index"

  resources :employees
  resources :branches

  # get '/employees-check', to: "home#index"

  #reports
  get '/attDay', to: 'reports#attendanceDay'
  get '/AvgCheck', to: 'reports#avgCheckTime'
  get '/absences', to: 'reports#absences'
  
  get '/dashboard', to: 'dashboard#index'
  # get '/admin-login', to: 'login#index'
  get '/get-info-employee/:secret_code', to: 'home#get_employee'
  post '/check-employee', to: 'home#check_employee'
  post '/out-employee', to: 'home#out_employee'
  get '/admin-login', to: 'login#index'

  get '/branches-all', to: 'branches#allBranches'
  put '/change-status/:id', to: 'employees#changeStatus'
end

