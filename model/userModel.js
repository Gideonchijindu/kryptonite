import mongoose from 'mongoose';
import { fileSchema } from './file.model.js';
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, ],
        trim:true,
    },
    email:{
        type: String,
        required: [true,],
        unique:true,
        trim: true,
        match:[
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email",
        ]
    },
    password:{
        type: String,
        required:[true],
        minLength: [6, ],
        select: false,
    },
    role: {
        type: String,
        required: true,
        default: "visitor",
        enum: ["visitor","supergirl"]
    },
    apiKey: {
        type: String,
        unique: true,
    },
   
     file:[fileSchema],
    
    isVerified: { type: Boolean, default: false },
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
