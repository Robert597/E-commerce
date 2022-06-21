import mongoose from 'mongoose';
const { Schema } = mongoose;

const authSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
       user: {
        type: Number,
        default: 2001,
        required: true
       },
       Admin: {
        type: Number
       }
    },
    frontEndRoles: {
        type: [String],
        required: true,
        default: ["user"]
    },
    password: {
        type: String,
        required: true
    }
})
export const authModel = mongoose.model('User', authSchema);