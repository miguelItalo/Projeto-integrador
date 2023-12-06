const buttonOpen = document.querySelectorAll('.btn-empresa')
const modal = document.querySelector("dialog")
const CloseModal = document.querySelectorAll("#cancel")

function openModal() {
    
buttonOpen.onclick = modal.showModal()
}
buttonOpen.forEach(function (button) {
    button.addEventListener("click", function () {
        var modal = this.getAttribute("data-modal");
        openModal(modal);
    });
});
function closeModal(){
   modal.close()
}
CloseModal.forEach(function(closeButton){
    closeButton.addEventListener("click",function(){
        closeModal()
    })
})