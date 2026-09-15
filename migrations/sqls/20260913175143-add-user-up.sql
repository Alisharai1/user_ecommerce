CREATE TYPE Gender AS ENUM('male','female','other');

CREATE TABLE IF NOT EXISTS Users(
    id UUID PRIMARY KEY ,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gender Gender NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
