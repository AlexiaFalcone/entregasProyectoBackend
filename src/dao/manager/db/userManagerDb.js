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
           
           if(user.status == "complete"){
               const newRole = user.role === 'user' ? 'premium' : 'user';
               user.role = newRole
           }else{
            console.log("Debe cargar los documentos requeridos")
           }
           
            const newRoleUser = await userModel.updateOne({ _id: userId }, user)
            return newRoleUser
        } catch (error) {
            throw error
        }
    };

    async userDocuments(userId, identificacion, domicilio, estadoDeCuenta){

        const user = await userModel.findById(userId);

        const docs = [];

        if(identificacion){
            docs.push({name:"identificacion", reference:identificacion.filename})
        }
        if(domicilio){
            docs.push({name:"domicilio", reference:domicilio.filename})
        }
        if(estadoDeCuenta){
            docs.push({name:"estadoDeCuenta", reference:estadoDeCuenta.filename})
        }
        if(docs.length ===3){
            user.status = "complete"
        }else{
            user.status = "incomplete"
        }

        user.documents = docs;

        const userUpdate = await userModel.findByIdAndUpdate(user._id,user)

        return userUpdate
    }
}



export default userManager