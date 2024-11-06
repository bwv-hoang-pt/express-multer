import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { upload } from '../config/multer.config';

const router = Router();
const fileController = new FileController();

router.post('/upload/single', 
  upload.single('file'), 
  fileController.uploadSingle
);

export default router;