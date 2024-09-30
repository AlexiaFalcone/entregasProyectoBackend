// Botón para generar el Ticket 

const btnTicket = document.querySelectorAll("#btnTicket")

btnTicket.forEach((button)=>{
    button.addEventListener('click', async(event)=>{
        event.preventDefault();

        const cartId = event.target.previousElementSibling.textContent.substring(12)
        

        const ticket = await fetch(`/api/carts/${cartId}/purchase`, {method:"POST"})
        console.log(ticket, "id")
        const data = await ticket.json()
        console.log(data, "data")
        const ticketId = data.payload._id
        console.log(ticketId, "ticket")

        window.location.href = `/purchase/${ticketId}`
    })
})

