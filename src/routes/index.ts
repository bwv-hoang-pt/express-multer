import { Router } from 'express';

import fileRouter from './file.routes';

export default function () {
  const router = Router();

  router.use('/file', fileRouter);

  return router;
}
