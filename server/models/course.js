const con = require('../config/db');
class CourseModel {
    static async getAllCoursesRegistered(id){
        const sql = `SELECT IdKh, Ten, Ngay_bat_dau, Gia FROM Dang_ky JOIN Khoa_hoc ON IdKh = Id WHERE IdHv = ${id}`;
        try{
            return new Promise(function(resolve, reject){
                con.query(sql,function (err, result, fields) {
                    if (err) return reject(err);
                    return  resolve(result);
                });
            })
        }
        catch(err){
            throw err;
        }
    }
    static async registerCourse(IdHv, IdKh, Thoi_diem, Diem_dau_vao){
        let sql = "INSERT INTO Dang_ky (IdHv, IdKh, Thoi_diem, Diem_dau_vao) VALUES (?,?,?,?)";
        try{
            return new Promise(function(resolve, reject){
                con.query(sql,[IdHv, IdKh, Thoi_diem, Diem_dau_vao],function (err, result, fields) {
                    if (err) return reject(err);
                    return resolve(result);
                });
            })
        }
        catch(err){
            throw err;
        }
    }
    static async getAllCourses(){
        let sql = `SELECT Id, Ten, Ngay_bat_dau, Gia, Count(*) AS So_luong FROM Khoa_hoc, Dang_ky WHERE Id = IdKh
                GROUP BY Id
                ORDER BY Ngay_bat_dau DESC`;
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
    static async cancelRegister(IdHv, IdKh){
        let sql = `DELETE FROM Dang_ky WHERE IdHv =${IdHv} AND IdKh = ${IdKh}`;
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
    
}
module.exports = CourseModel;