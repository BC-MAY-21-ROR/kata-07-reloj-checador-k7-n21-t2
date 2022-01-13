class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.references :branch, null: false, foreign_key: true
      t.string :name
      t.string :position
      t.integer :secret_code
      t.string :email

      t.timestamps
    end
  end
end
