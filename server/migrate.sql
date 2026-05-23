-- Run this once in Supabase SQL Editor to create the users table
CREATE TABLE IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  first_name   VARCHAR(100) NOT NULL,
  last_name    VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL UNIQUE,
  phone        VARCHAR(20)  NOT NULL,
  password_hash TEXT        NOT NULL,
  role         VARCHAR(50)  NOT NULL DEFAULT 'ca-nhan',
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);
