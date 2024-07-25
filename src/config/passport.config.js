import passport from 'passport';
import local from 'passport-local';
import githubStrategy from 'passport-github2';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js';
import cartManagerDb from '../dao/manager/db/cartManagerDb.js'

const cartManager = new cartManagerDb()

const localStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                let userData = await userModel.findOne({ email: username });
                if (userData) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                const newCart = await cartManager.createCart()
                
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: newCart
                }
                if (email === "adminCoder@coder.com" && password === "adminCod3r123") {

                    newUser.role = "admin"

                } else {
                    newUser.role = "usuario"
                }

                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("No se pudo encontrar el usuario" + error)
            }
        }
    ));
    
    passport.use('github', new githubStrategy({
        clientID: "Iv23li5fPWmK4DK5QVXc",
        clientSecret: "e4e4922f812fb4f9b23147e9349982f539c32ee6",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            let user= await userModel.findOne({email: profile._json.email});

            if(!user){
                let newUser={
                    first_name: profile._json.name,
                    last_name:"",
                    age: 29,
                    email: profile._json.email,
                    password:""
                }

                let result= await userModel.create(newUser);
                done(null, result)

            }else{
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    });

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })
            if (!user) {
                console.log('El usuario no existe')
                return done(null, user)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('current', new localStrategy({usernameField: 'email'}, async (username,password, done)=>{
        try {
            const user = await userModel.findOne({email: username})
            if (!user) {
                console.log('El usuario no existe')
                return done(null, user)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

};

export default initializePassport;


