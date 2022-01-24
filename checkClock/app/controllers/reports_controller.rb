class ReportsController < ApplicationController
    def attendanceDay
        @attendancesToday = Attendance.where "DATE(datetime_in) = DATE(?)", Time.now
    end

    def avgCheckTime
        @EmployeeAvgs = []
        Employee.all.each do |employee|
            employeeAttendances = Attendance.where("employee_id = #{employee.id}")

            if employeeAttendances.empty?
                @EmployeeAvgs.push({ :employeeName => employee.name, :checkInAvg => "No check-in or", :checkOutAvg => 'check-out records found' })
            else
                #calculate the avg check time
                avgcheckTimesIn = getAvgCheckInTimes(employeeAttendances,'datetime_in')
                avgcheckTimesOut = getAvgCheckInTimes(employeeAttendances,'datetime_out')
                @EmployeeAvgs.push({ :employeeName => employee.name, :checkInAvg => avgcheckTimesIn, :checkOutAvg => avgcheckTimesOut })
            end
        end
    end

    def getAvgCheckInTimes(employeeAttendances, check)

        totalHours = 0
        totalMinutes = 0

        employeeAttendances.each do |attendance| 
            #check for missing data
            if attendance[check].nil?
                return ("#{check} data missing")
            else
                totalHours += attendance[check].hour
                totalMinutes += attendance[check].min 
            end
        end
        
        avgHours = totalHours / employeeAttendances.length()
        avgMin = totalMinutes / employeeAttendances.length()

        #add 0 in front if num is one digit
        if avgHours < 10
            avgHours = "0#{avgHours}"
        end

        if avgMin < 10
            avgMin = "0#{avgMin}"
        end

        return ("#{avgHours}:#{avgMin}")  
    end

    def absences
        @EmployeeAbsences = []
        Employee.all.each do |employee|
            listEmployeeAbsences = employee.absences.order('date_absence DESC')
            totalEmployeeAbsences = employee.absences.length
            
            if totalEmployeeAbsences == 0
                return
            else
                @EmployeeAbsences.push({ :employeeName => employee.name, :listAbsences => listEmployeeAbsences, :totalAbsences => totalEmployeeAbsences })
            end

        end
    end

end