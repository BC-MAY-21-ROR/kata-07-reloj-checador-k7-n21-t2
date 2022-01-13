class CreateBranches < ActiveRecord::Migration[6.1]
  def change
    create_table :branches do |t|
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end
