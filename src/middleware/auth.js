export const isAuth = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

export const isNotAuth = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/products');
    }
};

export const isAdmin = (req, res, next) =>{
    if (req.session.user.role == 'admin'){
        return next()
    } else {
        res.send({error: 'No eres administrador'})
    }
}

export const isNotAdmin = (req, res, next) =>{
   
    if (req.session.user.role == 'usuario'){
        return next()
    } else {
        res.send({error: 'Ruta exclusiva para usuarios'})
    }
}