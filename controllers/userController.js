import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import validator from 'validator';
import { response } from "express";


// to login

const loginUser=async (req,res)=>{
    const {email,password}= req.body;
    try {        
        const user = await userModel.findOne({email})
        if(!user){
            res.json({success:false,message:"user not found"})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"wrong pass"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
        
      
    } catch (error) {
    console.log(error);
    res.json({success:false,message:"error in login"}) 
    }


}

const createToken=(id)=>{
    return jwt.sign({id},process.env.jwt_SECRET)
}
// to register
const registerUser=async (req,res)=>{
    const {name,password,email}= req.body;
    try{
        // to check is user already exist
        const exist= await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:"User already exist"})
        }

        // validating email and strong pass
        if(!validator.isEmail(email)){
            res.json({success:false,message:"plzz enter valid email"})
        }
        if(password.length<4){
            res.json({success:false,message:"enter strong password"})
        }
        // hashing the pass
        const salt = await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPass
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(err){
        console.log(error);
        res.json({success:false,message:"Error on register"})
        }

}

export {loginUser,registerUser}