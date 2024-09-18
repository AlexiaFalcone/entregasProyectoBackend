import { Router } from "express";
import passport from "passport";
import { registerSessionController, failRegisterSessionController, loginSessionController, failLoginSessionController, githubSessionController, githubCallbackSessionController, logoutSessionController, currentSessionController, failCurrentSessionController, restorePassword, newPassController } from "../controllers/session.controller.js";
import { lastConnection } from "../middleware/lastConnection.js";

const routerSession = Router()

routerSession.post('/register', passport.authenticate('register', { failureRedirect: 'failregister' }), registerSessionController);

routerSession.get('failregister', failRegisterSessionController);

routerSession.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), loginSessionController, lastConnection);

routerSession.get('faillogin', failLoginSessionController);

routerSession.get("/github", passport.authenticate("github",{scope:["user:email"]}),githubSessionController);


routerSession.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),githubCallbackSessionController);

routerSession.post('/logout', lastConnection, logoutSessionController);

routerSession.get('/current', passport.authenticate('current', {failureRedirect: 'failcurrent'}), currentSessionController);

routerSession.get('failcurrent', failCurrentSessionController);

routerSession.post('/restore', restorePassword);

routerSession.post('/newpass', newPassController);

export default routerSession