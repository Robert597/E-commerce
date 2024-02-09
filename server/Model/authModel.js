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
    },
    image: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSissgD_ffoqokwXW3qC_-9In_v2iuRr44lqd0gxumxoR5IW1LxXIndugp5WDofIgOEuoI&usqp=CAU"
    },
    customer: {
        id: String,
        name: String

    }
})
export const authModel = mongoose.model('User', authSchema);