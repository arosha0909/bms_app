import { environment } from "../environments/environment.example";

export class Util {
    public static apiPublicUrl(path: string): string {
      return environment.api_url + "/api/public/" + path;
    }
  
    public static apiAuthUrl(path: string): string {
      return environment.api_url + "/api/auth/" + path;
    }
  
  }