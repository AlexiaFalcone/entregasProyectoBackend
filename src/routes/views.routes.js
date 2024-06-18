import { Router } from "express";
import productManagerDb from "../dao/manager/db/productManagerDb.js";

const routerViews = Router()
const manager = new productManagerDb()

routerViews.get('/products', async (req, res) => {
   try {
      let { limit = 10, page = 1, sort, category } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      let result = await manager.getProductsPaginate(page, category, sort);
      console.log(result)
      return res.render('home', result)
   } catch (error) {
      res.status(500).json({ msg: 'No se encontraron productos' })
   }
})

routerViews.get('/realtimeproducts', async (req, res) => {
   res.render('realTimeProducts')
})
routerViews.get('/chat', async (req, res) => {
   res.render('chat')
})
export default routerViews