import cartModel from "../../models/carts.model.js";

class CartManegerDb {
    constructor() {

    }

    async createCart() {
        try {
            let newCart = await cartModel.create({})
            return newCart
        } catch (error) {
            console.log(error)
        }
    }
    async getCart() {
        try {
            const cart = await cartModel.find()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cid) {
        try {
            const singleCart = await cartModel.find({}, { cid })
            return singleCart
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(cid, pid) {
        try {
            const cart = await cartModel.find({ _id: cid }).populate('products.product');
            const addProdToCart = cart[0].products.findIndex(product => product.product.id == pid);

            if (addProdToCart == -1) {
                const product = {
                    product: pid,
                    quantity: 1
                }
                cart[0].products.push(product);
            }
            else {
                const value = cart[0].products[addProdToCart].quantity;
                cart[0].products[addProdToCart].quantity = value + 1;
            }
            const newCart = await cartModel.updateOne({ _id: cid }, { $set: cart[0] })
            return newCart
        }
        catch (error) {
            console.log(error)
        }
    }

    async upDateCart(cart, newCart) {
        try {
            cart[0].products = [];
            cart[0].products.push(newCart)

            const result = await cartModel.updateOne({ _id: cart[0]._id }, { $set: cart[0] })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOne(cid, pid) {
        const cart = await cartModel.find({ _id: cid }).lean().populate('products.product');
        const deleteProd = cart[0].products.findIndex(product => product.product._id.equals(pid));
        
        if (deleteProd === -1) {
            console.log('El producto no existe')
        } else {
            cart[0].products.splice(deleteProd, 1)
        }
        const result = await cartModel.updateOne({ _id: cart[0]._id }, { $set: cart[0] })
        return result
    }

    async deleteProductsInCart(cid){
        try {
            const clearCart = await cartModel.updateOne({_id: cid}, { $set: {products: []}})
            return clearCart
            
        } catch (error) {
          console.log(error)  
        }
    }
}

export default CartManegerDb