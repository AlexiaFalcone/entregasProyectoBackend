import fs from 'fs/promises'
import path from 'path'

class ProductManager {

    constructor(path) {

        this.path = path
        this.productos = []
    }
    async addProduct(newProducto) {

        try {
            let productos = await this.getProduct()
            const productoEncontrado = productos.find((producto) => producto.code === newProducto.code)

            if (productoEncontrado) {
                console.log("El producto ya se encuentra registrado.")
                return
            }
            const lastId = productos.length > 0 ? productos[productos.length - 1].id : 0

            newProducto.id = lastId + 1
            console.log(newProducto)

            productos.push(newProducto)

            await fs.writeFile(this.path, JSON.stringify(productos, null, 2))
        } catch (error) {
            console.error("Error al crear el usuario", error)
        }
    }
    async getProduct() {
        try {
            const data = await fs.readFile(this.path, 'utf8')

            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }
    async getProductById(producto_id) {
        try {
            let productoPorId = await this.getProduct()
            const productoUnico = productoPorId.find((producto) => producto_id == producto.id)
            if (!productoUnico) {
                console.log("Error, el producto no exite.")
                return
            }
            return productoUnico
        } catch (error) {
            console.error("Error el producto no existe", error)
        }
    }
    async upDateProduct(update, producto_id) {
        try {
            const { title, description, price, thumbnail, code, stock } = update
            let productos = await this.getProduct()
            let productFind = productos.find((prod) => prod.id == producto_id)

            if (update) {
                productFind.title = title
                productFind.description = description
                productFind.price = price
                productFind.thumbnail = thumbnail
                productFind.code = code
                productFind.stock = stock
            }

            await fs.writeFile(this.path, JSON.stringify(productos, null, 2))
            return productFind
        } catch (error) {
            console.error('No se pudo actualizar', error)
        }
    }
    async deleteProduct(producto_id) {
        try {
            let productos = await this.getProduct()
            let productoFind = productos.findIndex((prod) => prod.id == producto_id)
            console.log(productoFind)
            let productoEliminado = productos.splice(productoFind, 1)
            console.log(productoEliminado)
            await fs.writeFile(this.path, JSON.stringify(productos, null, 2))
            return productoEliminado
        }catch(error){
            console.error('No se pudo eliminar el producto', error)
        }
    }
}


export default ProductManager