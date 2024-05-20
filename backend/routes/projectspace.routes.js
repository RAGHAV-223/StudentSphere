import protectRoute from '../middleware/protectRoute.js';
import express from 'express'
import {createProjectSpace, getProjectSpaces, getProjectSpace} from '../controllers/projectSpaceController.js'
import router from './auth.routes.js';

router.post('/new-project',protectRoute, createProjectSpace);
router.get('/',protectRoute, getProjectSpaces);
router.get('/:id',protectRoute, getProjectSpace);

// Define other routes for fetching, updating, deleting project spaces, etc.

export default router;