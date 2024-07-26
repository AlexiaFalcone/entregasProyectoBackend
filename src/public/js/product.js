// función para agregar un producto al carrito

const btnAddToCart = document.querySelectorAll("#btnAddProd");
let currentCartId = document.getElementById("currentCartId").value;

btnAddToCart.forEach((button) => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const productId = event.target.previousSibling.previousSibling.textContent.substring(3)
      
        const upDateResponse = await fetch(`/api/carts/${currentCartId}/product/${productId}`, { method: "POST" });

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
});

//función para eliminar productos del carrito

const btnDelete = document.querySelectorAll("#btnDeleteProd");

btnDelete.forEach((button)=>{
    button.addEventListener('click', async(event)=>{
        event.preventDefault();

        const productId = event.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent.substring(3);
        console.log(productId)

        const deleteResponse = await fetch(`/api/products/${productId}`, {method: "DELETE"});

        if(deleteResponse){
            Swal.fire({
               icon: 'success',
               title: 'El producto se elimino de manera exitosa',
               timer: 1500
           });
       }else{
           console.log("No se pudo eliminar el producto.")
       }
    })
});
