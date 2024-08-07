import dotenv from "dotenv";

dotenv.config();

export const portConection = process.env.PORT

export const mongoConection = process.env.MONGO_URL;

export const emailConection = process.env.EMAIL;

export const passwordConection = process.env.PASSWORD; 

export const secretConection = process.env.SECRET;


export default {
    persistence: process.env.PERSISTENCE
}

 