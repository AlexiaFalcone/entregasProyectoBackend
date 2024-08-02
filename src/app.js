import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import {__dirname} from './utils.js';
import routerViews from './routes/views.routes.js';
import routerProd from './routes/products.routes.js';
import routerCart from './routes/carts.routes.js';
import ChatManager from './dao/manager/db/chatManager.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import routerSession from './routes/session.routes.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { portConection, mongoConection, secretConection } from './config/database.js';
import routerMocking from './routes/mockingProducts.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express()
const PORT = portConection;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

mongoose.connect(mongoConection)
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
    secret: secretConection,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:mongoConection})
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', routerProd);
app.use('/api/carts', routerCart);
app.use('/api/sessions', routerSession);
app.use('/', routerViews);
app.use('/api/mockingproducts', routerMocking);
app.use(errorHandler);

const manager = new ChatManager()

socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado")

    socket.on('message', async data => {

        await manager.createMessage(data)

        const chat = await manager.getMessages()
        socket.emit('messageLogs', chat)
    })
})



