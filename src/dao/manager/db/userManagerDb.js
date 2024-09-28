import userModel from "../../models/users.model.js";
import { createHash, isValidPassword } from '../../../utils.js';
import { userDataService } from "../../../repository/index.js";
import { sendDeleteEmail } from "../../../utils/email.js";


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
        try {
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
            
        } catch (error) {
            throw error
        }
    };

    async getAllUsers(){
        try {
            const usersDb = await userModel.find({}, 'first_name last_name email role').lean()
            const users = [];

            for (let i = 0; i < usersDb.length; i++) {
                const user = usersDb[i];
            
            const userDto = await userDataService.getUserRepository(user)
            users.push(userDto)
        }
        return users
        } catch (error) {
            throw error
        }
    };

    async deleteUsers(){
        try {
            const userDb = await userModel.find().lean();
            const dateNow = new Date();
            const dateExpired = dateNow.setHours(dateNow.getHours() - 2);

            const usersExpired = userDb.filter(user => user.last_connection <= dateExpired)
            const email = usersExpired.map(user => user.email);
            
             for (let i = 0; i < usersExpired.length; i++) {
                 const user = usersExpired[i];
                 await sendDeleteEmail(email)
                 await userModel.deleteOne({_id: user._id})   
              }
            
            return usersExpired

        } catch (error) {
            throw error
        }
    };

    async deleteUserDb (userId){
        const user = await userModel.findById(userId)
        const deleteOneDb = await userModel.deleteOne({_id: user._id})
        return deleteOneDb
    }

};



export default userManager