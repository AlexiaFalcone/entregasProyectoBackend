import express from 'express'
import __dirname from '../primer_preentrega/utils.js'
import routerProd from './src/routes/products.routes.js'
import routerCart from './src/routes/carts.routes.js'
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.use('/products', routerProd)
app.use('/carts', routerCart)

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})
