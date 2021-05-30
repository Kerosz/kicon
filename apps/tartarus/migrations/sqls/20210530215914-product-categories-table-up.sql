CREATE TABLE product_categories (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    category_id BIGINT REFERENCES categories(id)
)