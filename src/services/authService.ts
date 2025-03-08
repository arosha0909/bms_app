import axios from "axios";
import { AppResponse } from "../models/response";
import { User } from "../models/user";
import { Util } from "../utils/urlUtil";

export class AuthService {
    private static readonly TOKEN_KEY = "token";

    public static async getMe(): Promise<AppResponse<User>> {
      const ep = Util.apiAuthUrl("me");
      const res = await axios.get<void, AppResponse<User>>(ep);
      if (res.error) {
       // localStorage.removeItem(AuthService.TOKEN_KEY);
      }
      return res;
    }


    public static userLogout(): void {
        localStorage.removeItem(AuthService.TOKEN_KEY); //TODO read token from cookie and remove this implementation
      }
    
      public static getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY); //TODO read token from cookie and remove this implementation
      }
    
      public static setToken(token: string): void {
        localStorage.setItem(AuthService.TOKEN_KEY, token); //TODO read token from cookie and remove this implementation
      }
}