const UserModel = require('../models/user');

class UserController {
    static async createStudent(username, fullname,password ){
        try{
            const result = await UserModel.createUser(username, fullname, password);
            await UserModel.createStudent(result.insertId);
            return result;
        }catch(e){
            throw e;
        }
    }
    static async getAllUser(){
        try{
            return await UserModel.getAllUser();
        }catch(e){
            console.log(err)
            throw e;
        }
    }
    static async getTeacherByUsername(username){
        try{
            return await UserModel.getTeacherByUsername(username);
        }catch(e){
            console.log(e)
            throw e;
        }
    }
    static async getUserbyUsername(username){
        try{
            return await UserModel.getUserbyUsername(username);
        }catch(e){
            console.log(e)
            throw e;
        }
    }
}
module.exports = UserController;