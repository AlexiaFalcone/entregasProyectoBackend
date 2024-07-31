const btnSendTicket = document.querySelectorAll("#btnTicket");
btnSendTicket.forEach((button) => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const ticketId = event.target.previousSibling.previousSibling.textContent.substring(11)
        console.log(ticketId);
      
        const ticketResponse = await fetch(`/api/carts/email/${ticketId}`, { method: "GET" });

        if(ticketResponse){
             Swal.fire({
                icon: 'success',
                title: 'Se realizó la compra correctamente',
                timer: 1500
            });
        }else{
            console.log("No se pudo agregar el producto.")
        }
    })
});