import axios from "axios";
import { AppResponse } from "../models/response";
import { User } from "../models/user";
import { Util } from "../utils/urlUtil";
import { OtpType } from "../enum/OTPType";
import { UserStatus } from "../enum/userStatus";

export interface UserLogin {
    emailOrUserName: string;
    password: string;
    rememberMe: boolean;
}

export interface EmailOTPVerification {
    email: string;
    otpCode: string;
    otpType?: OtpType;
}

export interface AccountStatus {
    email: string;
    status: UserStatus;
}

export interface PasswordsResetDetails {
    email: string;
    oldPassword: string;
    newPassword: string;
}
  

export class AuthService {
    private static readonly TOKEN_KEY = "ct-token";

    public static async userLogin(data: UserLogin): Promise<AppResponse<any>> {
        const ep = Util.apiPublicUrl("login");
        const res = await axios.post<AppResponse<any>>(ep, data);

        if (res.data.success) AuthService.setToken(res.data.data);

        if (data.rememberMe) {
          localStorage.setItem("remember", "Yes");
        } else {
            localStorage.setItem("remember", "");
        }
        return res.data;
    }

    public static async getMe(): Promise<AppResponse<User>> {
        try {
            const ep = Util.apiAuthUrl("profile");
            const res = await axios.get<AppResponse<User>>(ep, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(AuthService.TOKEN_KEY)}`,
                },
                withCredentials: true, // if you're using cookies for auth
            });
    
            if (res.data.error) {
                AuthService.removeToken();
            }
            return res.data;  // Return res.data, not the entire response
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw error;
        }
    }
    

    public static async registerBusOwner(data: User): Promise<AppResponse<User>> {
        const ep = Util.apiPublicUrl("register");
        const res = await axios.post<User, AppResponse<any>>(ep, data);
        return res;
    }

    public static async resendOtp(email: Partial<EmailOTPVerification>): Promise<AppResponse<null>> {
        const ep = Util.apiPublicUrl("resend/otp");
        const res = await axios.post<string, AppResponse<any>>(ep, email);
        return res.data;
    }

    public static async OTPVerification(emailOTPVerificationData: EmailOTPVerification): Promise<AppResponse<any>> {
        const ep = Util.apiPublicUrl("verify-otp");
        const res = await axios.post<EmailOTPVerification, AppResponse<any>>(ep, emailOTPVerificationData);
        return res.data;
    }

    public static async ResetPassword(passwords: PasswordsResetDetails): Promise<AppResponse<any>> {
        const ep = Util.apiPublicUrl("password/reset");
        const res = await axios.post<PasswordsResetDetails, AppResponse<any>>(ep, passwords);
        return res.data;
    }

    public static async VerifyAccount(data: AccountStatus): Promise<AppResponse<string>> {
        const ep = Util.apiPublicUrl("verify-account");
        const res = await axios.post<AccountStatus, AppResponse<any>>(ep, data);
        return res.data;
    }

    public static userLogout(): void {
        AuthService.removeToken();
    }

    public static setToken(token: string): void {
        localStorage.setItem(AuthService.TOKEN_KEY, token);
    }  

    public static getToken(): string | null {
        return AuthService.getCookie(AuthService.TOKEN_KEY);
    }

    private static removeToken(): void {
      const days = 21;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${AuthService.TOKEN_KEY}=your_token_value; expires=${date.toUTCString()}; path=/; Secure; HttpOnly;`;      
    }

    private static getCookie(name: string): string | null {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }
}
