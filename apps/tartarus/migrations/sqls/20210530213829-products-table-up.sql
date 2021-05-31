CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    stock INTEGER NOT NULL,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
)