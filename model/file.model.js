import mongoose from 'mongoose';

const { Schema } = mongoose;


export const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    base64: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    }
}, { _id: false });

const File = mongoose.model('File', fileSchema);

export default File;
