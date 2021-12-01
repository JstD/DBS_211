const con = require('../config/db');
class TeacherModel {
    static async getAllCourseAssigned(id){
        let sql = `SELECT IdKh, IdCn, So_phong, Ten_toa, Ten, Ngay_bat_dau FROM Duoc_phan_cong 
                    JOIN Giang_vien ON IdGv = Giang_vien.Id 
                    JOIN Khoa_hoc ON Khoa_hoc.Id = IdKh
                    WHERE Giang_vien.Id = ${id}`;
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
    static async getAllStudentRegisteredCourse(id){
        let sql = `SELECT Id, Thoi_diem, Ten FROM Dang_ky 
                    JOIN User ON IdHv = Id WHERE IdKh = ${id}`;
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
}

module.exports = TeacherModel;