import pg from 'pg'
import 'dotenv/config';



export const pool = new pg.Pool({
    user:  'postgres',
    host: 'containers-us-west-66.railway.app',
    database: 'railway',
    password: 'OA3PubJStvnB4ibx3Q1g',
    port: '5909', // Cổng mặc định của PostgreSQL là 5432
});




export default pool;