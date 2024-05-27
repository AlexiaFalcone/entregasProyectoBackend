const socket = io()

let user 
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingrese su nombre de usuario',
    
    inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario para ingresar.'
    }
}).then(result => {
    user=result.value
})

chatBox.addEventListener("keyup", event =>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})

socket.on("messageLogs", data =>{
    
    let log = document.getElementById('messageLogs')
    let messages = ""
    data.forEach(message => {
        messages = messages+ `${message.user} dice ${message.message} </br>`
    });
    log.innerHTML = messages
})
