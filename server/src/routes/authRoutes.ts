import { Router } from 'express';
import { registerUser, loginUser, forgotPassword } from '../controllers/authController';

const router = Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for forgot password
router.post('/forgot-password', forgotPassword);

export default router;