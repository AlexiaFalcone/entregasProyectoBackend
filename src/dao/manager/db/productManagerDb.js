import productModel from "../../models/products.model.js";

class productManagerDb {
    constructor(){

    }

    async addProduct(newProd){
        try {
            let {title, description, price, code, stock, category} = newProd
            let createProd = await productModel.create({title, description, price, code, stock, category})
            return createProd
            
        } catch (error) {
           console.log(error) 
        }
    }

    async getProduct(){
        try {
            let products = await productModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){
        try {
           const singleProduct = await productModel.findOne(id)  
           return singleProduct    
        } catch (error) {
            console.log(error)
        }
    }

    async upDateProduct(productId, update){
        try {
            const { title, description, price, code, stock, category } = update
            const prodFind = await productModel.findById({_id: productId})

            if (title) {
                prodFind.title = title
            }if(description){
                prodFind.description = description
            }if(price){
                prodFind.price = price
            }if(code){
                prodFind.code = code
            }if(stock){
                prodFind.stock = stock
            }if(category){
                prodFind.category = category
            }

            const updateItem = await productModel.updateOne({_id: productId}, prodFind)
            return updateItem

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(productId){
        try {
           const deleteOne = await productModel.deleteOne({_id: productId})
           return deleteOne        

        } catch (error) {
            console.log(error)
        }
    }
}

export default productManagerDb;