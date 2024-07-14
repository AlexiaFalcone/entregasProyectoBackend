import productManagerDb from "../dao/manager/db/productManagerDb.js";
import CartManegerDb from "../dao/manager/db/cartManagerDb.js";

const manager = new productManagerDb()
const managerCart = new CartManegerDb()

export const getProductViewController = async (req, res)=>{
    try {
        const userData = req.session.user
        console.log(req.session)
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
           nextLink,
           userData
        })
     } catch (error) {
        res.status(500).json({ msg: 'No se encontraron productos' })
     }
};

export const getCartViewController = async (req, res)=>{
    try {
      
        const cid = req.params.cid
        const cartView = await managerCart.getCart(cid);
        const productCart = cartView[0].products
 
       return res.render('cart', {productCart})
 
    } catch (error) {
       res.status(500).json({ msg: 'No se encontró el carrito' })
    }
};

export const loginViewController = async (req, res)=>{
    res.render('login')
};

export const registerViewController = async (req, res)=>{
    res.render('register')
};

export const realTimeProductsViewController = async (req, res)=>{
    res.render('realTimeProducts')
};

export const currentViewController = async (req, res)=>{
    res.render('current', {user: req.session.user});
};

export const chatViewController = async (req, res)=>{
    res.render('chat')
};




