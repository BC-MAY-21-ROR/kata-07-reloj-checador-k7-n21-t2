import Swal from 'sweetalert2';

let formCreate = document.querySelector("#aside-create");
const btnClose = document.querySelector("#close-aside-create");
const buttonShow = document.querySelector("#btnShowCreate");
const btnCreate = document.querySelector("#btnCreate");
const inpName = document.querySelector("#newName");
const inpAddress = document.querySelector("#newAddress");

buttonShow.addEventListener("click", () => {
  formCreate.style.transform = "translateX(0%)";
})

btnClose.addEventListener('click', () => {
  formCreate.style.transform = "translateX(100%)"
})

btnCreate.addEventListener("click", () => {
  validateEmptyFields();
})

function requestCreateBranch() {
  const data = {
    name: inpName.value,
    address: inpAddress.value
  }
  fetch(`http://localhost:3000/branches`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => {
      console.log(error);
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
    })
    .then(response => {
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
      }).then(result => {
        location.reload()
      })
    });
}

function validateEmptyFields() {
  if (!inpAddress.value || !inpName.value) {
    Swal.fire({
      title: "Empty fields",
      text: "Make sure you don't leave empty fields",
      icon: 'warning',
      iconColor: "#FF0000",
      showCancelButton: false,
      confirmButtonText: "OK",
      confirmButtonColor: "#000126",
      cancelButtonText: 'Cancel',
      background: "#2A2B4A",
      color: "#fff"
    })
  }else{
    requestCreateBranch();
  }
}