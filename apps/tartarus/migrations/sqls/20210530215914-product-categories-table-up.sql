CREATE TABLE product_categories (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id),
    category_id VARCHAR(50) REFERENCES categories(id)
)