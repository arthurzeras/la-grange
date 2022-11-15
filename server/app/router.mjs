import { Router } from 'express';
import * as Handlers from './handlers.mjs';

const router = Router();

router.get('/cluster/', Handlers.listClusters);
router.get('/:cluster/deployment', Handlers.listDeployments);
router.get('/:cluster/:namespace/pod', Handlers.listPods);
router.get('/:cluster/:namespace/:pod/logs', Handlers.getLogs);

export default router;
