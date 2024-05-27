import { Router } from "express";
import ProductManager from "../dao/manager/fileSystem/productManeger.js";

const routerViews = Router()
const manager = new ProductManager('../src/file/products.json')

 routerViews.get('/', async (req, res) =>{
     const prod = await manager.getProduct()
     res.render('home', {prod})
 })

 routerViews.get('/realtimeproducts', async (req, res) =>{
    res.render('realTimeProducts')
 })
 routerViews.get('/chat', async (req, res) =>{
    res.render('chat')
 })
export default routerViews