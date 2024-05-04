import { Router } from "express";
import ProductManager from "../manager/productManeger.js";

const routerViews = Router()
const manager = new ProductManager('../primer_preentrega/src/file/products.json')

routerViews.get('/', async (req, res) =>{
    const prod = await manager.getProduct()
    res.render('home', prod)
})

export default routerViews