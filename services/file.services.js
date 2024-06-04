import fs from 'fs/promises';
import path from 'path';
import User from '../models/userModel.js';
import { InvalidError, InternalError } from '../lib/appError.js';

class FileService {
    async uploadFile(apiKey, file) {
        if (!file.mimetype.startsWith('image/')) {
            throw new InvalidError('Only image files are allowed');
        }

        const user = await AuthService.findUserByApiKey(apiKey);
        if (!user) {
            throw new InvalidError('Invalid API key');
        }

        const fileData = await fs.readFile(file.path);
        const fileBase64 = fileData.toString('base64');

        // Save file in the database
        const newFile = {
            userId: user._id,
            filename: file.originalname,
            content: fileBase64,
            mimetype: file.mimetype,
            size: file.size,
        };

        user.files.push(newFile);
        await user.save();

        // Delete the file from the file system
        await fs.unlink(file.path);

        return newFile;
    }

    async getFile(userId, fileId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const file = user.files.id(fileId);
        if (!file) {
            throw new NotFoundError('File not found');
        }

        return file;
    }

    async getAllFiles(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user.files;
    }
}

export default new FileService();

