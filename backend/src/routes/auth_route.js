import express from 'express';
import { checkAuth, logout, signin, signup, updateProfile,  } from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/logout',logout);

router.put('/update-profile',protectRoute,updateProfile)

router.get('/check',protectRoute,checkAuth);


export default router;

