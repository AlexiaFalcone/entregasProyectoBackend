import userModel from "../../models/users.model.js";
import { createHash, isValidPassword } from '../../../utils.js';

class userManager {

    constructor() {

    }

    async newUserPassword(email, newPassword) {
        try {
            const user = await userModel.findOne({ email: email })

            if (!user) {
                return res.send('El usuario no existe.')
            }
            if (isValidPassword(user, newPassword)) {
                return console.log('No puedes usar la misma contraseña.')
            }
            const userData = {
                ...user._doc,
                password: createHash(newPassword)
            };
            const userUpdate = await userModel.findOneAndUpdate({ email: email }, userData);
            return userUpdate
        } catch (error) {
            throw error
        }
    }

    async changeRole(userId) {
        try {
            const user = await userModel.findById({ _id: userId }).lean()
           
            const newRole = user.role === 'usuario' ? 'premium' : 'usuario';
            user.role = newRole

            const newRoleUser = await userModel.updateOne({ _id: userId }, user)
            return newRoleUser
        } catch (error) {
            throw error
        }
    }
}

export default userManager