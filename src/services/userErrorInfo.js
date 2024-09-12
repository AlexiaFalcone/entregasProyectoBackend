export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplited or not valid.
    List of requier properties:
    * first_name: need to be a String, received ${user.first_name}
    * last_name: need to be a String, received ${user.last_name} 
    * email: need to be a String, received ${user.email}`
}