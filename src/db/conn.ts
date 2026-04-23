import { Pool } from "pg";
import { config } from "../config/index.js";

export const pool = new Pool({
    connectionString:config.DATABABSE_URL,
    max:20,
    idleTimeoutMillis:30000,
    connectionTimeoutMillis:2000
})

export const query=async<T=any>(sql:string, params?:any[]):Promise<T[]>=>{
const client = await pool.connect();
try {

const res = await client.query(sql,params); 

return res.rows as T[];

} catch (error) {
throw error;

} finally {
client.release();
}
}

export const DBConnTest=async()=>{
const client = await pool.connect();
 try {

const res = await client.query(`SELECT NOW() as now`);

console.log(`Database establishing connection at ${res.rows[0].now}`)

} catch (error) {
 throw error;   

} finally {
client.release();
}

}