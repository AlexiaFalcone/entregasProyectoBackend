import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    role: {type: String, default: 'user'}, 
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
    },
    documents: {
        type: [
            {
                name: {type: String, require: true},
                reference: {type: String, require: true}
            }
        ],
        default: []
    },
    last_connection: { type: Date, default: null },
    status:{
        type: String,
        require: true,
        enums: ["complete", "incomplete", "pending"],
        default: "pending"
    },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel