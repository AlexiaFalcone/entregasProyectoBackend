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

export const isPremium = (req, res, next) =>{
    
     if (req.session.user.role == "premium" && req.session.user.role == "admin"){
        return next()
     } else {
     res.send({error: 'No eres premium'})
     }
};

export const isNotAdmin = (req, res, next) =>{
   
    if (req.session.user.role == "user"){
        return next()
    } else {
        res.send({error: 'Ruta exclusiva para usuarios'})
    }
};