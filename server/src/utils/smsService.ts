import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE!;

const client = twilio(accountSid, authToken);

export async function sendOTPSMS(to: string, otp: string) {
  await client.messages.create({
    body: `Your OTP code is: ${otp}`,
    from: twilioPhone,
    to,
  });
}