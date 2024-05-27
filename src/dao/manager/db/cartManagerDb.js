import cartModel from "../../models/carts.model.js";

class CartManegerDb{
    constructor(){

    }

    async createCart(){
        try {
            let newCart = await cartModel.create({})
                return newCart
        } catch (error) {
            console.log(error)
        }
    }
    async getCart(){
        try {
            const cart = await cartModel.find()
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cid){
        try {
            const singleCart = await cartModel.findOne(cid)
            return singleCart
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartManegerDb