export interface User {
    id: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ForgotPasswordRequest {
    email: string;
    phoneNumber: string;
}

export interface OtpRequest {
    email: string;
    phoneNumber: string;
    otp: string;
}