import { Router } from "express";
import { logsController } from "../controllers/logger.controller.js";

const loggerRouter = Router();

loggerRouter.get('/loggerTest', logsController);

export default loggerRouter;