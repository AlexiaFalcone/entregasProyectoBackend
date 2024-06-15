const socket = io()

//Agregar producto con el form
const form = document.getElementById('productForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let prodTitle = document.getElementById('name').value
    let prodDescription = document.getElementById('description').value
    let prodPrice = parseFloat(document.getElementById('price').value)
    let prodCode = document.getElementById('code').value
    let prodStock = document.getElementById('stock').value

    const data = {
        title: prodTitle,
        description: prodDescription,
        price: prodPrice,
        code: prodCode,
        stock: prodStock
    }
    console.log(data)
    socket.emit('productForm', (data))
    form.reset()
})

// mostrar json
function mostrarProd(product) {
    const prodList = document.getElementById('prodList')
    const newProd = document.createElement('div')
    const id = document.createElement('p')
    const title = document.createElement('p')
    const btnDelete = document.createElement('button')
    id.textContent = `${product.id}`
    title.textContent = `${product.title}`
    newProd.id = 'productCard'
    btnDelete.id = 'botonEliminar'
    btnDelete.innerHTML = "Eliminar"
    prodList.appendChild(newProd)
    newProd.appendChild(id)
    newProd.appendChild(title)
    newProd.appendChild(btnDelete)
}

socket.on('prodList', (products) => {
    const prodList = document.getElementById('prodList')
    prodList.innerHTML = ""
    products.forEach(product => {
        mostrarProd(
            product
        )
    });
    // Eliminar un producto
    const btnDelete = document.querySelectorAll("#botonEliminar")
    
    btnDelete.forEach((button) =>{
        button.addEventListener( 'click', (event)=>{
            const id = event.target.previousSibling.previousSibling.textContent
            
            socket.emit('productDelete', id)
        })
    })
})




