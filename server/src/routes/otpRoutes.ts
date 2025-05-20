import { Router } from 'express';
import { generateAndSendOTP, verifyOTP } from '../controllers/otpController';

const router = Router();

// Route to generate OTP
router.post('/generate', generateAndSendOTP);

// Route to validate OTP
router.post('/validate', verifyOTP);

export default router;