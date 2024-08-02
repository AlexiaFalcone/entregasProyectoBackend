import {EErrors} from "../services/enum.js";

export const errorHandler = (error, req, res, next) => {
    console.log(error.cause)

    switch (error.code) {
        case EErrors.INVALID_TYTPES_ERROR:
            res.send({ status: "Error", error: error.name })
            break;
        case EErrors.DATABASE_ERROR:
            res.send({ status: "Error", error: error.name })
            break;

        default:
            res.send({status:"error", message: "Hubo un error, contacte al equipo de soporte."})
            break;
    }
    next();
}