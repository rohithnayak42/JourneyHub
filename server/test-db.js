const db = require('./config/postgres');

/**
 * Simple test script to verify the database connection
 */
const testConnection = async () => {
  console.log('🔄 Attemping to connect to PostgreSQL (Neon)...');
  
  try {
    // Run a basic query to check connection
    const result = await db.query('SELECT NOW() as current_time, current_database() as database_name');
    
    console.log('✅ PostgreSQL Connected Successfully!');
    console.log('📅 Server Time:', result.rows[0].current_time);
    console.log('🗄️ Database:', result.rows[0].database_name);
    
    // Check table count or some other metadata if needed
    // const tables = await db.query("SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'");
    // console.log('📊 Total Public Tables:', tables.rows[0].count);

    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Test Failed!');
    console.error('Error Details:', error.message);
    process.exit(1);
  }
};

testConnection();
