import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'


const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

// Generar productos con Faker  
faker.locate = 'es';

export const generateProduct = () => {

    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({min: 10, max:20}),
        category: faker.commerce.department(),
    }
}