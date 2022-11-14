import { Router } from 'express';

// Import all routes
import accountRoute from './account';

const router = Router();

router.use('/account', accountRoute.registerRoutes());

export default router;
