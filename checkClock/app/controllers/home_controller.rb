class HomeController < ApplicationController
  def index
    @branches = Branch.all
  end

  def check_employee
    employee = Employee.find_by(secret_code: params[:secret_code].to_s)
    attendances = Attendance.all
    if employee.nil?
      return render json: {message: "This code is not associated with any employee" }, status: :not_found
    elsif employee.branch_id != params[:branch_id]
      return render json: {message: "This employee is not associated with this branch office" }, status: :not_acceptable
    end
 
    counter = 0
    attendances.each do |attendance|
      if (attendance.employee_id == employee.id && attendance.datetime_in.strftime("%F") == Time.now.strftime("%F"))
        counter += 1
      end
    end

    if counter > 0
      return render json: {message: "This employee is not associated with this branch office" }, status: :forbidden
    end
    return render json: {"data": employee }, status: :accepted  
  end
  def check_in
    print(params[:name])
  end
end