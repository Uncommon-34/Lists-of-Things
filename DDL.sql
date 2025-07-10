-- Users table
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lists table
CREATE TABLE lists (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id BIGINT NOT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    url_safe_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_lists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Items table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    link TEXT,
    name TEXT NOT NULL,
    image_url TEXT,
    price TEXT,
    content TEXT,
    list_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    url_safe_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_items_list FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
    CONSTRAINT fk_items_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_lists_user_id ON lists (user_id);
CREATE INDEX IF NOT EXISTS idx_items_list_id ON items (list_id);
CREATE INDEX IF NOT EXISTS idx_items_user_id ON items (user_id);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items (created_at);

-- Function to auto-create default list and item when a user is created
CREATE OR REPLACE FUNCTION create_default_list_and_item()
RETURNS TRIGGER AS $$
DECLARE
    new_list_id BIGINT;
BEGIN
    INSERT INTO lists (title, content, user_id, is_private, url_safe_name)
    VALUES ('General', 'A Default list for general items', NEW.id, TRUE, 'general')
    RETURNING id INTO new_list_id;

    INSERT INTO items (name, image_url, price, content, list_id, user_id, url_safe_name)
    VALUES (
        'Demo item',
        'https://via.placeholder.com/150',
        '£0.00',
        'a demo item to show what it looks like',
        new_list_id,
        NEW.id,
        'demo-item'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to execute function on user insert
CREATE TRIGGER trg_create_default_list_and_item
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_list_and_item();
