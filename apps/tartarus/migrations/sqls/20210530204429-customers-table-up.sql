CREATE TABLE customers (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(150),
    birthday DATE,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL
)