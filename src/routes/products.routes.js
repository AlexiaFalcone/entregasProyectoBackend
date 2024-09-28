
import { Router } from 'express'
import { getProductController, getProdByIdController, addProductController, upDateProductController, deleteProductController} from '../controllers/product.controller.js'
import { isAdmin, isPremium } from '../middleware/auth.js'

const routerProd = Router()

routerProd.get('/products', getProductController);

routerProd.get('/:pid', getProdByIdController);

routerProd.post('/products', isPremium, addProductController);

routerProd.put('/:pid', isPremium, upDateProductController);

routerProd.delete('/:pid', isAdmin, deleteProductController);

export default routerProd