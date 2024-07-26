export class GetUserDto {
    constructor(user){
        this.fullName = user.first_name + ' ' + user.last_name;
        this.email = user.email;
        this.role = user.role
    }
};