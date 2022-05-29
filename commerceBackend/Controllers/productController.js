import productModel from "../Model/productSchema.js";
import bannerModel from "../Model/bannerSchema.js";
import mongoose from "mongoose";

export const createProducts = async (req, res) => {
    const body = req.body;
    try{
        const newProduct = productModel({...body});
            await newProduct.save();
           return res.status(200).json({newProduct});
    }catch(err){
        return  res.status(404).json({message: err.message});
    }
}
export const getProducts = async (req, res) => {
    try{
    const products = await productModel.find().sort({_id: -1}).lean();
    const banner = await bannerModel.find();
    const returningArray = products.concat(banner);
   return  res.status(200).json([products, banner]);
    }catch(err){    
       return  res.status(404).json({message: err.message});
    }
}
export const updateProducts = async(req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Product with that id");

    try{
        const edited = await productModel.findByIdAndUpdate( _id, {...post, _id}, {new: true})
        res.status(200).json(edited);

    }catch(err){
        return  res.status(404).json({message: err.message}); 
    }
}
export const deleteProducts = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Product with that id");

    try{
        const deletedPost = await productModel.findByIdAndDelete({_id});

      return  res.status(200).send("post deleted");
    }catch(err){
        return  res.status(404).json({message: err.message}); 
    }
}
export const handleBanner = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Product with that id");

    try{
        const edited = await bannerModel.findByIdAndUpdate( _id, {...post, _id}, {new: true})
        res.status(200).json(edited);

    }catch(err){
        return  res.status(404).json({message: err.message}); 
    }
}