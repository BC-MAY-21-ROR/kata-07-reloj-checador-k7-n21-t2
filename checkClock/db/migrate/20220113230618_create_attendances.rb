class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.references :employee, null: false, foreign_key: true
      t.datetime :datetime_in
      t.datetime :datetime_out

      t.timestamps
    end
  end
end
