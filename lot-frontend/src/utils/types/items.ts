export type Item = {
  id: string; // UUID
  link: string | null;
  name: string;
  image_url: string | null;
  price: string | null;
  content: string | null;
  list_id: number;
  user_id: number;
  url_safe_name: string;
  created_at: string;
};
