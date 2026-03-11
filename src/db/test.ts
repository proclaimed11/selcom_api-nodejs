import { query } from "./pool.js";


export const testOp =async()=>{
    try {
     const insertUser = await query<{id:number}>(`INSERT INTO users(first_name, mid_name, last_name, email) 
        VALUES($1, $2, $3, $4)
        RETURNING id`,
        ["Pascal", "Robert", "Kibona", "pascalkibona2@gmail.com"]
    );

    console.log(`User with id: ${insertUser[0]?.id} has been added`)

    const users = await query<any[]>("SELECT * FROM users ORDER BY id DESC LIMIT 3");

    console.table(users); 
    } catch (error) {
    console.error("Error performing operation :", error);
    throw error 
    }
}

