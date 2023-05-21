import pg from 'pg'
import 'dotenv/config';

const pool = new pg.Pool({
    user:  process.env.POSTQRESQL_USER,
    host: process.env.POSTQRESQL_HOST,
    database: process.env.POSTQRESQL_DATABASE,
    password: process.env.POSTQRESQL_PASSWORD,
    port: process.env.POSTQRESQL_PORT, // Cổng mặc định của PostgreSQL là 5432
});




export default pool;