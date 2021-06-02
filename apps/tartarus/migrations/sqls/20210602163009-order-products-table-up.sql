CREATE TABLE order_products(
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id),
    product_id VARCHAR(50) REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL
)