class CreateAbsences < ActiveRecord::Migration[6.1]
  def change
    create_table :absences do |t|
      t.references :employee, null: false, foreign_key: true
      t.datetime :date_absence

      t.timestamps
    end
  end
end
