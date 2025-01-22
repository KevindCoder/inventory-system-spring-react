DROP DATABASE inventory_system;
CREATE DATABASE IF NOT EXISTS inventory_system;
USE inventory_system;

-- Table: "user"
CREATE TABLE IF NOT EXISTS `user` (
                                      `user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                                      `name` VARCHAR(45) NOT NULL,
    `username` VARCHAR(20) NOT NULL UNIQUE,
    `password_hash` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role_id` ENUM('ADMIN', 'MANAGER', 'EMPLOYEE') NOT NULL default 'EMPLOYEE',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` INT UNSIGNED,
    `updated_by` INT UNSIGNED
    );

-- Table: "provider"
CREATE TABLE IF NOT EXISTS `provider` (
                                          `provider_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                                          `name` VARCHAR(45) NOT NULL UNIQUE,
    `phone_number` VARCHAR(20),
    `email` VARCHAR(255) UNIQUE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` INT UNSIGNED NOT NULL,
    `updated_by` INT UNSIGNED NOT NULL
    );

-- Table: "customer"
CREATE TABLE IF NOT EXISTS `customer` (
                                          `customer_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                                          `name` VARCHAR(45) NOT NULL,
    `phone_number` VARCHAR(20),
    `email` VARCHAR(255) UNIQUE,
    `document` VARCHAR(45) NOT NULL UNIQUE,
    `address` VARCHAR(255),
    `state` VARCHAR(45),
    `city` VARCHAR(45),
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` INT UNSIGNED NOT NULL,
    `updated_by` INT UNSIGNED NOT NULL
    );

-- Table: "category"
CREATE TABLE IF NOT EXISTS `category` (
                                          `category_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                                          `name` VARCHAR(45) NOT NULL UNIQUE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_by` INT UNSIGNED NOT NULL,
    `updated_by` INT UNSIGNED NOT NULL
    );

-- Table: "product"
CREATE TABLE IF NOT EXISTS `product` (
                                         `product_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                                         `name` VARCHAR(45) NOT NULL UNIQUE,
    `brand` VARCHAR(45) NOT NULL,
    `stock` INT NOT NULL,
    `purchase_price` INT NOT NULL,
    `sale_price` INT NOT NULL,
    `weight` VARCHAR(20),
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `provider_id` INT UNSIGNED NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    `created_by` INT UNSIGNED NOT NULL,
    `updated_by` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`provider_id`) REFERENCES `provider`(`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );
select * from order
-- Table: "order"
CREATE TABLE IF NOT EXISTS `order` (
                                       `order_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                                       `total_value` INT NOT NULL,
                                       `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                       `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                       `provider_id` INT UNSIGNED NOT NULL,
                                       `user_id` INT UNSIGNED NOT NULL,
                                       `created_by` INT UNSIGNED NOT NULL,
                                       `updated_by` INT UNSIGNED NOT NULL,
                                       FOREIGN KEY (`provider_id`) REFERENCES `provider`(`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Table: "purchase_detail"
CREATE TABLE IF NOT EXISTS `order_detail` (
                                              `order_detail_id` INT UNSIGNED NOT NULL,
                                              `order_id` INT UNSiGNED NOT NULL,
                                              `product_id` INT UNSIGNED NOT NULL,
                                              `product_quantity` INT NOT NULL,
                                              `price` INT NOT NULL,
                                              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                              `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                              `created_by` INT UNSIGNED NOT NULL,
                                              `updated_by` INT UNSIGNED NOT NULL,
                                              PRIMARY KEY (`order_detail_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );



-- Insert default admin user
-- Insert an admin user
INSERT INTO `user`
(`name`, `username`, `password_hash`, `phone_number`, `email`, `role_id`)
VALUES
    ('Alice Admin', 'alice_admin', 'hashed_password_1', '1234567890', 'alice.admin@example.com', 'admin');

-- Insert into user
INSERT INTO `user`
(`name`, `username`, `password_hash`, `phone_number`, `email`, `role_id`)
VALUES
    ('Klod Metushllari', 'klodm', 'hashed_password_3', '3456789012', 'michael.johnson@example.com', 'EMPLOYEE'),
    ('Emily Davis', 'emilyd', 'hashed_password_4', '4567890123', 'emily.davis@example.com', 'EMPLOYEE'),
    ('David Wilson', 'davidw', 'hashed_password_5', '5678901234', 'david.wilson@example.com', 'MANAGER');
-- Insert into provider
INSERT INTO provider (name, phone_number, email, created_by, updated_by)
VALUES
    ('John Doe', '123-456-7890', 'john.doe@example.com', 1, 1),
    ('Jane Smith', '234-567-8901', 'jane.smith@example.com', 1, 1),
    ('Michael Johnson', '345-678-9012', 'michael.johnson@example.com', 1, 1),
    ('Emily Davis', '456-789-0123', 'emily.davis@example.com', 1, 1),
    ('David Wilson', '567-890-1234', 'david.wilson@example.com', 1, 1);

-- Insert into Customer
INSERT INTO customer (name, phone_number, email, document, address, state, city, created_by, updated_by)
VALUES
    ('Alice Johnson', '123-456-7890', 'alice.johnson@example.com', 'DOC12345', '123 Maple Street', 'California', 'Los Angeles', 1, 1),
    ('Bob Smith', '234-567-8901', 'bob.smith@example.com', 'DOC23456', '456 Oak Avenue', 'Texas', 'Houston', 1, 1),
    ('Charlie Brown', '345-678-9012', 'charlie.brown@example.com', 'DOC34567', '789 Pine Road', 'New York', 'New York City', 1, 1),
    ('Diana Prince', '456-789-0123', 'diana.prince@example.com', 'DOC45678', '101 Elm Boulevard', 'Illinois', 'Chicago', 1, 1),
    ('Ethan Hunt', '567-890-1234', 'ethan.hunt@example.com', 'DOC56789', '202 Cedar Lane', 'Florida', 'Miami', 1, 1);
-- Insert an employee user
-- INSERT INTO `user` 
-- (`name`, `username`, `password_hash`, `phone_number`, `email`, `role_id`) 
-- VALUES 
-- ('Charlie Employee', 'charlie_employee', 'hashed_password_3', '3456789012', 'charlie.employee@example.com', 'employee');

-- Insert another employee user
-- INSERT INTO `user` 
-- (`name`, `username`, `password_hash`, `phone_number`, `email`, `role_id`) 
-- VALUES 
-- ('Dana Employee', 'dana_employee', 'hashed_password_4', '4567890123', 'dana.employee@example.com', 'employee');

-- Insert in provider table
INSERT INTO provider (name, phone_number, email, created_by, updated_by)
VALUES
    ('John Doe', '123-456-7890', 'john.doe@example.com', 1, 1),
    ('Jane Smith', '234-567-8901', 'jane.smith@example.com', 1, 1),
    ('Michael Johnson', '345-678-9012', 'michael.johnson@example.com', 1, 1),
    ('Emily Davis', '456-789-0123', 'emily.davis@example.com', 1, 1),
    ('David Wilson', '567-890-1234', 'david.wilson@example.com', 1, 1);

-- Insert into category 

INSERT INTO category (name, created_by, updated_by)
VALUES
    ('Electronics', 1, 1),
    ('Books', 1, 1),
    ('Clothing', 1, 1),
    ('Home & Kitchen', 1, 1),
    ('Sports & Outdoors', 1, 1);

-- Insert into product 
INSERT INTO product (name, brand, stock, purchase_price, sale_price, weight, provider_id, category_id, created_by, updated_by)
VALUES
    ('Laptop', 'Dell', 50, 500, 700, '2kg', 1, 1, 1, 1),
    ('Smartphone', 'Samsung', 100, 300, 500, '200g', 2, 1, 1, 1),
    ('Headphones', 'Sony', 200, 50, 100, '300g', 3, 2, 1, 1),
    ('Refrigerator', 'LG', 30, 800, 1000, '50kg', 4, 3, 1, 1),
    ('Microwave', 'Panasonic', 40, 100, 150, '15kg', 5, 3, 1, 1);

-- Insert into order 
INSERT INTO `order` (total_value, provider_id, user_id, created_by, updated_by)
VALUES
    (1000, 1, 1, 1, 1),
    (2000, 2, 2, 1, 1),
    (1500, 3, 3, 1, 1),
    (2500, 4, 4, 1, 1),
    (3000, 5, 5, 1, 1);

-- Insert into order_detail

INSERT INTO order_detail (order_detail_id, order_id, product_id, product_quantity, price, created_by, updated_by)
VALUES
    (1, 11, 1, 2, 1400, 1, 1),
    (2, 12, 2, 3, 1500, 1, 1),
    (3, 13, 3, 1, 100, 1, 1),
    (4, 14, 4, 1, 1000, 1, 1),
    (5, 15, 5, 2, 300, 1, 1);