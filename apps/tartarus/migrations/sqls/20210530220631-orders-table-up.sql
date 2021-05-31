CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) REFERENCES customers(id),
    shipping_address_id VARCHAR(50) REFERENCES addresses(id),
    billing_address_id VARCHAR(50) REFERENCES addresses(id),
    shipping_no VARCHAR(50) NOT NULL,
    invoice_no VARCHAR(50) NOT NULL,
    invoice_date DATE DEFAULT NOW(),
    delivery_date DATE,
    status VARCHAR(15) NOT NULL,
    total NUMERIC NOT NULL,
    total_discount NUMERIC NOT NULL DEFAULT 0,
    comment TEXT,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
)