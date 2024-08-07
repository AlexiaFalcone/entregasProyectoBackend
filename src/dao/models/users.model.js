import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    role: String, 
    cart:{
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts"
                }
            }
        ],
        default: []
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel