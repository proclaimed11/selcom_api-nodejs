import { Pool } from "pg";
import { config } from "../config/index.js";

const pool = new Pool({
    connectionString:config.DbUrl,
    max:20,
    connectionTimeoutMillis:2000,
    idleTimeoutMillis:30000
})

export const query=async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
const client = await pool.connect();
try {
   const res = await client.query(sql,params);
   return res.rows as T[]; 
} catch (error) {
    console.error(`Error performing operation: ${sql}`, error);
    throw error;
}finally{
    client.release();
}
}


export const dbTestConn=async()=>{
const client = await pool.connect();
try {
   const res = await client.query("SELECT NOW() as now");
   console.log(`Database established connection at: ${res.rows[0].now}`)
} catch (error) {
    console.error(`Error connecting database`,error);
    throw error;
}finally{
    client.release();
}
}

process.on("SIGTERM",async()=>{
console.log("Database shutting down...");
await pool.end();
process.exit(0);
})