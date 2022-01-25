class HomeController < ApplicationController
  def index
    @branches = Branch.all
  end

  def check_employee
    employee = Employee.find_by(secret_code: params[:secret_code].to_s)
    attendances = Attendance.all
    if employee.nil?
      return render json: {message: "This code is not associated with any employee" }, status: :not_found
    end
    if employee.branch_id != params[:branch_id].to_i
      return render json: {message: "This employee is not associated with this branch office" }, status: :not_acceptable
    end
    counter = 0
    attendances.each do |attendance|
      if (attendance.employee_id == employee.id && attendance.datetime_in.strftime("%F") == Time.now.strftime("%F"))
        counter += 1
      end
    end
    if counter.positive?
      return render json: {message: "This employee is not associated with this branch office" }, status: :forbidden
    end
    attendance = Attendance.create(employee_id: employee.id, datetime_in: Time.now.strftime("%F %T"))
    if attendance.save
      puts attendance.datetime_in
      return render json: {"message": "Attendance registered", "employee": employee, "attendance": attendance }, status: :created
    else
      return render json: {message: "Algo ha salido mal" }, status: :not_acceptable
    end
  end

  def out_employee
    employee = Employee.find_by(secret_code: params[:secret_code].to_s)
    attendances = Attendance.all
    if employee.nil?
      return render json: {"message": "This code is not associated with any employee" }, status: :not_found
    end
    if employee.branch_id != params[:branch_id].to_i
      return render json: {"message": "This employee is not associated with this branch office" }, status: :not_acceptable
    end
    counter = 0
    outDone = false
    attendances.each do |attendance|
      if (attendance.employee_id == employee.id && attendance.datetime_in.strftime("%F") == Time.now.strftime("%F"))
        counter += 1
      end
    end

    return render json: { "message": 'unregistered checkin' }, status: :forbidden if counter.zero?

    if Attendance.where(employee_id: employee.id).last.datetime_out
      return render json: {"message": "unregistered checkin" }, status: :bad_request
    end
  
    attendance = Attendance.where(employee_id: employee.id).last
    if attendance.update(datetime_out: Time.now.strftime("%F %T") )
      return render json: {"message": "Attendance registered", "employee": employee, "attendance": attendance }, status: :created
    else
      return render json: {"message": "Unknown error" }, status: :not_acceptable
    end
  end

  def getBranches 
    branches = Branch.all
    return render json: {"message": branches }, status: :accepted
  end

  
end
