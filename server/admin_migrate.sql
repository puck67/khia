-- Admin setup migration
-- Run in Supabase SQL Editor

-- 1. Add is_admin flag to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- 2. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id             SERIAL PRIMARY KEY,
  user_id        INT          REFERENCES users(id) ON DELETE SET NULL,
  name           VARCHAR(200) NOT NULL,
  phone          VARCHAR(30)  NOT NULL,
  email          VARCHAR(255) NOT NULL,
  service        VARCHAR(150),
  pkg            VARCHAR(150),
  location       VARCHAR(300),
  notes          TEXT,
  booking_date   DATE,
  booking_slot   VARCHAR(50),
  payment_method VARCHAR(50),
  price_vnd      BIGINT,
  status         VARCHAR(30)  NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS bookings_user_idx    ON bookings (user_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx  ON bookings (status);
CREATE INDEX IF NOT EXISTS bookings_created_idx ON bookings (created_at DESC);

-- 3. Promote a user to admin (replace email)
-- UPDATE users SET is_admin = TRUE WHERE email = 'your@email.com';
