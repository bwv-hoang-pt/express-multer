declare global {
  namespace Express {
    export interface Request {
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}