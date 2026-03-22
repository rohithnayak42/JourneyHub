const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL Connection Pool configuration
// Using Pool is best practice for production to handle multiple concurrent connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Neon requires SSL. rejectUnauthorized: false is often needed for cloud providers
    // unless you provide the specific CA certificate.
    rejectUnauthorized: false,
  },
  // Best practices for pool management
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 10000, // Increased to 10s to handle cloud cold starts
});

// Log pool events for better observability
pool.on('connect', () => {
  console.log('✅ New PostgreSQL client connected to pool');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

/**
 * Reusable query method to use throughout the application.
 * This automatically handles acquiring and releasing clients from the pool.
 */
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('⚡ Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('❌ Database Query Error:', error.message);
    throw error;
  }
};

module.exports = {
  query,
  pool, // Exporting pool for advanced usage (e.g., transactions)
};
