import { Router } from 'express'
import { createCartController, getCartController, addProductController, upDateQuantityController, deleteOneController, deleteProductsInCartController, purchaseCartController, sendTicketController } from '../controllers/cart.controller.js'
import { isNotAdmin } from '../middleware/auth.js';

const routerCart = Router()



routerCart.post('/', createCartController);

routerCart.get('/:cid', getCartController);

routerCart.post('/:cid/product/:pid', isNotAdmin, addProductController);

routerCart.put('/:cid/products/:pid', upDateQuantityController);

routerCart.delete('/:cid/product/:pid', deleteOneController);

routerCart.delete('/carts/:cid', deleteProductsInCartController);

routerCart.post('/:cid/purchase', purchaseCartController);

routerCart.get('/email/:tid', sendTicketController);

export default routerCart 