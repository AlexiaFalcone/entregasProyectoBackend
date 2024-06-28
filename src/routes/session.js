import { Router } from "express";
import users from '../dao/models/users.model.js'


const routerSession = Router()

routerSession.post('/register', async (req, res) =>{
    const {first_name, last_name, email, age, password} = req.body;

    try {
        const newUser = new users({first_name, last_name, email, age, password});

        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){

            newUser.role = "admin"

        }else{
            newUser.role ="usuario"
        }

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        if(newUser){
            res.redirect('/login')
        }else{
            res.status(500).json({ msg: 'No se pudo registrar el usuario.' });
        }
    }
})

routerSession.post('/login', async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await users.findOne({email, password});
        
        if(user.length === 0) return res.redirect('/register')

        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role
        };
        console.log(req.session.user)
        res.redirect('/products');

    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión.' });
    }
})

routerSession.post('/logout', async (req, res) =>{
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