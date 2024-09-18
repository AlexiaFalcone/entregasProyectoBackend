import userModel from "../dao/models/users.model.js";

export const lastConnection = async (req, res, next)=>{

    const uid = req.user._id;
    const user = await userModel.findOne({_id: uid});
    
    let date = "";

    if(req.url == '/login'){
        date = new Date()
    }
    if(req.url == '/logout'){
        date = new Date()
    }else{
        res.send({error: "Error al cargar la última conexión"})
    }

    console.log(date)
    user.last_connection = date;
    await userModel.updateOne({_id: uid}, {$set: user});

    next()
};