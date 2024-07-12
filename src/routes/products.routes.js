
import { Router } from 'express'
import productManagerDb from '../dao/manager/db/productManagerDb.js'
import { getProductController, getProdByIdController, addProductController } from '../controllers/product.controller.js'

const routerProd = Router()
const manager = new productManagerDb()


routerProd.get('/products', getProductController);

routerProd.get('/:pid', getProdByIdController);

routerProd.post('/products', addProductController);

routerProd.put('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const product = req.body
        const prodUpdate = await manager.upDateProduct(product, prodId)
        res.send(prodUpdate)
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo actualizar el producto.' })
    }

})

routerProd.delete('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const prodDelete = await manager.deleteProduct(prodId)
        res.send(prodDelete)
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo eliminar el producto.' })
    }
})

export default routerProd