import express from 'express';
import FileController from '../controllers/file.controller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-file',  FileController.uploadFile);
router.get('/files/:userId/:fileId', FileController.getFile);
router.get('/files/:userId', FileController.getAllFiles);

export default router;
