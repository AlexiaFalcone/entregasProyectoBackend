import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import routerProd from './src/routes/products.routes.js'
import routerCart from './src/routes/carts.routes.js'
import routerViews from './src/routes/views.routes.js'

const app = express()
const PORT = 8080

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/products', routerProd)
app.use('/carts', routerCart)
app.use('/', routerViews)

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})
