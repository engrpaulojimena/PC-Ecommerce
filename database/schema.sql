-- database/schema.sql
-- Run this on your Neon PostgreSQL database to set up PCFORGE tables.
-- Go to: Neon Dashboard → your project → SQL Editor → paste and run.

-- Users
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    full_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'customer', -- 'customer' or 'admin'
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id          SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name        TEXT NOT NULL,
    description TEXT,
    price       NUMERIC(10, 2) NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    image       TEXT DEFAULT 'no-image.png',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id                SERIAL PRIMARY KEY,
    user_id           INTEGER REFERENCES users(id) ON DELETE SET NULL,
    guest_name        TEXT,
    guest_email       TEXT,
    guest_address     TEXT,
    total_amount      NUMERIC(10, 2) NOT NULL,
    payment_method    TEXT NOT NULL,     -- gcash, paypal, card
    payment_status    TEXT NOT NULL DEFAULT 'pending',  -- pending, paid, failed
    payment_reference TEXT,
    order_status      TEXT NOT NULL DEFAULT 'processing', -- processing, shipped, completed, cancelled
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Cart items (persists logged-in users' carts in the DB)
CREATE TABLE IF NOT EXISTS cart_items (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity    INTEGER NOT NULL DEFAULT 1,
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
    id           SERIAL PRIMARY KEY,
    order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id   INTEGER REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    price        NUMERIC(10, 2) NOT NULL,
    quantity     INTEGER NOT NULL
);

-- =====================
-- Seed data
-- =====================

INSERT INTO categories (name) VALUES
  ('Processors (CPU)'),
  ('Graphics Cards (GPU)'),
  ('Memory (RAM)'),
  ('Storage'),
  ('Motherboards'),
  ('Power Supplies'),
  ('Peripherals')
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (category_id, name, description, price, stock, image)
SELECT c.id, p.name, p.description, p.price, p.stock, 'no-image.png'
FROM (VALUES
  ('Processors (CPU)',    'Ryzen 7 7800X3D',          '8-core gaming CPU with 3D V-Cache for top-tier FPS.',              18999.00, 12),
  ('Graphics Cards (GPU)','GeForce RTX 4070',          '12GB GDDR6X, ray tracing ready, great for 1440p gaming.',          32999.00,  7),
  ('Memory (RAM)',        'Vengeance DDR5 32GB Kit',   '2x16GB 6000MHz low-latency memory kit.',                           5499.00,  25),
  ('Storage',            'NVMe SSD 1TB Gen4',          'Up to 7000MB/s read speed, perfect for fast boot times.',           3999.00,  30),
  ('Motherboards',       'B650 Gaming Motherboard',    'AM5 socket, WiFi 6E, PCIe 5.0 support.',                           8999.00,  10),
  ('Power Supplies',     '750W 80+ Gold PSU',          'Fully modular, quiet fan, 10-year warranty.',                       4599.00,  18),
  ('Peripherals',        'Mechanical Gaming Keyboard', 'Hot-swappable switches, RGB backlight.',                            2799.00,  22),
  ('Graphics Cards (GPU)','Radeon RX 7800 XT',         '16GB GDDR6, excellent 1440p performance.',                         28999.00,   5)
) AS p(cat_name, name, description, price, stock)
JOIN categories c ON c.name = p.cat_name
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = p.name);

-- =====================
-- Default admin account
-- Password: admin123  (bcrypt hash — change after first login!)
-- Generate a new hash at: https://bcrypt.online or via the setup script
-- =====================
INSERT INTO users (full_name, email, password, role)
VALUES (
  'Admin',
  'admin@pcshop.test',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
  'admin'
)
ON CONFLICT (email) DO NOTHING;
