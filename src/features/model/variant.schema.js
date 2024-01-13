import mongoose from "mongoose";

//variant Schema
export const  variantSchema=new mongoose.Schema({
    name:String,
    sku:String,
    additionalPrice:Number,
    stockCount:Number,
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'}
})