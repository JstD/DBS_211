const TeacherModel = require('../models/teacher');

class TeacherController {
    static async getAllStudentRegisteredCourse(id){
        try{
            return await TeacherModel.getAllStudentRegisteredCourse(id);
        }catch(e){
            throw e;
        }
    }
    static async getAllCourseAssigned(id){
        try{
            return await TeacherModel.getAllCourseAssigned(id);
        }catch(e){
            throw e;
        }
    }
}

module.exports = TeacherController;