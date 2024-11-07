import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { upload } from '../config/multer.config';

const router = Router();
const fileController = new FileController();

router.post('/upload', 
  upload.single('file'), 
  fileController.upload
);

export default router;