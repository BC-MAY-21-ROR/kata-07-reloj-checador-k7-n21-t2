class Employee < ApplicationRecord
  belongs_to :branch
  has_many :attendances
  has_many :absences
end
