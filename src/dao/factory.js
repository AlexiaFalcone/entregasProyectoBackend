import mongoose from "mongoose";
import { mongoConection } from "../config/database.js";

console.log(config)

export let Manager
switch (config.persistence) {
    case "MONGO":
        mongoose.connect(mongoConection)
        const { default: ManagerMongo } = await import('../dao/manager/db')
        Contacts = ManagerMongo
        break;
    case "FILE":
        const { default: ManagerFile } = await import('../dao/manager/fileSystem')
        Contacts = ManagerFile
        break

    default:

}