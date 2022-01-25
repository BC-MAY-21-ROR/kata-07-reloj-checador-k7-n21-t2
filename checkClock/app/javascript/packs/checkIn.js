import Swal from 'sweetalert2';

let httpStatus;

const btnCheckIn = document.querySelector("#btn-checkIn");
const inptSecret = document.querySelector("#secretCode");
btnCheckIn.addEventListener("click", () => {
  if (!inptSecret.value) {
    Swal.fire({
      title: "Please, enter your secret code",
      text: "The secret code is necessary to check in",
      icon: 'warning',
      iconColor: "#FF0000",
      showCancelButton: false,
      confirmButtonText: "OK",
      confirmButtonColor: "#000126",
      cancelButtonText: 'Cancel',
      background: "#2A2B4A",
      color: "#fff"
    })
    return
  }

  const data = {
    secret_code: document.querySelector("#secretCode").value,
    branch_id: document.querySelector("#selectBranch").value
  }
  doCheckIn(data);
})



async function doCheckIn(data) {
  try {
    const response = await fetch(`http://localhost:3000/check-employee`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
        'Content-Type': 'application/json'
      }
    })
    const httpStatus = response.status;
    const res = await response.json();
    if (httpStatus == 404) {
      Swal.fire({
        title: "Something has gone wrong",
        text: "This code is not associated with any employee. Try choosing a different branch office",
        icon: 'warning',
        iconColor: "#FF0000",
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#000126",
        cancelButtonText: 'Cancel',
        background: "#2A2B4A",
        color: "#fff"
      })
    } else if (httpStatus == 406) {
      Swal.fire({
        title: "Incorrect Branch",
        text: "This employee is not associated with this branch office",
        icon: 'warning',
        iconColor: "#FF0000",
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#000126",
        cancelButtonText: 'Cancel',
        background: "#2A2B4A",
        color: "#fff"
      })
    } else if (httpStatus == 403) {
      Swal.fire({
        title: "Employee checked",
        text: "This employee already checked in today",
        icon: 'warning',
        iconColor: "#FF0000",
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#000126",
        cancelButtonText: 'Cancel',
        background: "#2A2B4A",
        color: "#fff"
      })
    } else {
      let date = new Date(res.attendance.datetime_in)
      inptSecret.value = ""
      Swal.fire({
        title: `Attendance Succesfully!`,
        text: `${res.employee.name} check in at ${returnDate(date)}`,
        icon: 'success',
        iconColor: "#83DB51",
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#000126",
        cancelButtonText: 'Cancel',
        background: "#2A2B4A",
        color: "#fff"
      })
    }

  } catch (error) {
    console.error(error);
  }
}

function returnDate(date) {
  let strHour;
  if (date.getUTCHours() < 10) {
    strHour = `0${date.getUTCHours()}`
  }
  return `${strHour}:${date.getMinutes()}`
}