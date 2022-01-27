class DashboardController < ApplicationController
  before_action :authenticate_admin!
  def index
    present = Attendance.where "DATE(datetime_in) = DATE(?)", Time.now
    totalEmployees = Employee.all
    @percentPresent = ( present.length.to_f / totalEmployees.length.to_f ) * 100
  end
end
