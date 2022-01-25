class AddStatusToEmployees < ActiveRecord::Migration[6.1]
  def change
    add_column :employees, :status, :boolean
  end
end
