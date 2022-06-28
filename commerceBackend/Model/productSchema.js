import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel; 