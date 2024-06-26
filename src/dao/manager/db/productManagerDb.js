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
            throw error
        }
    }

    async getProduct() {
        try {
            let products = await productModel.find()
            return products
        } catch (error) {
            throw error
        }
    }

    async getProductsPaginate(page, category, sort) {
        try {
            if (!category && !sort) {

                const result = await productModel.paginate({}, { page, limit: 6, lean: true })
                result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
                result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';

                return {
                    code: 202,
                    status: "success",
                    result
                }
            } else {

                const query = category ? { category } : {};

                const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

                const result = await productModel.paginate(query, { sort: sortOption, limit: 4, page, lean: true });
                result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
                result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';

                return {
                    code: 202,
                    status: 'success',
                    result
                }
            }
        } catch {
            throw error
        }
    };

    async getProductById(id) {
        try {
            const singleProduct = await productModel.findOne(id)
            return singleProduct
        } catch (error) {
            throw error
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
            throw error
        }
    }

    async deleteProduct(productId) {
        try {
            const deleteOne = await productModel.deleteOne({ _id: productId })
            return deleteOne

        } catch (error) {
            throw error
        }
    }
}

export default productManagerDb;