import { Router, response } from "express";
import productManagerDb from "../dao/manager/db/productManagerDb.js";

const routerViews = Router()
const manager = new productManagerDb()

routerViews.get('/products', async (req, res) => {
   try {
      let { limit = 10, page = 1, sort, category } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      let {status, result} = await manager.getProductsPaginate(page, category, sort);
      const {docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink} = result
      result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
      result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
      
      //console.log(result)
      return res.render('home', {
         status: status,
         docs,
         totalPages,
         page,
         prevPage,
         nextPage,
         hasPrevPage,
         hasNextPage,
         prevLink,
         nextLink
      })
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