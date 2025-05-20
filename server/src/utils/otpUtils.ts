export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function isOTPValid(savedOtp: string, providedOtp: string, expiry: Date): boolean {
    return savedOtp === providedOtp && expiry > new Date();
}