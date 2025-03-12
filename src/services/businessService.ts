import axios from "axios";
import { AppResponse } from "../models/response";
import { Util } from "../utils/urlUtil";
import { Industry } from "../models/industry";

export class IndustryService {
    public static async getAllIndustries(): Promise<AppResponse<Industry[]>> {
        const ep = Util.apiPublicUrl(`all-industries`);
        const res = await axios.get<AppResponse<Industry[]>>(ep);
        return res.data;
    }
}