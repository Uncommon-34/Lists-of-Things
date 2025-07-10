import { WorkOrderStatus } from "./database";

// types for incoming trafic
export interface login {
  email: string;
  password: string;
}

export interface report_address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface Report_incoming {
  description: string;
  address: report_address;
  isAnonymous: boolean;
  isPrivateProperty: boolean;
  email?: string;
  images: string[];
}

export interface Outgoing_Report {
  id: number;
  description: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  email?: string;
  image_urls: string[];
  is_private: boolean;
  isAnonymous: boolean;
  created_at: string;
  status: WorkOrderStatus;
  handled_by?: number | null;
}
