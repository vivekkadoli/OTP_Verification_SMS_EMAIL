import { Router } from 'express';
import { generateAndSendOTP, resetPassword } from '../controllers/authController';

const router = Router();

// router.post('/register', register);
// router.post('/login', login);
router.post('/otp/generate', generateAndSendOTP);
router.post('/otp/validate', resetPassword);

export default router;