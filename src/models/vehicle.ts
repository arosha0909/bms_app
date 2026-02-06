import { CategoryByPurpose } from "../enum/categoryByPerpose";
import { VehicleStatus } from "../enum/vehicleStatus";

  export interface Vehicle {
    _id?: string;
    owner: string;
    plateNumber: string;
    model: string;
    capacity: number;
    status: VehicleStatus;
    createdAt: Date;
    category: CategoryByPurpose;
    createdBy: string;
    upload?: string;
  }