import cartModel from "../../models/carts.model.js";
import productModel from "../../models/products.model.js";
import ticketModel from "../../models/tickets.js";
import userModel from "../../models/users.model.js";


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
    };


    async getCart(cid) {
        try {
            if (cid) {
                const singleCart = await cartModel.find({ _id: cid }).populate('products.product').lean();
                return singleCart
            } else {
                const cart = await cartModel.find().populate('products.product').lean()
                return cart
            }
        } catch (error) {
            console.log(error)
        }
    };

    async addProduct(cid, pid) {
      
        try {
            const cart = await cartModel.find({ _id: cid }).populate('products.product');
            console.log(cart);
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
    };

    async updateQuantity(cid, pid, newQuantity) {

        try {
            const cart = await cartModel.find({ _id: cid })
            const updateProd = cart[0].products.findIndex(product => product.product._id == pid)

            if (updateProd == -1) {
                const product = {
                    product: pid,
                    quantity: 1
                }
                cart[0].products.push(product);
            } else {
                if (!newQuantity.quantity) {
                    const value = cart[0].products[updateProd].quantity;
                    cart[0].products[updateProd].quantity = value + 1;
                } else {
                    cart[0].products[updateProd].quantity = newQuantity.quantity
                }
            }

            const newQuantityProd = await cartModel.updateOne({ _id: cart[0]._id }, { $set: cart[0] })
            console.log(newQuantityProd)
            return newQuantityProd

        } catch (error) {
            console.log(error)
        }
    };


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
    };

    async deleteProductsInCart(cid) {
        try {
            const clearCart = await cartModel.updateOne({ _id: cid }, { $set: { products: [] } })
            return clearCart

        } catch (error) {
            console.log(error)
        }
    };

    async purchaseCart(cartId){
        try {
            const cart = await cartModel.find({_id:cartId}).lean().populate('products.product');
            if(cart[0]){
                if(!cart[0].products.length){
                    return res.send("Es necesario que agregues productos.")
                }
                const ticketProducts = [];
                const rejectedProducts = [];
                let total = 0;
    
                for (let i = 0; i < cart[0].products.length; i++) {
                    const cartProduct = cart[0].products[i];
                    const productDB = await productModel.findById(cartProduct.product._id);
                    
                    if(cartProduct.quantity <= productDB.stock){
                        ticketProducts.push({
                          productID: cartProduct.product._id,
                          price: cartProduct.product.price,
                          quantity: cartProduct.quantity
                        })
                        total += cartProduct.quantity*productDB.price;
                        
                        productDB.stock = productDB.stock - cartProduct.quantity;
                        await productModel.updateOne({_id: productDB._id}, productDB);
    
                    }else{
                        rejectedProducts.push({
                            productID: cartProduct.product._id,
                            quantity: cartProduct.quantity
                        })
                    }
                }
                let orderCode = Math.floor(Math.random() * 10000 + 1)
                const newTicket = {
                    code: orderCode,
                    purchase_datetime: new Date().toLocaleDateString(),
                    amount: total,
                    purchaser: req.session.user.email,
                    products: ticketProducts
                }
                
                const ticketCreated = await ticketModel.create(newTicket);
                
                res.send({status: 'success', message: 'La compra se efectuó correctamente', payload: ticketCreated})
    
            }else{
                res.send({status: 'error', message: 'El carrito no existe'})
            }
    
        } catch (error) {
            console.log(error);
        };
    };

    async purchaseCartView(ticketId, cartId, email){
        try {
            const user = await userModel.findOne({email: email}).lean();   
            const ticket = await ticketModel.findOne({_id: ticketId}).lean();
            let cart = await cartModel.findOne({_id: cartId}).lean().populate('products.product');
            const cart2 = {...cart};
            cart2.products = [];
            
        
            for (let i = 0; i < cart.products.length; i++) {
                const product = cart.products[i];
        
                product.total_price = product.quantity * product.product.price
        
            };
        
            const clearCart = await cartModel.updateOne({_id: cartId}, {$set: cart2});
            return(clearCart, user, ticket)

        } catch (error) {
         console.log(error);   
        }
    }
}

export default CartManegerDb