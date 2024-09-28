import { Router } from "express";
import { isAdmin, isAuth, isNotAdmin, isNotAuth } from '../middleware/auth.js';
import { getProductViewController, getCartViewController, loginViewController, registerViewController, realTimeProductsViewController, currentViewController, chatViewController, purchaseOrderControllerView, restoreControllerView, refreshPassControllerView, usersViewController } from "../controllers/views.controller.js";

const routerViews = Router()

routerViews.get('/products', isAuth, getProductViewController);

routerViews.get('/carts/:cid', getCartViewController);

routerViews.get('/login', isNotAuth, loginViewController);

routerViews.get('/register', isNotAuth, registerViewController);

routerViews.get('/realtimeproducts', realTimeProductsViewController);

routerViews.get('/current', currentViewController);

routerViews.get('/chat', isNotAdmin, chatViewController);

routerViews.get('/purchase/:tid', purchaseOrderControllerView);

routerViews.get('/restorePassword', restoreControllerView);

routerViews.get('/refreshPassword', refreshPassControllerView);

routerViews.get('/users', isAdmin, usersViewController);

export default routerViews