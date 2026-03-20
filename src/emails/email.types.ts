

export type EmailTemplate = 
| "verify-otp"
| "welcome"
| "reset-password";


export interface VerifyOtpPayload {
    otp: string;
    username: string;
    expiresInMinutes: number;
}


export interface WelcomePayload {
    username: string;
    loginUrl: string;
}

export interface ResetPasswordPayload {
    resetLink: string;
    username: string;
}


export interface TemplatePayloadMap {
    "verify-otp": VerifyOtpPayload;
    "welcome": WelcomePayload;
    "reset-password": ResetPasswordPayload;
};


export interface SendEmailOptions<T extends EmailTemplate>{
    to: string | string[];
    subject: string;
    template: T;
    data: TemplatePayloadMap[T];
}