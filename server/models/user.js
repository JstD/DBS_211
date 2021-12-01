const con = require('../config/db');
class UserModel {
    static async createUser(username, fullname, password){
        let sql = "INSERT INTO User (Ten_dang_nhap, Ten, Mat_khau) VALUES (?,?,?)";
        try{
            return new Promise(function(resolve, reject){
                con.query(sql,[username,fullname,password],function (err, result, fields) {
                    if (err) return reject(err);
                    return resolve(result);
                });
            })
        }
        catch(err){
            throw err;
        }
    }
    static async createStudent(id){
        let sql = "INSERT INTO Hoc_vien (Id) VALUES (?)";
        try{
            return new Promise(function(resolve, reject){
                con.query(sql,[id],function (err, result, fields) {
                    if (err) return reject(err);
                    return resolve(result);
                });
            })
        }
        catch(err){
            throw err;
        }
    }
    static async createTeacher(id){
        let sql = "INSERT INTO Giang_vien (Id) VALUES (?)";
        try{
            return new Promise(function(resolve, reject){
                con.query(sql,[id],function (err, result, fields) {
                    if (err) return reject(err);
                    return resolve(result);
                });
            })
        }
        catch(err){
            throw err;
        }
    }
    static async getTeacherByUsername(username){
        let sql = `SELECT * FROM User WHERE Ten_dang_nhap ='${username}' and Id IN (SELECT Id FROM Giang_vien)`;
        try{
            return new Promise(function(resolve, reject){
                con.query(sql,function (err, result, fields) {
                    if (err) return reject(err);
                    return resolve(result);
                });
            })
        }
        catch(err){
            throw err;
        }

    }
    static async getUserbyUsername(username){
        return new Promise(function(resolve, reject){
            con.query(`SELECT * FROM User WHERE Ten_dang_nhap ='${username}'`, function (err, result, fields) {
                if (err) return reject(err);
                console.log(result);
                return resolve(result);
            });
        });
    }
}

module.exports = UserModel;