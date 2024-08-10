import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command()

program
    .option('--mode <mode>', "Ingrese el modo trabajo", 'development')
program.parse()

const enviroment = program.opts().mode

const envFilePath = enviroment === "development" ? './.env.dev' : './.env.production'

dotenv.config({ path: envFilePath });

export const portConection = process.env.PORT

export const mongoConection = process.env.MONGO_URL;

export const emailConection = process.env.EMAIL;

export const passwordConection = process.env.PASSWORD;

export const secretConection = process.env.SECRET;


export default {
    persistence: process.env.PERSISTENCE
}

