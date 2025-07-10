// all database types
export type UserType = "admin" | "worker";

export interface User {
  id: number;
  name: string;
  email: string;
  pw_hash: string;
  type: UserType;
  created_at: string;
}

export interface Report {
  id: number;
  description: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  email?: string;
  image_urls: string[];
  is_private: boolean;
  is_anonymous: boolean;
  created_at: string;
}

export type WorkOrderStatus =
  | "pending"
  | "in_progress"
  | "complete"
  | "cancelled";

export interface WorkOrder {
  id: number;
  report_id: number;
  handled_by?: number | null;
  status: WorkOrderStatus;
  created_at: string;
}

export type Support = {
  id: number;
  title: string;
  description?: string;
  email: string;
};

export type Article = {
  title: string;
  description: string;
  img: string;
  md: string;
  slug: string;
  is_featured: boolean;
  created_at: string;
};
