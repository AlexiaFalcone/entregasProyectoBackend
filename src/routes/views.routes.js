import { Router } from "express";
import productManagerDb from "../dao/manager/db/productManagerDb.js";

const routerViews = Router()
const manager = new productManagerDb()

routerViews.get('/products', async (req, res) => {
   try {
      let { limit = 10, page = 1, sort, category } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      let { result, status } = await manager.getProductsPaginate(page, category, sort);
      let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result;
      const response = {
         status: status,
         payload: docs,
         totalPages,
         hasNextPage,
         hasPrevPage,
         page,
         prevPage,
         nextPage,
         totalDocs,
         prevLink: page > 1 ? `/home?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${category || ''}` : null,
         nextLink: page < totalPages ? `/home?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${category || ''}` : null  
      }
      console.log(response)
      return res.render('home', {response})
      

      // return res.render('home', {
      //    status: status,
      //    docs,
      //    totalPages,
      //    hasNextPage,
      //    hasPrevPage,
      //    page,
      //    prevPage,
      //    nextPage,
      //    totalDocs,
      //    prevLink: page > 1 ? `/home?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${category || ''}` : null,
      //    nextLink: page < totalPages ? `/home?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${category || ''}` : null
      // })


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