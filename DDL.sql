-- USERS TABLE
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);


-- ITEMS TABLE
CREATE TABLE items (
    id BIGSERIAL PRIMARY KEY,
    link TEXT NOT NULL,
    name TEXT NOT NULL,
    url_safe_name TEXT NOT NULL,
    image_url TEXT,
    price TEXT,
    content TEXT,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_items_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_items_user_id ON items(user_id);


-- LISTS TABLE
CREATE TABLE lists (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url_safe_name TEXT NOT NULL,
    content TEXT,
    user_id BIGINT NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_lists_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_lists_user_id ON lists(user_id);


-- TAGS TABLE
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url_safe_name TEXT NOT NULL,
    colour_hex VARCHAR(7),
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_tags_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_tags_user_id ON tags(user_id);


-- ITEM_TAG TABLE
CREATE TABLE item_tag (
    id BIGSERIAL PRIMARY KEY,
    item_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_item_tag_item_id FOREIGN KEY (item_id) REFERENCES items(id),
    CONSTRAINT fk_item_tag_tag_id FOREIGN KEY (tag_id) REFERENCES tags(id),
    CONSTRAINT fk_item_tag_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_item_tag_item_id ON item_tag(item_id);
CREATE INDEX idx_item_tag_tag_id ON item_tag(tag_id);
CREATE INDEX idx_item_tag_user_id ON item_tag(user_id);


-- LIST_TAG TABLE
CREATE TABLE list_tag (
    id BIGSERIAL PRIMARY KEY,
    tag_id BIGINT NOT NULL,
    list_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_list_tag_tag_id FOREIGN KEY (tag_id) REFERENCES tags(id),
    CONSTRAINT fk_list_tag_list_id FOREIGN KEY (list_id) REFERENCES lists(id),
    CONSTRAINT fk_list_tag_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_list_tag_tag_id ON list_tag(tag_id);
CREATE INDEX idx_list_tag_list_id ON list_tag(list_id);
CREATE INDEX idx_list_tag_user_id ON list_tag(user_id);


-- USER_ACCESS TABLE
CREATE TABLE user_access (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    list_id BIGINT NOT NULL,
    CONSTRAINT fk_user_access_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_user_access_list_id FOREIGN KEY (list_id) REFERENCES lists(id)
);

CREATE INDEX idx_user_access_user_id ON user_access(user_id);
CREATE INDEX idx_user_access_list_id ON user_access(list_id);
