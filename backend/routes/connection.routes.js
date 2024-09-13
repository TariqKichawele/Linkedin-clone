import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
    getUserConnections, 
    sendConnectionRequest, 
    acceptConnectionRequest, 
    rejectConnectionRequest, 
    getConnectionRequests, 
    removeConnection,
    getConnectionStatus,
} from '../controllers/connection.controllers.js'

const router = express.Router();

router.get('/requests', protectRoute, getConnectionRequests);
router.get('/', protectRoute, getUserConnections);
router.get("/status/:userId", protectRoute, getConnectionStatus);

router.post('/request/:userId', protectRoute, sendConnectionRequest);
router.put('/accept/:requestId', protectRoute, acceptConnectionRequest);
router.put('/reject/:requestId', protectRoute, rejectConnectionRequest);

router.delete('/:userId', protectRoute, removeConnection);


export default router;