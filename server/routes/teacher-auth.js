const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config()

const UserController = require('../controllers/user');


router.get('/',auth, async (req, res) => {
    try{
        res.send({...req.user});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
});

router.post('/', async (req, res) => {
    try{
        const {username, password} = req.body;
        const result = await UserController.getTeacherByUsername(username);
        console.log(result);
        const { Ten_dang_nhap, Id, Mat_khau, Ten} = result[0];

        if(Mat_khau!=password)
            return res.status(401).send({err: 'Password is incorrect'});
        if(result){
            jwt.sign({ username: Ten_dang_nhap, id : Id, role: 'teacher',fullname: Ten}, process.env.JWT_SECRET, function(err, token) {
                res.send({
                    role: 'teacher',
                    token,
                    fullname: Ten,
                    username,
                });
            });
        }
        else return res.status(401).send({err:'Internal Server Error'});
    }catch (err) {
        console.log(err)
        return res.status(400).send({err: 'Bad request'});
    }
})
module.exports = router