import Swal from 'sweetalert2';
import url from './url';

//Variable for storage the initial info of branch
let employeeData;
let titleBranch = document.querySelector("#title-branch");
//Select the button for show the form and add funcionality to fetch the branch data.
//Also show the form
const buttonShow = document.querySelectorAll(".buttonShow");
buttonShow.forEach(element => {
  element.addEventListener("click", () => {
    aside.style.transform = "translateX(0%)";
    fetch(`${url}/employees/${element.id}`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(async response => {
        employeeData = response.data;
        inpName.value = employeeData.name;
        inpEmail.value = employeeData.email;
        inpPosition.value = employeeData.position;
        inpSecret.value = employeeData.secret_code;
        let branchName = await getBranch(employeeData.branch_id);
        inpBranch.value = await branchName.data.name;
        titleBranch.textContent = employeeData.name;
      });
  })
});

// Select the buttons an inputs to interaction
const aside = document.querySelector("#aside-info");
const btnClose = document.querySelector("#close-aside");
const btnEnable = document.querySelector("#btnEnabled");

const inpName = document.querySelector("#name");
const inpSecret = document.querySelector("#secret");
const inpPosition = document.querySelector("#position");
const inpEmail = document.querySelector("#email");
var inpBranch = document.querySelector("#branch");
var contextSelect = inpBranch.parentNode;
var selectBranches = document.createElement("select");

let formEditActions = document.querySelector("#form-edit-actions");

//Function for enabled inputs and generate new Buttons
btnEnable.addEventListener('click', async () => {
  await actionsBtnEdit();
})

//function to actions for the BTN enabled
async function actionsBtnEdit() {
  await enabledInputs();
  generateActions();
}

//Function to enabled inputs and destroy btnEnabled
async function enabledInputs() {
  inpEmail.disabled = false;
  inpName.disabled = false;
  inpPosition.disabled = false;
  inpSecret.disabled = false;
  contextSelect.removeChild(inpBranch);
  inpName.classList.add("inputActive")

  selectBranches.id = "branch";
  let newOption = document.createElement("option");
  let textNodeOpt = document.createTextNode("Choose a option");
  newOption.appendChild(textNodeOpt)
  selectBranches.appendChild(newOption);

  let allBranches = await getBranches();
  allBranches.data.forEach(e => {
    let newOption = document.createElement("option");
    let textNodeOpt = document.createTextNode(e.name);
    newOption.appendChild(textNodeOpt)
    newOption.setAttribute("value", e.name);
    newOption.value = e.id;
    selectBranches.appendChild(newOption)
  })
  
  contextSelect.appendChild(selectBranches)
  

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
    position: inpPosition.value,
    email: inpEmail.value,
    secret_code: inpSecret.value,
    branch_id: document.querySelector("#branch").value
  }
  fetch(`${url}/employees/${employeeData.id}`, {
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
  inpEmail.disabled = true;
  inpName.disabled = true;
  inpSecret.disabled = true;
  inpPosition.disabled = true;

  inpName.classList.remove("inputActive")
  inpEmail.classList.remove("inputActive")
  inpSecret.classList.remove("inputActive")
  inpPosition.classList.remove("inputActive")
  inpBranch.classList.remove("inputActive")
  

  inpName.value = employeeData.name;
  inpEmail.value = employeeData.email;
  inpSecret.value = employeeData.secret_code;
  inpPosition.value = employeeData.address;
  inpBranch.value = employeeData.name;
}

//Listener to close the form
btnClose.addEventListener('click', () => {
  clearForm();
})

//Function to close the form
function clearForm() {
  inpSecret.disabled = true;
  inpEmail.disabled = true;
  inpPosition.disabled = true;
  inpName.disabled = true;
  inpName.classList.remove("inputActive");
  inpEmail.classList.remove("inputActive");
  inpPosition.classList.remove("inputActive");
  inpSecret.classList.remove("inputActive");
  if(selectBranches.parentNode == contextSelect){
    contextSelect.removeChild(selectBranches);
  }
  contextSelect.appendChild(inpBranch);
  if (document.querySelector("#btnSaveEdit") || document.querySelector("#btnCancelEdit")) {
    destroyActions(document.querySelector("#btnSaveEdit"), document.querySelector("#btnCancelEdit"));
  }
  aside.style.transform = "translateX(100%)"
}

//function to get branch info
async function getBranch(id) {
  try {
    let info = await fetch(`${url}/branches/${id}`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    })
    let infoReturn = info.json();
    return infoReturn;
  } catch (error) {
    return error;
  }
}

//function to get branch info
async function getBranches() {
  try {
    let info = await fetch(`${url}/branches-all`, {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content
      }
    })
    let infoReturn = info.json();
    return infoReturn;
  } catch (error) {
    return error;
  }
}
