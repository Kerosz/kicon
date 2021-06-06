CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(15) DEFAULT 'customer',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(150),
    birthday DATE,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL
)