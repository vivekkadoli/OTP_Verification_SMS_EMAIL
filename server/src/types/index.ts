export interface User {
    id: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
    phoneNumber: string;
}

export interface OTPRequest {
    email: string;
    phoneNumber: string;
    otp: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface OTPResponse {
    success: boolean;
    message: string;
}