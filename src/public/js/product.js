// función para agregar un producto al carrito

const btnAddToCart = document.querySelectorAll("#btnAddProd");

btnAddToCart.forEach((button) => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const productId = event.target.previousSibling.previousSibling.textContent.substring(3)
       
        const upDateResponse = await fetch(`/api/carts/664e83f3b97d9c5539ca13e8/product/${productId}`, { method: "POST" });

        if(upDateResponse){
             Swal.fire({
                icon: 'success',
                title: 'El producto se agregó de manera exitosa',
                timer: 1500
            });
        }else{
            console.log("No se pudo agregar el producto.")
        }
    })
})