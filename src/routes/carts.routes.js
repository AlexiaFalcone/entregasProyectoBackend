import { Router } from 'express'
import CartManegerDb from '../dao/manager/db/cartManagerDb.js'

const routerCart = Router()
const manager = new CartManegerDb()


routerCart.post('/', async (req, res) => {
    try {
        const newCart = await manager.createCart()
        res.send(newCart)
    } catch (error) {
        res.status(500).json({msg: 'No se pudo crear el carrito'})
    }

})

routerCart.get('/:cid', async (req, res)=>{
    try {
        const cartId = req.params.cid
        const sigleCart = await manager.getCartById(cartId)
        res.send(sigleCart)
    } catch (error) {
        res.status(404).json({msg: 'No se encontro el carrito'})
    }
})

// routerCart.post('/:cid/product/:pid', async (req, res)=>{
//     try {
//         const cartId = req.params.cid
//         const productId = req.params.pid
//         const product = req.body
//         const addProd = await manager.addProductCart(cartId, product, productId)
//         res.json(addProd)
        
//     } catch (error) {
//         res.status(500).json({msg: 'El producto no se pudo agregar'})
//     }
// })

export default routerCart 