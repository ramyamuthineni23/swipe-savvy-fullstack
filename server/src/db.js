const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS businesses (
        business_id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        mobile_number VARCHAR(15) NOT NULL,
        sms_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
        password VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        is_owner BOOLEAN NOT NULL,
        business_id VARCHAR(255) REFERENCES businesses(business_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        premium_user BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);
    console.log('Database tables created');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

initDb();

module.exports = pool;