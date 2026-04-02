import { Pool } from "pg";
import { config } from "../config/index.js";

const pool = new Pool({
    connectionString: config.DB_URL,
    connectionTimeoutMillis: 5000, // 5 seconds
    idleTimeoutMillis: 10000, // 10 seconds
    max:20
});

export const query=async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
const client = await pool.connect();
try {
const res = await client.query(sql, params);
return res.rows as T[];
} catch (error) {
console.error(`Error performing query: ${sql}`, error);
throw error;
} finally {
client.release();
}
}


export const DbTestConn=async()=>{
const client = await pool.connect();
try {
const res = await client.query("SELECT NOW() as now");
console.log(`Database established connection at: ${res.rows[0].now}`)      
} catch (error) {
  console.error("Error establishing database connection", error);      
} finally {
client.release();
}
}