import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DB_URL
})

export const query=async<T=any>(sql:string, params?:any[])=>{
const client = await pool.connect();
try {
const res = await client.query(sql,params);
return res.rows as T[];  
} catch (error) {
    console.error(`Error performing operation "${sql}" :`, error)
    throw error;
} finally {
    client.release();
}
}

export const dbConnTest =async()=>{
const client = await pool.connect();
try {
    const res = await client.query('SELECT NOW() as now');
    console.log(`Established connection to datababse at : ${res.rows[0].now}`)
} catch (error) {
    console.error('Error connecting to database :', error);
} finally {
    client.release();

}
}
