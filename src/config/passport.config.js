import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from '../utils.js'

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
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
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
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })

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

};

export default initializePassport;

