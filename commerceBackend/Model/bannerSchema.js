import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema({
    Large: {
        type: String,
        default: "SUMMER"
    },
    small: {
        type: String,
        default: "SALE"
    }
})

const bannerModel = mongoose.model('Banner', bannerSchema);
export default bannerModel;