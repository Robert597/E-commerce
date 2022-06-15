import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema({
    Large: {
        type: String,
        default: "SUMMER"
    },
    small: {
        type: String,
        default: "SALE"
    },
    name: String,
    details: String,
    price: Number,
    image: [String],
    footerLarge: String,
    footerlarge: String,
    discount: Number,
    saleTime: String,
})

const bannerModel = mongoose.model('Banner', bannerSchema);
export default bannerModel;