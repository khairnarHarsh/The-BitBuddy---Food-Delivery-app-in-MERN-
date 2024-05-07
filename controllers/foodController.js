import foodModel from "../models/foodModel.js";

import fs from 'fs'

// add food item

const addFood=async(req,res)=>{
    let image_filename= `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.status(201).json({success:true,message:"Item added Successfully!"});
    }catch(err){
        res.status(409).json({sucess:false,message:'This Item already exists!'})
    }

}
// all food list
const listFood=async(req,res)=>{
    try{
        const foods= await foodModel.find({});
        res.json({success:true,data:foods})

    }catch(err){
        console.log("data erroe");
        res.json({success:false,message:"Data not found"})
    }

}
// removeFood item
const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food Removed"})
    }
    catch(err){
        console.log(err);
        res.json(
            {success:false,message:"err"}
        )

    }

}
export {addFood,listFood,removeFood}