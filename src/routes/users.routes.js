import { Router } from "express";
import { userPremiumController, userDocumentsController } from "../controllers/users.controller.js";
import { uploader } from "../utils.js";

const routerUser = Router()

routerUser.put('/premium/:uid', userPremiumController);

routerUser.post('/:uid/documents', uploader.fields([{name: "identificacion", maxCount: 1}, {name: "domicilio", maxCount: 1}, {name: "estadoDeCuenta", maxCount: 1}]) ,userDocumentsController);

export default routerUser