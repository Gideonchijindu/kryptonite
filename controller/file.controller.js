import FileService from '../services/file.services.js';
import { BadRequestError, InvalidError, NotFoundError, InternalError, DuplicateError } from '../lib/appError.js';

class FileController {
    async uploadFile(req, res, next) {
        const { apiKey } = req.headers;
        const file = req.file;

        if (!apiKey) {
            return next(new BadRequestError('API key is required'));
        }

        if (!file) {
            return next(new BadRequestError('No file uploaded'));
        }

        try {
            const uploadedFile = await FileService.uploadFile(apiKey, file);
            res.status(201).json({
                success: true,
                message: 'File uploaded successfully',
                data: uploadedFile,
            });
        } catch (error) {
            console.error('File upload failed:', error);
            if (error instanceof NotFoundError || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof DuplicateError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                next(new InternalError('Server error...'),error);
            }
            
        }
    }

    async getFile(req, res, next) {
        const { userId, fileId } = req.params;

        try {
            const file = await FileService.getFile(userId, fileId);
            res.status(200).json({
                success: true,
                data: file,
            });
        } catch (error) {
            console.error('Get file failed:', error);
            if (error instanceof NotFoundError || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof DuplicateError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                next(new InternalError('server error...'),error);
            }
        }
    }

    async getAllFiles(req, res, next) {
        const { userId } = req.params;

        try {
            const files = await FileService.getAllFiles(userId);
            res.status(200).json({
                success: true,
                data: files,
            });
        } catch (error) {
            console.error('Get all files failed:', error);
            if (error instanceof NotFoundError || error instanceof InvalidError) {
                res.status(400).json({ success: false, message: error.message });
            } else if (error instanceof DuplicateError) {
                res.status(409).json({ success: false, message: error.message });
            } else {
                next(new InternalError('Server error...'),error);
            }
        }
    }

  
}

export default new FileController();
