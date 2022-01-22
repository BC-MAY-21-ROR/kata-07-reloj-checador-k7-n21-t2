import Swal from 'sweetalert2';
//Variable for storage the initial info of branch
let branchData;

//Select the button for show the form and add funcionality to fetch the branch data.
//Also show the form
const buttonShow = document.querySelectorAll(".buttonShow");
buttonShow.forEach(element => {
  element.addEventListener("click", () => {
    aside.style.transform = "translateX(0%)";
    fetch(`http://localhost:3000/branches/${element.id}`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        branchData = response.data;
        inpName.value = branchData.name;
        inpAddress.value = branchData.address;
        titleBranch.textContent = `${response.data.name}`;
      });
  })
});

// Select the buttons an inputs to interaction
const aside = document.querySelector("#aside-info");
const btnClose = document.querySelector("#close-aside");
const btnEnable = document.querySelector("#btnEnabled");

const inpName = document.querySelector("#name");
const inpAddress = document.querySelector("#address");
const titleBranch = document.querySelector("#title-branch");
let formEditActions = document.querySelector("#form-edit-actions");

//Function for enabled inputs and generate new Buttons
btnEnable.addEventListener('click', () => {
  actionsBtnEdit();
})

//function to actions for the BTN enabled
function actionsBtnEdit() {
  enabledInputs();
  generateActions();
}

//Function to enabled inputs and destroy btnEnabled
function enabledInputs() {
  inpAddress.disabled = false;
  inpName.disabled = false;

  inpName.classList.add("inputActive")
  inpAddress.classList.add("inputActive")

  inpName.focus()
  formEditActions.removeChild(document.querySelector("#btnEnabled"));
}

//Function to generate the actions: Save and Cancel
function generateActions() {
  let btnSaveEdit = document.createElement("button");
  let btnCancelEdit = document.createElement("button");
  btnSaveEdit.id = "btnSaveEdit";
  btnCancelEdit.id = "btnCancelEdit";
  btnSaveEdit.textContent = "Save";
  btnCancelEdit.textContent = "Cancel";

  btnSaveEdit.addEventListener("click", () => {
    requestToEdit();
  })

  formEditActions.appendChild(btnSaveEdit);
  formEditActions.appendChild(btnCancelEdit);

  btnCancelEdit.addEventListener("click", () => destroyActions(btnSaveEdit, btnCancelEdit));
}

function requestToEdit() {
  const data = {
    name: inpName.value,
    address: inpAddress.value
  }
  fetch(`http://localhost:3000/branches/${branchData.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => {
        clearForm();
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
        clearForm();
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
      });
}

//Function to destroy the buttons: Save and Cancel
function destroyActions(btnSaveEdit, btnCancelEdit) {
  formEditActions.removeChild(btnSaveEdit);
  formEditActions.removeChild(btnCancelEdit);
  generateBtnEdit();
}

//Function to re-generate the Edit button
function generateBtnEdit() {
  let btnEdit = document.createElement("button");
  btnEdit.textContent = "Edit";
  btnEdit.id = "btnEnabled";
  formEditActions.appendChild(btnEdit);
  btnEdit.addEventListener("click", () => {
    actionsBtnEdit();
  })
  disabledInputs();
}

//Function disabled the inputs and put the normal data
function disabledInputs() {
  inpAddress.disabled = true;
  inpName.disabled = true;

  inpName.classList.remove("inputActive")
  inpAddress.classList.remove("inputActive")

  inpName.value = branchData.name;
  inpAddress.value = branchData.address;
}

//Listener to close the form
btnClose.addEventListener('click', () => {
  clearForm();
})

//Function to close the form
function clearForm() {
  inpAddress.disabled = true;
  inpName.disabled = true;
  inpName.classList.remove("inputActive");
  inpAddress.classList.remove("inputActive");
  if (document.querySelector("#btnSaveEdit") || document.querySelector("#btnCancelEdit")) {
    destroyActions(document.querySelector("#btnSaveEdit"), document.querySelector("#btnCancelEdit"));
  }
  aside.style.transform = "translateX(100%)"
}
