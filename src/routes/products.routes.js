
import { Router } from 'express'
import { getProductController, getProdByIdController, addProductController, upDateProductController, deleteProductController} from '../controllers/product.controller.js'
import { isAdmin } from '../middleware/auth.js'

const routerProd = Router()

routerProd.get('/products', getProductController);

routerProd.get('/:pid', getProdByIdController);

routerProd.post('/products', isAdmin, addProductController);

routerProd.put('/:pid', isAdmin, upDateProductController);

routerProd.delete('/:pid', isAdmin, deleteProductController);

export default routerProd