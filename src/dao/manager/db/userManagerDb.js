import userModel from "../../models/users.model.js";
import {createHash, isValidPassword} from '../../../utils.js';

class userManager {

    constructor() {

    }

    async newUserPassword(email, newPassword) {
        try {
            const user = await userModel.findOne({ email: email })
            
            if (!user) {
                return res.send('El usuario no existe.')
            }
            if (isValidPassword(newPassword, user.password)) {
                return res.send('No puedes usar la misma contraseña.')
            }
            const userData = {
                ...user._doc,
                password: createHash(newPassword)
            };
            const userUpdate = await userModel.findOneAndUpdate({ email: email }, userData);
            res.send(userUpdate)
        } catch (error) {
            throw error
        }
    }
}

export default userManager