import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import multer from 'multer';
import path from 'path';

// dirname
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// Hasheo de contraseña

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(50))

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
};

// Subir documentos con Multer

 const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, 'public/documents'))
    },
    filename: function(req, file, cb){
        
        cb(null, `${req.body.email}-${file.originalname}`)
    }
 });

 export const uploader = multer({storage});
