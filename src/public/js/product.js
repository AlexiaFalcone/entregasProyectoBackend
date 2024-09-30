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

//Botón para eliminar productos 

const btnDelete = document.querySelectorAll("#btnDeleteProd");

btnDelete.forEach((button)=>{
    button.addEventListener('click', async(event)=>{
        event.preventDefault();

        const productId = event.target.previousElementSibling.previousElementSibling.textContent.substring(3);
        console.log(productId)

        const deleteResponse = await fetch(`/api/products/${productId}`, {method: "DELETE"});

        if(deleteResponse){
            Swal.fire({
               icon: 'success',
               title: 'El producto se elimino de manera exitosa',
               timer: 1500
           });
           location.reload(true)
       }else{
           console.log("No se pudo eliminar el producto.")
       }
    })
});

//Botón que te lleva al cart

const btnCart = document.querySelectorAll("#btnCart")


btnCart.forEach((button)=>{
    button.addEventListener('click', async(event)=>{
        event.preventDefault();
        fetch(`/carts/${currentCartId}`, {method: "GET"})
        .then(result=>{
            if(result.status == 200){
                window.location.replace(`/carts/${currentCartId}`)
    }else{
        console.log("No se pudo acceder al carrito")
        Swal.fire({
            icon: 'error',
            text: 'No se pudo acceder al carrito',
            timer: 1200
          })
    }})
        
    })
})

