import userManager from "../dao/manager/db/userManagerDb.js";

const manager = new userManager()

export const userPremiumController = async (req, res)=>{
    const userId = req.params.uid 
    const newRole = await manager.changeRole(userId)
    res.send(newRole)
}

export const userDocumentsController = async (req, res) =>{
    const userId = req.params.uid
    
    const identificacion = req.files['identificacion']?.[0] || null;

    const domicilio = req.files['domicilio']?.[0] || null;
    
    const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
    
    const pushDocs = await manager.userDocuments(userId, identificacion, domicilio, estadoDeCuenta)

    res.send(pushDocs)
}