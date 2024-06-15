import productModel from "../../models/products.model.js";


class productManagerDb {
    constructor() {

    }

    async addProduct(newProd) {
        try {
            let { title, description, price, code, stock, category } = newProd
            let createProd = await productModel.create({ title, description, price, code, stock, category })
            return createProd

        } catch (error) {
            console.log(error)
        }
    }

    async getProduct() {
        try {
            let products = await productModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsPaginate(page, category, sort) {
            
        try {
            if (sort) {
                let sortOrder = {};
                sortOrder = sort === 'asc' ? 1 : -1;
                const result = await productModel.paginate({},{sort: {price: sortOrder}, lean:true})
                console.log(result.docs)
                return {
                    code: 202,
                    status: 'success',
                    result
                }
            }if(!category){

                let allProd = await productModel.paginate({}, {limit:4, page, lean: true})
                //console.log(allProd)
                return allProd
                
            }else{
                let result = await productModel.paginate({ category: category }, { limit: 4, page, lean: true });
                return {
                    code: 202,
                    status: 'success',
                    result
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const singleProduct = await productModel.findOne(id)
            return singleProduct
        } catch (error) {
            console.log(error)
        }
    }

    async upDateProduct(productId, update) {
        try {
            const { title, description, price, code, stock, category } = update
            const prodFind = await productModel.findById({ _id: productId })

            if (title) {
                prodFind.title = title
            } if (description) {
                prodFind.description = description
            } if (price) {
                prodFind.price = price
            } if (code) {
                prodFind.code = code
            } if (stock) {
                prodFind.stock = stock
            } if (category) {
                prodFind.category = category
            }

            const updateItem = await productModel.updateOne({ _id: productId }, prodFind)
            return updateItem

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(productId) {
        try {
            const deleteOne = await productModel.deleteOne({ _id: productId })
            return deleteOne

        } catch (error) {
            console.log(error)
        }
    }
}

export default productManagerDb;