
import { Router } from 'express'
import fs from 'fs/promises'
import ProductManager from '../manager/productManeger.js'

const routerProd = Router()

const manager = new ProductManager('../file/products.js')

routerProd.get('/', async (req, res) => {
    const products = await manager.getProduct()
    let limit = parseInt(req.query.limit)
    let limitProduct = [...products]

    if(!isNaN(limit) && limit > 0){
        limitProduct = limitProduct.slice(0, limit)
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
routerProd.post('/products', (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    const lastId = products.length > 0 ? products[products.length - 1].id : 0
    newProduct.id = lastId + 1
    const status = true
    const newProduct = {
        id,
        status,
        title,
        description,
        code,
        price,
        stock,
        category
    }
    products.push(newProduct)
    
    res.json({ message: "Producto agregado." })
    fs.writeFile('products.json', JSON.stringify(newProduct, null, 2))
    console.log(newProduct)
})

export default routerProd