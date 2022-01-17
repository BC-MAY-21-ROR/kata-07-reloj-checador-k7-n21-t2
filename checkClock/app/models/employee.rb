class Employee < ApplicationRecord
  belongs_to :branch
  has_many :attendences
  has_many :absences
end
