import pg from 'pg'
import 'dotenv/config';



export const pool = new pg.Pool({
    user:  'postgres',
    host: 'containers-us-west-142.railway.app',
    database: 'railway',
    password: '4mg3T4aR1VqWYBmJYoAK',
    port: '6455', // Cổng mặc định của PostgreSQL là 5432
});




export default pool;