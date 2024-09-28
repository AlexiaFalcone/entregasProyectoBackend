import userManager from "../dao/manager/db/userManagerDb.js";

const manager = new userManager()

export const userPremiumController = async (req, res)=>{
    const userId = req.params.uid 
    const newRole = await manager.changeRole(userId)
    res.send(newRole)
};

export const userDocumentsController = async (req, res) =>{ 
    const userId = req.params.uid
    
    const identificacion = req.files['identificacion']?.[0] || null;

    const domicilio = req.files['domicilio']?.[0] || null;
    
    const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
    
    const pushDocs = await manager.userDocuments(userId, identificacion, domicilio, estadoDeCuenta)

    res.send(pushDocs)
};

export const allUsersController = async (req, res) =>{
    try {
        const users = await manager.getAllUsers()
        res.send(users)
        
    } catch (error) {
        res.status(500).json({ msg: 'No se encontraron usuarios' })
    }
};

export const deleteUserExpiredConnection = async (req, res) =>{
    try {
      const deleteUserExpired = await manager.deleteUsers()
      res.send(deleteUserExpired)
        
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo eliminar el usuario' })
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.uid
        const deleteDb = await manager.deleteUserDb(userId)
        res.send(deleteDb)
        
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo eliminar el usuario' })  
    }
}
