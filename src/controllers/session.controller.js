import CartManegerDb from "../dao/manager/db/cartManagerDb.js";
import userManager from "../dao/manager/db/userManagerDb.js";

const managerUser = new userManager()
const manager = new CartManegerDb()

export const registerSessionController = async (req, res)=>{
    
    res.send({ status: 'success', message: 'Usuario registrado' });
};
export const failRegisterSessionController = async (req, res)=>{
    req.logger.error('Register failed');
    res.send({ error: 'No se pudo registrar el usuario' });
};

export const loginSessionController = async (req, res)=>{
    if (!req.user) return res.status(400).send({ status: "error", error: "Campos incompletos" })

    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: req.user.cart[0]._id
        };   
        res.redirect('/products');

    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión.' });
    }
};

export const failLoginSessionController = async (req, res)=>{
    req.logger.error('Login failed')
    res.send({error: 'No se pudo encontrar el usuario'})
};

export const githubSessionController = async (req, res)=>{};

export const githubCallbackSessionController = async (req, res)=>{
    req.session.user=req.user
    res.redirect('/products');
};

export const logoutSessionController = async (req, res)=>{
    try {
        console.log("Sesión cerrada")
        req.session.destroy((error) => {
            if (error) return res.status(500).send('Error al cerrar sesión');
            res.redirect('/login');
        });
    } catch (error) {
        req.logger.error('Logout failed');
        res.status(500).json({ msg: 'No se pudo cerrar sesión.' });
    }
};

export const currentSessionController = async (req, res)=>{
    try {
        req.session.user=req.user
        res.redirect('/current');
    } catch (error) {
        res.status(500).json({ msg: 'Error al cargar los datos del usuario.' });
    }
};

export const failCurrentSessionController = async (req, res)=>{
    res.send({error: 'No se pudo encontrar el usuario'})
};

export const restorePassword = async(req, res)=>{
    try {
        const userMail = req.body.email
        const sendEmail = await manager.sendTicket()

        let result = sendEmail.sendMail({
            from: 'alexiafalcone1995@gmail.com',
            to: `${userMail}`,
            subject: 'Link para restabler contraseña',
            html: `<div>
            <p>Ingrese al siguiente link restabler contraseña:</p>
            <a href="/refreshPassword">Nueva contraseña</a>
            </div>
            `
        });
        res.send(result)
        
    } catch (error) {
     console.error(error)   
    }
}

export const newPassController = async(req, res)=>{
    const newData = req.body
    const {email, newPassword} = newData
    const refreshPass = await managerUser.newUserPassword(email, newPassword)
    res.send(refreshPass)
}