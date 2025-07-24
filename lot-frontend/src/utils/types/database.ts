export type User = {
  id: number;
  email: string;
  pass_hash?: string;
  created_at: string;
};

export type Item = {
  id: number;
  link: string;
  name: string;
  url_safe_name: string;
  image_url?: string | null;
  price?: string | null;
  content?: string | null;
  user_id: number;
  created_at: string;
};

export type List = {
  id: number;
  title: string;
  url_safe_name: string;
  content: string | null;
  user_id: number;
  is_private: boolean;
  created_at: string;
};

export type Tag = {
  id: number;
  name: string;
  url_safe_name: string;
  colour_hex?: string | null;
  user_id: number;
  created_at: string;
};

export type ItemTag = {
  id: number;
  item_id: number;
  tag_id: number;
  user_id: number;
};

export type ListTag = {
  id: number;
  tag_id: number;
  list_id: number;
  user_id: number;
};

export type UserAccess = {
  id: number;
  user_id: number;
  list_id: number;
};
