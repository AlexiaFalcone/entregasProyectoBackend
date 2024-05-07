const socket = io()

// function enviarMensaje() {
//     const mensaje = document.getElementById('mensaje').value
//     socket.emit('mensaje', mensaje)
// }   
// const boton = document.getElementById('btn-send')
// boton.addEventListener('click', ()=>{
//     console.log(first)
// })
function mostrarProd(product){
    const prodList = document.getElementById('prodList')
    const newProd = document.createElement('p')
    const btnDelete = document.createElement ('button')
    newProd.textContent = `${product.id}:${product.title}`
    btnDelete.classList.add("botonEliminar")
    btnDelete.innerHTML= "Eliminar"
    prodList.appendChild(newProd)
    newProd.appendChild(btnDelete)
}

socket.on('prodList', (products) =>{
    console.log(products)
    const prodList = document.getElementById('prodList')
    prodList.innerHTML = ""
    products.forEach(product => {
        mostrarProd(
            product
        )        
    });
})
