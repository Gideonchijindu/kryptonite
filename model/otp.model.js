import mongoose from 'mongoose';

const { Schema } = mongoose;

const OtpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
},{timestamps: true});

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
