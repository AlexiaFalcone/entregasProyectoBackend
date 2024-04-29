import fs from 'fs/promises'

class CartManeger {
    constructor(path) {

        this.path = path
        this.carts = []
    }

    async createCart() {
        try {
            const carts = await this.getCart()
            const newCart = {
                id: 0,
                products: []
            }

            const lastId = carts.length > 0 ? carts[carts.length - 1].id : 0
            newCart.id = lastId + 1
            carts.push(newCart)

            await fs.writeFile(this.path, JSON.stringify(carts, null, 2))

        } catch (error) {
            console.error("Error al crear el carrito", error)
        }
    }
    async getCart() {
        try {
            const data = await fs.readFile(this.path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async getCartById(cart_id) {
        try {
            let cartPorId = await this.getCart()
            const cartUnico = cartPorId.find((cart) => cart_id == cart.id)
            if (!cartUnico) {
                console.log("Error, el carrito no exite.")
                return
            }
            return cartUnico
        } catch (error) {
            console.error("Error el carrito no existe", error)
        }
    }

    async addProductCart(cart_id, product, productId) {
        try {
            const carts = await this.getCart()
            const cartUnico = carts.find((cart) => cart_id == cart.id)

            if (cartUnico) {
                const findProdId = cartUnico.products.find((prod) => productId == prod.id)
                if(findProdId){
                    findProdId.quantity++
                    await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
                    return cartUnico
                }else{
                    cartUnico.products.push(product)
                    await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
                    return cartUnico
                }
              
            }
        } catch (error) {
            console.error("Error el carrito no existe", error)
        }
    }
}

export default CartManeger