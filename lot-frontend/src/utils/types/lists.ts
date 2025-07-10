export type List = {
  id: number;
  title: string;
  content: string | null;
  user_id: number;
  is_private: boolean;
  url_safe_name: string;
  created_at: string;
};

export type List_with_image = {
  id: number;
  title: string;
  content: string | null;
  user_id: number;
  is_private: boolean;
  url_safe_name: string;
  created_at: string;
  latest_name: string;
  latest_url: string;
};
