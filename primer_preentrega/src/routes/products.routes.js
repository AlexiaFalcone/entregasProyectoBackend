
import { Router } from 'express'
import ProductManager from '../manager/productManeger.js'

const routerProd = Router()

const manager = new ProductManager('../primer_preentrega/src/file/products.json')

routerProd.get('/', async (req, res) => {
    const products = await manager.getProduct()
    const limit = parseInt(req.query.limit)

    if(!isNaN(limit) && limit > 0){
        const limitProduct = products.slice(0, limit)
        res.json(limitProduct)
    }else{
        res.send(products) 
    }    
})

routerProd.get('/:pid', async (req, res) => {
    const prodId = req.params.pid
    const prodUnico = await manager.getProductById(prodId)
    res.send(prodUnico)
})

routerProd.post('/products', async (req, res) => {
    const product = req.body
    const newProduct = await manager.addProduct(product)
    
    res.json(newProduct)
})

export default routerProd