import { authModel } from "../Model/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const handleSignUp = async (req, res) => {
    try{
    const {firstName, lastName, email, password} = req.body
    if(!req.body) return res.status(400).json({message: "Missing Credentials"});
//checking if user already exists in our database
let userExist = await authModel.findOne({email});

if (userExist) return res.status(400).json({message: "user already exists"});
//hashing password for security reasons
const hashPwd = await bcrypt.hash(password, 12);
//if user does not exist, creating user in our database
const result = await authModel.create({
    name: `${firstName} ${lastName}`,
    roles: {
        user: 2001
    },
    email,
    password: hashPwd
})
 //get roles of user
 const roles = Object.values(result.roles);
//create our user token
const token = jwt.sign({email: result.email, id: result._id, roles}, process.env.SIGNUP, {expiresIn: "24h"});
//send out response
res.status(201).json({result, token});
    }
    catch(err){
        res.status(500).json({message: "Something went wrong, try again later"});
    }
}

export const handleSignIn = async (req, res) => {
    try{
        //checking if they are request data being sent
        if(!req.body) return res.status(400).json({message : "Missing Credentials"});

        const {email, password} = req.body;
        //checking if user exists in database
        let userExist = await authModel.findOne({email});

        if (!userExist) return res.status(400).json({message: "user doesn't exist, signup"});
        
        //check if user password is correct
        const isPasswordCorrect = await bcrypt.compare(password, userExist.password) ;

        if(!isPasswordCorrect) return res.status(401).json({message: "incorrect Password"});

        //get roles of user
        const roles = Object.values(userExist.roles);

        const token = jwt.sign({ email: userExist.email, id: userExist._id,
        roles}, process.env.LOGIN, { expiresIn: '24h'})
        res.status(201).json({result: userExist, token}); 
    }catch(err){
        res.status(500).json({message: "Something went wrong, try again later"});
    }
}