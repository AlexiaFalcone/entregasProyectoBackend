import { Router } from "express";
import { userPremiumController } from "../controllers/users.controller.js";

const routerUser = Router()

routerUser.put('/premium/:uid', userPremiumController);

export default routerUser