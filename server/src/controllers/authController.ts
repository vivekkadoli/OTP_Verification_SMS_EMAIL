import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateOTP } from '../utils/otpUtils';
import { sendOTPEmail } from '../utils/emailService';
import { sendOTPSMS } from '../utils/smsService';

export const generateAndSendOTP = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }]
    });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    // Remove or comment out these lines:
    // console.log(`OTP for ${user.email}: ${otp}`);
    // console.log(`OTP for ${user.phoneNumber}: ${otp}`);

    // Actually send OTP
    if (user.phoneNumber) await sendOTPSMS(user.phoneNumber, otp);
    // if (user.email) await sendOTPEmail(user.email, otp);

    if (user.email) await sendOTPEmail(user.email, otp, `Your OTP code is: ${otp}`);

    res.json({ message: 'OTP sent to your registered email and mobile.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { identifier, otp, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }]
    });
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'OTP not requested or expired' });
    }
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};