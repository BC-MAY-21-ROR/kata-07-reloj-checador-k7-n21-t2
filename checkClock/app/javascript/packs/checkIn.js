import { message } from 'statuses';
import Swal from 'sweetalert2';

const btnCheckIn = document.querySelector("#btn-checkIn");
btnCheckIn.addEventListener("click", () => {
  if (!document.querySelector("#secretCode").value) {
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

function doCheckIn(data) {
  fetch(`http://localhost:3000/check-employee`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      'Content-Type': 'application/json'
    }
  }).then(async res => {
    res.json()
    if (res.status == 404) {
      Swal.fire({
        title: "Incorrect code",
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
    } else if (res.status == 406) {
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
    } else if (res.status == 403) {
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
      let employee = await fetch(`http://localhost:3000/get-info-employee/${document.querySelector("#secretCode").value}`, {
        method: 'GET',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
        }
      })
      console.log(employee);
      Swal.fire({
        title: `${res.message}`,
        text: `${res.employee} at ${res.attendance.datetime_in}`,
        icon: 'success',
        iconColor: "#83DB51",
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#000126",
        cancelButtonText: 'Cancel',
        background: "#2A2B4A",
        color: "#fff"
      })
      console.log(res);
    }
  })
    .catch(error => {
      console.error(error);
    })
}
