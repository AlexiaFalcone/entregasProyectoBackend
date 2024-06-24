import { Router, response } from "express";
import productManagerDb from "../dao/manager/db/productManagerDb.js";
import CartManegerDb from "../dao/manager/db/cartManagerDb.js";

const routerViews = Router()
const manager = new productManagerDb()
const managerCart = new CartManegerDb()

routerViews.get('/products', async (req, res) => {
   try {

      let { limit = 10, page = 1, sort, category } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      let { status, result } = await manager.getProductsPaginate(page, category, sort);
      const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink } = result

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

routerViews.get('/carts/:cid', async (req, res) =>{
   try {
      
       const cid = req.params.cid
       const cartView = await managerCart.getCart(cid);
       const productCart = cartView[0].products

      return res.render('cart', {productCart})

   } catch (error) {
      res.status(500).json({ msg: 'No se encontró el carrito' })
   }
})

routerViews.get('/realtimeproducts', async (req, res) => {
   res.render('realTimeProducts')
})
routerViews.get('/chat', async (req, res) => {
   res.render('chat')
})
export default routerViews