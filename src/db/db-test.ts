import { query } from "./connection.js";

export const dbTest =async()=>{
    try {
    //     const insertUser = await query<{id:number}>(`
    //     INSERT INTO users(first_name, mid_name, last_name, email) 
    //     VALUES ($1, $2, $3, $4)
    //     RETURNING id`,
    //     ["justin", "Robert", "Kibona", "justinkibona@gmail.com"]
    // );

    // console.log(`User with id ${insertUser[0]?.id} was added`)

    const users = await query(`
        SELECT * FROM users
    `);
        
    console.table(users);
    } catch (error) {
       console.error("error fecthing users"); 
    }
}