import { Router } from "express";
import {isAuth, isNotAuth} from '../middleware/auth.js';
import { getProductViewController, getCartViewController, loginViewController,registerViewController, realTimeProductsViewController, currentViewController, chatViewController } from "../controllers/views.controller.js";

const routerViews = Router()

routerViews.get('/products', isAuth, getProductViewController);

routerViews.get('/carts/:cid', getCartViewController);

routerViews.get('/login', isNotAuth, loginViewController);

routerViews.get('/register', isNotAuth, registerViewController);

routerViews.get('/realtimeproducts', realTimeProductsViewController);

routerViews.get('/current', currentViewController);

routerViews.get('/chat', chatViewController);

export default routerViews