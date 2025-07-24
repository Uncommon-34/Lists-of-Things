import { sql } from "./database_conection";

export const getUserByEmail = async (email: string) => {
  const [user] = await sql`
    SELECT * FROM "user" WHERE email = ${email};
  `;
  return user;
};

export const createDB = async () => {
  await sql`
    DO $$
    BEGIN

      -- USERS TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_users') THEN
        CREATE TABLE lot_users (
          id BIGSERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          pass_hash TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        CREATE INDEX idx_lot_users_email ON lot_users(email);
      END IF;

      -- ITEMS TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_items') THEN
        CREATE TABLE lot_items (
          id BIGSERIAL PRIMARY KEY,
          link TEXT NOT NULL,
          name TEXT NOT NULL,
          url_safe_name TEXT NOT NULL,
          image_url TEXT,
          price TEXT,
          content TEXT,
          user_id BIGINT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          CONSTRAINT lot_fk_items_user_id FOREIGN KEY (user_id) REFERENCES lot_users(id)
        );
        CREATE INDEX idx_lot_items_user_id ON lot_items(user_id);
      END IF;

      -- LISTS TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_lists') THEN
        CREATE TABLE lot_lists (
          id BIGSERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          url_safe_name TEXT NOT NULL,
          content TEXT,
          user_id BIGINT NOT NULL,
          is_private BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          CONSTRAINT lot_fk_lists_user_id FOREIGN KEY (user_id) REFERENCES lot_users(id)
        );
        CREATE INDEX idx_lot_lists_user_id ON lot_lists(user_id);
      END IF;

      -- TAGS TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_tags') THEN
        CREATE TABLE lot_tags (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          url_safe_name TEXT NOT NULL,
          colour_hex VARCHAR(7),
          user_id BIGINT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          CONSTRAINT lot_fk_tags_user_id FOREIGN KEY (user_id) REFERENCES lot_users(id)
        );
        CREATE INDEX idx_lot_tags_user_id ON lot_tags(user_id);
      END IF;

      -- ITEM_TAG TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_item_tag') THEN
        CREATE TABLE lot_item_tag (
          id BIGSERIAL PRIMARY KEY,
          item_id BIGINT NOT NULL,
          tag_id BIGINT NOT NULL,
          user_id BIGINT NOT NULL,
          CONSTRAINT lot_fk_item_tag_item_id FOREIGN KEY (item_id) REFERENCES lot_items(id),
          CONSTRAINT lot_fk_item_tag_tag_id FOREIGN KEY (tag_id) REFERENCES lot_tags(id),
          CONSTRAINT lot_fk_item_tag_user_id FOREIGN KEY (user_id) REFERENCES lot_users(id)
        );
        CREATE INDEX idx_lot_item_tag_item_id ON lot_item_tag(item_id);
        CREATE INDEX idx_lot_item_tag_tag_id ON lot_item_tag(tag_id);
        CREATE INDEX idx_lot_item_tag_user_id ON lot_item_tag(user_id);
      END IF;

      -- LIST_TAG TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_list_tag') THEN
        CREATE TABLE lot_list_tag (
          id BIGSERIAL PRIMARY KEY,
          tag_id BIGINT NOT NULL,
          list_id BIGINT NOT NULL,
          user_id BIGINT NOT NULL,
          CONSTRAINT lot_fk_list_tag_tag_id FOREIGN KEY (tag_id) REFERENCES lot_tags(id),
          CONSTRAINT lot_fk_list_tag_list_id FOREIGN KEY (list_id) REFERENCES lot_lists(id),
          CONSTRAINT lot_fk_list_tag_user_id FOREIGN KEY (user_id) REFERENCES lot_users(id)
        );
        CREATE INDEX idx_lot_list_tag_tag_id ON lot_list_tag(tag_id);
        CREATE INDEX idx_lot_list_tag_list_id ON lot_list_tag(list_id);
        CREATE INDEX idx_lot_list_tag_user_id ON lot_list_tag(user_id);
      END IF;

      -- USER_ACCESS TABLE
      IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'lot_user_access') THEN
        CREATE TABLE lot_user_access (
          id BIGSERIAL PRIMARY KEY,
          user_id BIGINT NOT NULL,
          list_id BIGINT NOT NULL,
          CONSTRAINT lot_fk_user_access_user_id FOREIGN KEY (user_id) REFERENCES lot_users(id),
          CONSTRAINT lot_fk_user_access_list_id FOREIGN KEY (list_id) REFERENCES lot_lists(id)
        );
        CREATE INDEX idx_lot_user_access_user_id ON lot_user_access(user_id);
        CREATE INDEX idx_lot_user_access_list_id ON lot_user_access(list_id);
      END IF;

    END $$;
  `;

  return;
};
