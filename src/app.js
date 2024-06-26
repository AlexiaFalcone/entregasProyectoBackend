import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import routerViews from './routes/views.routes.js'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/carts.routes.js'
import ChatManager from './dao/manager/db/chatManager.js'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import routerSession from './routes/session.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

mongoose.connect("mongodb+srv://alexiafalcone1995:carmina2024@cluster0.wdy9r2h.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error al conectar a la base de datos", error))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:"mongodb+srv://alexiafalcone1995:carmina2024@cluster0.wdy9r2h.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"})
}))

app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)
app.use('/api/sessions', routerSession)
app.use('/', routerViews)

const manager = new ChatManager()

socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado")

    socket.on('message', async data => {

        await manager.createMessage(data)

        const chat = await manager.getMessages()
        socket.emit('messageLogs', chat)
    })
})



