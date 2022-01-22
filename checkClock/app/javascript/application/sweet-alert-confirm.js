import Swal from 'sweetalert2';
import Rails from '@rails/ujs';

window.Swal = Swal;

const confirmed = (element, result) => {
  if (result) {
    element.removeAttribute('data-confirm-swal');
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
    }).then(result => element.click())
    
  }
};

// Display the confirmation dialog
const showConfirmationDialog = (element) => {
  const title = element.getAttribute('data-confirm-swal');
  const text = element.getAttribute('data-text');
  const icon = element.getAttribute('data-icon');
  const iconColor = element.getAttribute('data-iconColor');
  const showCancelButton = element.getAttribute('data-showCancelButton') || "true";
  const confirmButtonText = element.getAttribute('data-confirmButtonText');
  const action = element.getAttribute('data-action') || "false";

  Swal.fire({
    title,
    text,
    icon: 'warning',
    iconColor,
    showCancelButton: showCancelButton == "true" ? true : false,
    confirmButtonText,
    confirmButtonColor: "#000126",
    cancelButtonText: 'Cancel',
    background: "#2A2B4A",
    color: "#fff"
  }).then(result => {
    console.log(result);
    if (action == "true") {
      confirmed(element, result)
    }
  });
};

const allowAction = (element) => {
  if (element.getAttribute('data-confirm-swal') === null) {
    return true;
  }
  showConfirmationDialog(element);
  return false;
};

function handleConfirm(element) {
  if (!allowAction(this)) {
    Rails.stopEverything(element);
  }
}

Rails.delegate(document, 'a[data-confirm-swal]', 'click', handleConfirm);