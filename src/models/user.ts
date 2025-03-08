import { Permission } from "../enum/permission";
import { UserStatus } from "../enum/userStatus";
import { Role } from "../enum/userTypes";

export interface LoginRes {
    token: string
    role: string
  }
  
  export interface User {
    _id: string;
    email: string;
    password: string;
    role?: Role;
    status: UserStatus;
    permissions?: Permission[];
    name?: string;
    lastLogin?: Date;
  }