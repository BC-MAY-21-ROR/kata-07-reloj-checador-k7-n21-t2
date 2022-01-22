import { message } from 'statuses';
import Swal from 'sweetalert2';
const data = {
  secret_code: 9876,
  branch_id: 1
}
fetch(`http://localhost:3000/check-employee`, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
    'Content-Type': 'application/json'
  }
}).then(res => {
  res.json()
  console.log(res);
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
  }
})
  .catch(error => {
    console.error(error);
  })
