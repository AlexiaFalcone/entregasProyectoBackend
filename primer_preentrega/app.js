import express from 'express'
import path from 'path'
// agregar las dos rutas cuando este OK//
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})