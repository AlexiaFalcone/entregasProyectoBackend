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
        const cid = req.params.cid
        const sigleCart = await manager.getCartById(cid)
        res.send(sigleCart)
    } catch (error) {
        res.status(404).json({msg: 'No se encontro el carrito'})
    }
})

 routerCart.post('/:cid/product/:pid', async (req, res)=>{
     try {
         const cid = req.params.cid         
         const pid = req.params.pid
         const addProd = await manager.addProduct(cid, pid)
         res.send(addProd)
        
     } catch (error) {
         res.status(500).json({msg: 'El producto no se pudo agregar'})
     }
 })

 
 routerCart.put('/carts/:cid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const newCart = req.body
        const cart = await manager.getCartById(cid)

        const upDateOneCart = await manager.upDateCart(cart, newCart)
        return upDateOneCart
        
    } catch (error) {
        res.status(500).json({msg: 'No se pudo actualizar el carrito'}) 
    }
 })

 routerCart.put('/carts/:cid/products/:pid', async (req, res) =>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const newQuantity = req.body

        const update = await manager.updateQuantity(cid, pid, newQuantity)
        res.send(update)
        
    } catch (error) {
        res.status(500).json({msg: 'No se pudo actualizar cantidad'})
    }
 })
 routerCart.delete('/:cid/product/:pid', async(req, res) =>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const deleteSigleProd = await manager.deleteOne(cid, pid)
        console.log(deleteSigleProd)
        res.send(deleteSigleProd)

    } catch (error) {
        res.status(500).json({msg: 'El producto no se pudo eliminar'})
    }
 })

 routerCart.delete('/carts/:cid', async (req, res)=>{
    try {
        const cid = req.params.cid
        const clearOneCart = await manager.deleteProductsInCart(cid)
        console.log(clearOneCart)
        res.send(clearOneCart)
        
    } catch (error) {
        res.status(500).json({msg: 'No se pudo eliminar los productos del carrito'}) 
    }
 })

export default routerCart 