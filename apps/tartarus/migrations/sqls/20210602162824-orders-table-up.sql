CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    shipping_address_id VARCHAR(50) REFERENCES addresses(id),
    billing_address_id VARCHAR(50) REFERENCES addresses(id),
    shipping_no VARCHAR(50) NOT NULL,
    invoice_no VARCHAR(50) NOT NULL,
    invoice_date VARCHAR(255) NOT NULL,
    delivery_date VARCHAR(255) NOT NULL,
    status VARCHAR(15) NOT NULL,
    total NUMERIC NOT NULL,
    total_discount NUMERIC NOT NULL DEFAULT 0,
    comment TEXT,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL
)