import axios from "axios";
import { AppResponse } from "../models/response";
import { User } from "../models/user";
import { Util } from "../utils/urlUtil";
import { OtpType } from "../enum/OTPType";

export interface UserLogin {
    emailOrUserName: string;
    password: string;
    rememnberMe: boolean;
}

export interface EmailOTPVerification {
    email: string;
    otpCode: string;
    otpType?: OtpType;
}

export interface ResetVerification {
    email: string;
    otpCode: string;
    password: string;
}

export interface ForgetPasswordEmail {
    email: string;
}
  

export class AuthService {
    private static readonly TOKEN_KEY = "token";

    public static async userLogin(data: UserLogin): Promise<AppResponse<any>> {
        const ep = Util.apiPublicUrl("login");
        const res = await axios.post<UserLogin, AppResponse<any>>(ep, data);
        if (res.success) localStorage.setItem(AuthService.TOKEN_KEY, res.data);
        if (data.rememnberMe) {
          localStorage.setItem("remember", "Yes");
        } else {
          {
          localStorage.setItem("remember", "");
          }
        }
        return res.data;
    }

    public static async getMe(): Promise<AppResponse<User>> {
        const ep = Util.apiAuthUrl("me");
        const res = await axios.get<void, AppResponse<User>>(ep, { withCredentials: true });
        if (res.error) {
            AuthService.removeToken();
        }
        return res;
    }

    public static async registerBusOwner(data: User): Promise<AppResponse<User>> {
        const ep = Util.apiPublicUrl("register");
        const res = await axios.post<User, AppResponse<any>>(ep, data);
        return res;
    }

    public static async resendOtp(email: Partial<EmailOTPVerification>): Promise<AppResponse<null>> {
        const ep = Util.apiPublicUrl("resend/otp");
        const res = await axios.post<string, AppResponse<null>>(ep, email);
        return res;
    }

    public static async emailOTPVerification(emailOTPVerificationData: EmailOTPVerification): Promise<AppResponse<string>> {
        const ep = Util.apiPublicUrl("verify");
        const res = await axios.post<EmailOTPVerification, AppResponse<string>>(ep, emailOTPVerificationData);
        return res;
    }

    public static async resetVerification(resetVerification: ResetVerification): Promise<AppResponse<string>> {
        const ep = Util.apiPublicUrl("password/reset");
        const res = await axios.post<EmailOTPVerification, AppResponse<string>>(ep, resetVerification);
        return res;
    }

    public static async forgetPasswordEmail(forgetPasswordEmail: ForgetPasswordEmail): Promise<AppResponse<string>> {
        const ep = Util.apiPublicUrl("password/recover");
        const res = await axios.post<ForgetPasswordEmail, AppResponse<string>>(ep, forgetPasswordEmail);
        return res;
    }

    public static async forgetPasswordOTPVerification(emailOTPVerification: EmailOTPVerification): Promise<AppResponse<string>> {
        const ep = Util.apiPublicUrl("verify-otp");
        const res = await axios.post<EmailOTPVerification, AppResponse<string>>(ep, emailOTPVerification);
        return res;
    }

    public static async changePassword(data: any): Promise<AppResponse<string>> {
        const ep = Util.apiAuthUrl("user/password");
        const res = await axios.post<void, AppResponse<string>>(ep, data);
        return res;
    }

    public static userLogout(): void {
        AuthService.removeToken();
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
