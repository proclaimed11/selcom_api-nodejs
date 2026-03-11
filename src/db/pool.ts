import { Pool } from "pg";
import { config } from "../config/index.js";


const pool = new Pool({
    connectionString:config.dbUrl,
    max:20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis:2000,
})


export const query =async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
    const client = await pool.connect();
    try {
     const res = await client.query(sql,params);
     return res.rows as T[];  
    } catch (error) {
      console.error("Data operation error :", error);
      throw error;  
    } finally {
      client.release();
    }
}

export const DbConnTest =async()=>{
    const client = await pool.connect();
    try {
      const res = await client.query("SELECT NOW() as now"); 
      console.log(`Database connection established at: ${res.rows[0].now}`); 
    } catch (error) {
       console.error("Error connection database :", error);
    } finally {
        client.release()
    }
}

process.on("SIGTERM",async()=>{
console.log("Shuting down DB pool...")
await pool.end();
process.exit(0);
})


