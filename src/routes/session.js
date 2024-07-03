import { Router } from "express";
import userModel from '../dao/models/users.model.js'
import { isValidPassword } from "../utils.js";
import passport from "passport";


const routerSession = Router()

routerSession.post('/register', passport.authenticate('register', { failureRedirect: 'failregister' }), async (req, res) => {
    res.send({ status: 'success', message: 'Usuario registrado' })
})

routerSession.get('failregister', async (req, res) => {
    console.log('error al registrar el usuario');
    res.send({ error: 'No se pudo registrar el usuario' })
})

routerSession.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), async (req, res) => {
    
    if (!req.user) return res.status(400).send({ status: "error", error: "Campos incompletos" })

    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        };
        console.log(req.session.user)
        res.redirect('/products');

    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión.' });
    }
})

routerSession.get('faillogin', async(req, res)=>{
    res.send({error: 'No se pudo encontrar el usuario'})
})

routerSession.get("/github", passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})


routerSession.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),async(req,res)=>{
    req.session.user=req.user
    res.redirect('/products')
})

routerSession.post('/logout', async (req, res) => {
    try {
        console.log("Sesión cerrada")
        req.session.destroy((error) => {
            if (error) return res.status(500).send('Error al cerrar sesión');
            res.redirect('/login');
        });
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo cerrar sesión.' });
    }
})

export default routerSession