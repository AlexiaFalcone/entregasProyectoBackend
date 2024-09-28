const btnRoleUser = document.querySelectorAll("#btnRoleUser");
btnRoleUser.forEach((button) => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const userId = event.target.previousElementSibling.textContent.substring(3)
        
        const userRoleRespone = await fetch(`/api/users/premium/${userId}`, { method: "PUT" });

        if(userRoleRespone){
             Swal.fire({
                icon: 'success',
                title: 'Se cambio el role correctamente',
                timer: 1500
            });
            location.reload(true)
        }else{
            console.log("No se pudo cambiar el role.")
        }
    })
});

const btnDeleteUser = document.querySelectorAll("#btnDeleteUser");
btnDeleteUser.forEach((button) => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const userId = event.target.previousElementSibling.previousElementSibling.textContent.substring(3)
        
        const userDeleteRespone = await fetch(`/api/users/${userId}`, { method: "DELETE" });

         if(userDeleteRespone){
              Swal.fire({
                 icon: 'success',
                 title: 'Se elimino el usuario correctamente',
                 timer: 1500
             });
             location.reload(true)
         }else{
             console.log("No se pudo cambiar el role.")
         }
     })
});
