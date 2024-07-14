import dotenv from "dotenv";

dotenv.config();

export const portConection = process.env.PORT
console.log(portConection);

export const mongoConection = process.env.MONGO_URL;
console.log(mongoConection);
