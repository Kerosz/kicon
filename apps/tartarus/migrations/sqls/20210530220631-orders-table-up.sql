CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT REFERENCES customers(id),
    shipping_address_id BIGINT REFERENCES addresses(id),
    billing_address_id BIGINT REFERENCES addresses(id),
    shipping_no VARCHAR(50) NOT NULL,
    invoice_no VARCHAR(50) NOT NULL,
    invoice_date DATE DEFAULT NOW(),
    delivery_date DATE,
    status VARCHAR(15) NOT NULL,
    total NUMERIC NOT NULL,
    total_discount NUMERIC NOT NULL DEFAULT 0,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)