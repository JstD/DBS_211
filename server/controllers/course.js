const CourseModel = require('../models/course');

class CourseController {
    static async getAllCoursesRegistered(id){
        try{
            return await CourseModel.getAllCoursesRegistered(id);
        }catch(e){
            throw e;
        }
    }
    static async registerCourse(IdHv, IdKh, Thoi_diem, Diem_dau_vao){
        try{
            return await CourseModel.registerCourse(IdHv, IdKh, Thoi_diem, Diem_dau_vao);
        }catch(e){
            throw e;
        }
    }
    static async getAllCourses(){
        try{
            return await CourseModel.getAllCourses();
        }catch(e){
            throw e;
        }
    }
    static async cancelRegister(idhv, idkh){
        try{
            console.log(idkh);
            return await CourseModel.cancelRegister(idhv,idkh);
        }catch(e){
            throw e;
        }
    }
}

module.exports = CourseController;