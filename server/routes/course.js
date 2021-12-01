const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config()

const UserController = require('../controllers/user');
const CourseController = require('../controllers/course');
const CourseModel = require('../models/course');
router.get('/', async (req, res) => {
    try{
        const result = await CourseController.getAllCourses();
        return res.send({data: result});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
});
router.put('/:id',auth, async (req, res) => {
    try{
        const {id} = req.params;
        const user = req.user;
        const recentTime =  new Date().toISOString().slice(0, 19).replace('T', ' ')
        await CourseController.registerCourse(user.id, parseInt(id),recentTime,0);
        return res.send({msg:'Canceled Successfully!!'});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
})
router.get('/registered', auth, async (req, res) => {
    try{
        const user = req.user;
        console.log(user)
        const result = await CourseController.getAllCoursesRegistered(parseInt(user.id));
        return res.send({data: result});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
})
router.delete('/:id',auth, async(req, res) => {
    try{
        const user = req.user;
        const {id} = req.params;
        console.log('-----------------------',id,'--------------------')
        const result = await CourseController.cancelRegister(user.id, parseInt(id));
        return res.send({data: result});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
});

module.exports = router;