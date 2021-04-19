/* Function to open the modal on click */
function openModal(modal) {
  modal.style.display = "block";}

/* Function to close the modal on click */
function closeModal(modal) {
  modal.style.display = "none";}

/* Function to close the modal when clicking outside */
let modals = [modal1, modal2, modal3, modal4, modal5, modal6, modal7, modal7, modal8, modal9, modal10,
modal11, modal12, modal13, modal14, modal15, modal16, modalBestMovie];

window.onclick = function(event) {
  for (modal of modals){
  if (event.target == modal) {
    modal.style.display = "none";}}}



