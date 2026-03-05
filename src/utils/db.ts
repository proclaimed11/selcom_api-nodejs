import { Pool } from "pg";
import { config } from "../config/index.js";

const pool = new Pool({
  connectionString:config.dbUrl,  
});

export const query=async<T=any>(text:string, params?: any[])=>{
    const client = await pool.connect();
    try {
    const res = await client.query(text,params);
    return res.rows as T[]; 
    }finally{
        client.release();
    }
}

export const testDbConnection =async()=>{
    try{
    const client = await pool.connect();
    console.log("Postgres connected successfully!")
    client.release();
    }catch(err){
     console.error("Failed to connect to PostgresSQL:", err);
     process.exit(1); 
    }
}