
import { Router } from 'express'
import productManagerDb from '../dao/manager/db/productManagerDb.js'

const routerProd = Router()
const manager = new productManagerDb()


// routerProd.get('/', async (req, res) => {
//     try {
//         const products = await manager.getProduct()
//         res.send(products)
//     } catch (error) {
//         res.status(500).json({ msg: 'No se encontraron productos' })
//     }

// })

routerProd.get('/products', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, category } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);
        let { result, status } = await manager.getProductsPaginate(page, category, sort);
        let {docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result;
                
        
    return res.send({
        status: status,
        docs,
        totalPages,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        totalDocs,
        prevLink: page > 1 ? `/home?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${category || ''}` : null,
        nextLink: page < totalPages ? `/home?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${category || ''}` : null    
    })
    

    } catch (error) {
        res.status(500).json({ msg: 'No se encontraron productos' })
    }
})

routerProd.get('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const prodUnico = await manager.getProductById(prodId)
        res.send(prodUnico)
    } catch (error) {
        res.status(500).json({ msg: 'No se encontró el producto.' })
    }

})

routerProd.post('/products', async (req, res) => {
    try {
        const product = req.body
        const newProd = await manager.addProduct(product)
        res.send(newProd)
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo agregar el producto.' })
    }
})

routerProd.put('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const product = req.body
        const prodUpdate = await manager.upDateProduct(product, prodId)
        res.send(prodUpdate)
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo actualizar el producto.' })
    }

})

routerProd.delete('/:pid', async (req, res) => {
    try {
        const prodId = req.params.pid
        const prodDelete = await manager.deleteProduct(prodId)
        res.send(prodDelete)
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo eliminar el producto.' })
    }
})

export default routerProd