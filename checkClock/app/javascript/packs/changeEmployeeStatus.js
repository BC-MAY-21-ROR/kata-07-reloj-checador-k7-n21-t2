import url from './url';
import Swal from 'sweetalert2';
const checkboxes = document.getElementsByName('check-status');

checkboxes.forEach(e => {
  e.addEventListener("click", async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to change status for this employee?',
      icon: 'warning',
      iconColor: "#FFC54A",
      showCancelButton: true,
      confirmButtonText:"Yes, I want to change status",
      confirmButtonColor: "#000126",
      cancelButtonText: 'Cancel',
      background: "#2A2B4A",
      color: "#fff"
    }).then(async result => {
      if (result.isConfirmed) {
        await requestToChangeStatus(e.id, e.checked)
      }else{
        location.reload()
      }
    });

  })
})

async function requestToChangeStatus(id, status) {
  try {
    const data = {
      status
    }
    let response = await fetch(`${url}/change-status/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
        'Content-Type': 'application/json'
      }
    })
    Swal.fire({
      title: "Success!",
      text: "Operation completed successfully",
      icon: 'success',
      iconColor: '#00B74A',
      showCancelButton: false,
      confirmButtonText: 'Continue',
      confirmButtonColor: "#000126",
      background: "#2A2B4A",
      color: "#fff"
    }).then(result => location.reload())

  } catch (error) {
    Swal.fire({
      title: "An error occurred, try again",
      text: error,
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
}
