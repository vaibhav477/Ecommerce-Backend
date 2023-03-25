import express from 'express';
import uModel from '../DataModel/Model1.js';
import data from '../Data.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utility.js';

const uRouter = express.Router();

uRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await uModel.remove({});
    const createUser = await uModel.insertMany(data.users);
    res.send({ createUser });
}));

uRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await uModel.findOne({email: req.body.email});
    if(user) {
        //here token is used for authetication and authorization,
        //if mail is already present, check if password input is correct
        //if it is correct send the details of the user in response
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                Admin: user.Admin,
                token: generateToken(user),
            });
            return;
        }
        else {
            res.status(401).send({message: 'Invalid email or password'})
        }
    }
    else {
        res.status(401).send({message: 'Invalid email or password'})
    }
}))

uRouter.post('/register', expressAsyncHandler(async (req,res) => {
    const newUser = new uModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await newUser.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        Admin: createdUser.Admin,
        token: generateToken(createdUser),
    })
}))

export default uRouter;