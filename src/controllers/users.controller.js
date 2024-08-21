import userManager from "../dao/manager/db/userManagerDb.js";

const manager = new userManager()

export const userPremiumController = async (req, res)=>{
    const userId = req.params.uid 
    const newRole = await manager.changeRole(userId)
    res.send(newRole)
}