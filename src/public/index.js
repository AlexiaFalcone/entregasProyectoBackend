const socket = io()

const form = document.getElementById('productForm')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let prodTitle = document.getElementById('name').value
    let prodDescription = document.getElementById('description').value
    let prodPrice = document.getElementById('price').value
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


        //  const data = new FormData(form)
        //  console.log(form)

        await fetch('/products/products', {
            method: 'POST',
            body: data
        })

})

// mostrar json
function mostrarProd(product) {
    const prodList = document.getElementById('prodList')
    const newProd = document.createElement('p')
    const btnDelete = document.createElement('button')
    newProd.textContent = `${product.id}:${product.title}`
    btnDelete.classList.add("botonEliminar")
    btnDelete.innerHTML = "Eliminar"
    prodList.appendChild(newProd)
    newProd.appendChild(btnDelete)
}

socket.on('prodList', (products) => {
    // console.log(products)
    const prodList = document.getElementById('prodList')
    prodList.innerHTML = ""
    products.forEach(product => {
        mostrarProd(
            product
        )
    });
})
