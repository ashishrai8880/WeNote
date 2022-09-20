const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Ashishisaverygoodboy" ;
const fetchuser = require('../middleware/fetchuser');

// Storing new User to database using POST request at endpoint '/api/auth/createuser' . Don't required authenticationi
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),

], async (req, res) => {

    let success = false ;

    //checking whether all input are according to requirement or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() });
    }

    try {

        //checking whether user already exist 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ success , message : "User with this email is already registered"});
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const seccurePassword  = await bcrypt.hash(req.body.password, salt);
        //creating new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: seccurePassword,
        })

        //Jwt token generating
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign( data , JWT_SECRET);
        
        success = true  ;
        res.json({ success , token : authToken} );

    } catch (error) {
        console.log(error);
        success = false ;
        res.status(500).send({success , message : "Some Error has been occured"});
    }




})



// Login user using POST request at endpoint '/api/auth/login' . Required authenticationi
router.post('/login', [
    
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

    //checking whether all input are according to requirement or not
    const errors = validationResult(req);
    let success = false ;
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() });
    }

    try {

        //checking whether user already exist 
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({success , message : "Please Login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(req.body.password , user.password);
        if(!passwordCompare){
            return res.status(400).send({success , message :  "Please Login with correct credentials"});
        }

        
        //Jwt token generating
        const data = {
            user : {
                id : user.id
            }
        }
        success = true ;
        const authToken = jwt.sign( data , JWT_SECRET);
        res.json({ success , 'token' : authToken});



    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server has been occured");
    }

    

})



// Getting user using POST request at endpoint '/api/auth/getuser' . Required authentication
router.post('/getuser', fetchuser ,  async (req, res) => {


    try {

        userId = req.user.id ;
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server has been occured");
    }

    

})

module.exports = router;