import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER; 

const client = twilio(accountSid, authToken);

export const sendSms = async (to: string, message: string): Promise<void> => {
    try {
        await client.messages.create({
            body: message,
            from: fromPhoneNumber,
            to: to,
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('SMS sending failed');
    }
};