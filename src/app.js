import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import routerViews from './routes/views.routes.js'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import ProductManager from './manager/productManeger.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/products', routerProd)
app.use('/carts', routerCart)
app.use('/', routerViews)

const manager = new ProductManager('./file/products.json')

socketServer.on('connection', async socket =>{
    const products = await manager.getProduct()
    socket.emit("prodList", products)
    console.log("Nuevo cliente conectado")
})

socketServer.on('connection', async socket =>{
    socket.on('productForm', data)
    const dataForm = await manager.addProduct(data)

})


