import { Request, Response } from 'express';
import User  from '../models/User';
import { sendOTPEmail } from '../utils/emailService';
import { sendOTPSMS } from '../utils/smsService';
import { generateOTP } from '../utils/otpUtils';

export const generateAndSendOTP = async (req: Request, res: Response) => {
    const { email, phoneNumber } = req.body;

    try {
        const otp = generateOTP();
        // Save OTP to the user record or a temporary store
        await User.updateOne({ email }, { otp });

        // Send OTP via email
        await sendOTPEmail(email, 'Your OTP', `Your OTP is ${otp}`);
        // Send OTP via SMS
        await sendOTPSMS(phoneNumber, otp);

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending OTP', error });
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !user.otp || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP is valid, proceed with the next steps (e.g., allow password reset)
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error verifying OTP', error });
    }
};