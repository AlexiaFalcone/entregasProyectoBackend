import { GetUserDto } from "../dao/dto/user.dto.js";

export class UserRepository{
    
    async getUserRepository(user){       
        const userDto = new GetUserDto(user)
        return userDto
    };
};