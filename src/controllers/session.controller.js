export const registerSessionController = async (req, res)=>{
    res.send({ status: 'success', message: 'Usuario registrado' })
};
export const failRegisterSessionController = async (req, res)=>{
    console.log('error al registrar el usuario');
    res.send({ error: 'No se pudo registrar el usuario' })
};

export const loginSessionController = async (req, res)=>{
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
};

export const failLoginSessionController = async (req, res)=>{
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
