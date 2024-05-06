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
    newProd.textContent = `${product.id}:${product.title}`
    prodList.appendChild(newProd)
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
