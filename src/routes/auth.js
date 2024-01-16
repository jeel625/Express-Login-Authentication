const { Router } = require('express');
const User = require('../database/schemas/User')
const router = Router();
const { hashPassword, comparePassword } = require('../utils/helper');

router.post('/login',async (request,response) => {
    const { email,password } = request.body;
    
    if(!email || !password){
        return response.send(400);
    }

    const userDB = await User.findOne({ email });
    if(!userDB) return response.send(401);
    const isValid = comparePassword(password, userDB.password);
    if(isValid) {
        request.session.user = userDB;
        return response.status(200).send(`Welcome To The Web-Page : ${email}`);
    }else 
        return response.send(401);
});

router.post('/register',async (request,response) => {
    const { email } = request.body;
    const userDB = await User.findOne({ email });

    if(userDB){
        response.status(400).send({msg:'User is already exist!!'});
    }else{
        const password = hashPassword(request.body.password);
        const newUser = await User.create({ email, password});
        console.log(password);
        newUser.save();
        response.status(201).send({msg: 'User has been created!!'});
    }
})

// router.post('/newUser',(request,response) => {

// })

module.exports = router;