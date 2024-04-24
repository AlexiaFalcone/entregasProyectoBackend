import express from 'express'
import { Router } from 'express'
import fs from 'fs'

const router = Router()

router.get('/products', (req, res) =>{
    res.json(data)

    try {
        const data = fs.readFile('products.json', 'utf8')
        return JSON.parse(data)
    } catch (error) {
        res.status(404).json({ message: "No se ha encontrado ningún producto" })
    }
})