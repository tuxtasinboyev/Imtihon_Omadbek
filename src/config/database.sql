CREATE DATABASE imtihon;

\c imtihon;

CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    location VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE transports (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    price INT NOT NULL ,
    created_at DATE DEFAULT CURRENT_DATE,
    branch_id INT REFERENCES branches(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birth_date VARCHAR(255),
    gender VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'user')),
    branch_id INT REFERENCES branches(id)
);


CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    transport_id INT REFERENCES transports(id),
    can_create BOOLEAN DEFAULT FALSE,
    can_read   BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    can_update BOOLEAN DEFAULT FALSE
);

CREATE TABLE admin_permissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    can_create BOOLEAN DEFAULT FALSE,
    can_read   BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    can_update BOOLEAN DEFAULT FALSE,
    can_add_permission BOOLEAN DEFAULT FALSE,
    can_add_admin BOOLEAN DEFAULT FALSE,
    can_control_branch BOOLEAN DEFAULT FALSE
);
