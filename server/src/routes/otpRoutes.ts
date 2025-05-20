import { Router } from 'express';
import { generateOtp, validateOtp } from '../controllers/otpController';

const router = Router();

// Route to generate OTP
router.post('/generate', generateOtp);

// Route to validate OTP
router.post('/validate', validateOtp);

export default router;