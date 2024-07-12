
import { Router } from 'express'
import productManagerDb from '../dao/manager/db/productManagerDb.js'
import { getProductController, getProdByIdController, addProductController, upDateProductController, deleteProductController} from '../controllers/product.controller.js'

const routerProd = Router()
const manager = new productManagerDb()


routerProd.get('/products', getProductController);

routerProd.get('/:pid', getProdByIdController);

routerProd.post('/products', addProductController);

routerProd.put('/:pid', upDateProductController);

routerProd.delete('/:pid', deleteProductController);

export default routerProd