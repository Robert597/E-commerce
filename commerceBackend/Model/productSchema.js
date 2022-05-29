import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: [String],
    details: String
});

const productModel = mongoose.model('Product', productSchema);

export default productModel; 