USE inventory_system;

-- Insert default system user [ID=1]
INSERT INTO users (name, username, password_hash, phone_number, email, role)
VALUES ('System', 'system', '$2y$10$zFHTrU.2e7LR5ZTlDMu0Hu8WNp2oCKakROFKNffvsnv6i7aVkckMm', null, 'system@example.com',
        'ADMIN');

-- Insert example user
INSERT INTO users (name, username, password_hash, phone_number, email, role, created_by, updated_by)
VALUES ('Admin', 'admin', '$2y$10$zFHTrU.2e7LR5ZTlDMu0Hu8WNp2oCKakROFKNffvsnv6i7aVkckMm', null, 'admin@admin.com',
        'ADMIN', 1, 1),
       ('Klod Metushllari', 'klodm', '$2y$10$zFHTrU.2e7LR5ZTlDMu0Hu8WNp2oCKakROFKNffvsnv6i7aVkckMm', '3456789012',
        'michael.john@example.com', 'EMPLOYEE', 1, 1),
       ('Emily Davis', 'emilyd', '$2y$10$zFHTrU.2e7LR5ZTlDMu0Hu8WNp2oCKakROFKNffvsnv6i7aVkckMm', '4567890123',
        'emily.davis@example.com', 'EMPLOYEE', 1, 1),
       ('David Wilson', 'davidw', '$2y$10$zFHTrU.2e7LR5ZTlDMu0Hu8WNp2oCKakROFKNffvsnv6i7aVkckMm', '5678901234',
        'david.wilson@example.com', 'MANAGER', 1, 1);

-- Insert into provider
INSERT INTO providers (name, phone_number, email)
VALUES ('John Doe', '123-456-7890', 'john.doe@example.com'),
       ('Jane Smith', '234-567-8901', 'jane.smith@example.com'),
       ('Michael Johnson', '345-678-9012', 'michael.johnson@example.com'),
       ('Emily Davis', '456-789-0123', 'emily.davis@example.com'),
       ('David Wilson', '567-890-1234', 'david.wilson@example.com');

-- Insert into Customer
INSERT INTO customers (name, phone_number, email, document, address, state, city)
VALUES ('Alice Johnson', '123-456-7890', 'alice.johnson@example.com', 'DOC12345', '123 Maple Street', 'California',
        'Los Angeles'),
       ('Bob Smith', '234-567-8901', 'bob.smith@example.com', 'DOC23456', '456 Oak Avenue', 'Texas', 'Houston'),
       ('Charlie Brown', '345-678-9012', 'charlie.brown@example.com', 'DOC34567', '789 Pine Road', 'New York',
        'New York City'),
       ('Diana Prince', '456-789-0123', 'diana.prince@example.com', 'DOC45678', '101 Elm Boulevard', 'Illinois',
        'Chicago'),
       ('Ethan Hunt', '567-890-1234', 'ethan.hunt@example.com', 'DOC56789', '202 Cedar Lane', 'Florida', 'Miami');

-- Insert into category

INSERT INTO categories (name)
VALUES ('Electronics'),    #1
       ('Books'),          #2
       ('Clothing'),       #3
       ('Home & Kitchen'), #4
       ('Sports & Outdoors');

-- Insert into products
INSERT INTO products (name, brand, stock, purchase_price, sale_price, weight, provider_id, category_id)
VALUES ('Laptop', 'Dell', 50, 500, 700, '2kg', 1, 1),          #1
       ('Smartphone', 'Samsung', 100, 300, 500, '200g', 2, 1), #2
       ('Headphones', 'Sony', 200, 50, 100, '300g', 3, 2),     #3
       ('Refrigerator', 'LG', 30, 800, 1000, '50kg', 4, 3),    #4
       ('Microwave', 'Panasonic', 40, 100, 150, '15kg', 5, 3);

-- Insert into orders
INSERT INTO orders (total_value, provider_id, user_id)
VALUES (1900, 1, 1), #1
       (2000, 2, 2), #2
       (100, 3, 3),  #3
       (1000, 4, 4), #4
       (300, 5, 5);

-- Insert into order_details
INSERT INTO order_details (order_id, product_id, product_quantity, price)
VALUES (1, 1, 2, 1400),
       (1, 2, 1, 500),
       (2, 2, 3, 1500),
       (2, 3, 1, 100),
       (3, 3, 1, 100),
       (4, 4, 1, 1000),
       (5, 5, 2, 300);