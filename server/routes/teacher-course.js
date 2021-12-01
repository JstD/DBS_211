const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config()
const TeacherController = require('../controllers/teacher');


router.get('/',auth, async (req, res) => {
    try{
        console.log(req.user)
        if(req.user.role != 'teacher')
            return res.status(400).send({err:"You aren't a teacher"});
        const id = parseInt(req.user.id);
        const data = await TeacherController.getAllCourseAssigned(id);
        return res.status(200).send({data:data});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
});

router.get('/:id',auth, async (req, res) => {
    try{
        if(req.user.role != 'teacher')
            return res.status(400).send({err:"You aren't a teacher"});
        const {id} = req.params;
        const data = await TeacherController.getAllStudentRegisteredCourse(parseInt(id));
        return res.status(200).send({data:data});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
});
module.exports = router;