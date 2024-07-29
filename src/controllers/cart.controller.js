import CartManegerDb from "../dao/manager/db/cartManagerDb.js";

const manager = new CartManegerDb()

export const createCartController = async (req, res)=>{
    try {
        const newCart = await manager.createCart()
        res.send(newCart)
    } catch (error) {
        res.status(500).json({msg: 'No se pudo crear el carrito'})
    }
};

export const getCartController = async (req, res)=>{
    try {
        const cid = req.params.cid
        const sigleCart = await manager.getCart(cid)
        res.send(sigleCart)
    } catch (error) {
        res.status(404).json({msg: 'No se encontro el carrito'})
    }
};

export const addProductController = async (req, res)=>{
    try {
        const cid = req.params.cid         
        const pid = req.params.pid
        const addProd = await manager.addProduct(cid, pid)
        res.send(addProd)
       
    } catch (error) {
        res.status(500).json({msg: 'El producto no se pudo agregar'})
    }
};

export const upDateCartController = async (req, res)=>{
    try {
        const cid = req.params.cid
        const newCart = req.body
        const cart = await manager.getCart(cid)

        const upDateOneCart = await manager.upDateCart(cart, newCart)
        return upDateOneCart
        
    } catch (error) {
        res.status(500).json({msg: 'No se pudo actualizar el carrito'}) 
    }
};

export const upDateQuantityController = async (req, res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const newQuantity = req.body

        const update = await manager.updateQuantity(cid, pid, newQuantity)
        res.send(update)

    } catch (error) {
        res.status(500).json({ msg: 'No se pudo actualizar cantidad' })
    }
};

export const deleteOneController = async (req, res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const deleteSigleProd = await manager.deleteOne(cid, pid)
        console.log(deleteSigleProd)
        res.send(deleteSigleProd)

    } catch (error) {
        res.status(500).json({ msg: 'El producto no se pudo eliminar' })
    }
};

export const deleteProductsInCartController = async (req, res)=>{
    try {
        const cid = req.params.cid
        const clearOneCart = await manager.deleteProductsInCart(cid)
        console.log(clearOneCart)
        res.send(clearOneCart)

    } catch (error) {
        res.status(500).json({ msg: 'No se pudo eliminar los productos del carrito' })
    }
};

export const purchaseCartController = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const newTicket = await manager.purchaseCart(cartId);
        res.send(newTicket);
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo crear el ticket' }) 
    }
};
