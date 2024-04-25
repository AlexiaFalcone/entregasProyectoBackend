
import { Router } from 'express'
import fs from 'fs'

const routerProd = Router()

routerProd.get('/products', (req, res) => {

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: "No se ha encontrado ningún producto." })
        }
        const products = JSON.parse(data)
        let limit = parseInt(req.query.limit)
        let limitProduct = [...products]

        if (!isNaN(limit) && limit > 0) {
            limitProduct = limitProduct.slice(0, limit)
            res.json(limitProduct)
        } else {
            res.send(products)
        }
    })
})

routerProd.get('/:pid', (req, res) => {
    const prodId = parseInt(req.params.pid)
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: "No se ha encontrado el producto solicitado." })
        }
        const products = JSON.parse(data)
        const singleProduct = products.find((product) => product.id == prodId)
        if (singleProduct) {
            res.json(singleProduct)
        }
    })
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