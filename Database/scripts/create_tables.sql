USE inventory_system;

-- Table: "users"
CREATE TABLE IF NOT EXISTS users
(
    user_id       INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(45)                           NOT NULL,
    username      VARCHAR(20)                           NOT NULL UNIQUE,
    password_hash VARCHAR(100)                          NOT NULL,
    phone_number  VARCHAR(20),
    email         VARCHAR(255)                          NOT NULL UNIQUE,
    role          ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE') NOT NULL default 'EMPLOYEE',
    created_at    TIMESTAMP                             NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP                             NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by    INT UNSIGNED,
    updated_by    INT UNSIGNED
);


-- Table: "providers"
CREATE TABLE IF NOT EXISTS providers
(
    provider_id  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(45)  NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    email        VARCHAR(255) UNIQUE,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by   INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by   INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Table: "customer"
CREATE TABLE IF NOT EXISTS customers
(
    customer_id  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(45)  NOT NULL,
    phone_number VARCHAR(20),
    email        VARCHAR(255) UNIQUE,
    document     VARCHAR(45)  NOT NULL UNIQUE,
    address      VARCHAR(255),
    state        VARCHAR(45),
    city         VARCHAR(45),
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by   INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by   INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Table: "category"
CREATE TABLE IF NOT EXISTS categories
(
    category_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(45)  NOT NULL UNIQUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by  INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by  INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Table: "products"
CREATE TABLE IF NOT EXISTS products
(
    product_id     INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name           VARCHAR(45)  NOT NULL UNIQUE,
    brand          VARCHAR(45)  NOT NULL,
    stock          INT          NOT NULL,
    purchase_price INT          NOT NULL,
    sale_price     INT          NOT NULL,
    weight         VARCHAR(20),
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    provider_id    INT UNSIGNED NOT NULL,
    category_id    INT UNSIGNED NOT NULL,
    created_by     INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by     INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (provider_id) REFERENCES providers (provider_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users (user_id) ON DELETE CASCADE

);

-- Table: "orders"
CREATE TABLE IF NOT EXISTS orders
(
    order_id    INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    total_value INT          NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    provider_id INT UNSIGNED NOT NULL,
    user_id     INT UNSIGNED NOT NULL,
    created_by  INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by  INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (provider_id) REFERENCES providers (provider_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Table: "order_details"
CREATE TABLE IF NOT EXISTS order_details
(
    order_detail_id  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_id         INT UNSiGNED NOT NULL,
    product_id       INT UNSIGNED NOT NULL,
    product_quantity INT          NOT NULL,
    price            INT          NOT NULL,
    created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by       INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by       INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users (user_id) ON DELETE CASCADE
);