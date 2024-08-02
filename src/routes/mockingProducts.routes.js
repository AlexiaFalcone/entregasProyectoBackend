import { Router } from "express"; 
import { generateProduct } from "../utils.js";


const routerMocking = Router();

routerMocking.get('/', (req, res)=>{
    let products = [];
    for(let i = 0; i < 101; i++) {
        const product = generateProduct();
        products.push(product)
    }
    res.json({products})
})

export default routerMocking; 