import { Router } from "express";
import { userPremiumController, userDocumentsController, allUsersController, deleteUserExpiredConnection, deleteUserController} from "../controllers/users.controller.js";
import { uploader } from "../utils.js";
import { isAdmin } from "../middleware/auth.js";

const routerUser = Router()

routerUser.put('/premium/:uid', isAdmin, userPremiumController);

routerUser.post('/:uid/documents', uploader.fields([{name: "identificacion", maxCount: 1}, {name: "domicilio", maxCount: 1}, {name: "estadoDeCuenta", maxCount: 1}]) ,userDocumentsController);

routerUser.get('/', allUsersController);

routerUser.delete('/expiredConnection', deleteUserExpiredConnection);

routerUser.delete('/:uid', isAdmin, deleteUserController);

export default routerUser