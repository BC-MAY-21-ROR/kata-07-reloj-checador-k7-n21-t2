json.extract! employee, :id, :branch_id, :name, :position, :secret_code, :email, :created_at, :updated_at
json.url employee_url(employee, format: :json)
