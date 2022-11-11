import { Router } from 'express';
import * as Handlers from './handlers.mjs';

const router = Router();

router.get('/cluster/', Handlers.listClusters);

export default router;
