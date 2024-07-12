import { Router } from 'express'
import { createCartController, getCartController, addProductController, upDateQuantityController, deleteOneController, deleteProductsInCartController } from '../controllers/cart.controller.js'

const routerCart = Router()



routerCart.post('/', createCartController);

routerCart.get('/:cid', getCartController);

routerCart.post('/:cid/product/:pid', addProductController);

routerCart.put('/:cid/products/:pid', upDateQuantityController);

routerCart.delete('/:cid/product/:pid', deleteOneController);

routerCart.delete('/carts/:cid', deleteProductsInCartController);

export default routerCart 