import { pool } from "../db/conn.js";
import type { RegistrationUser } from "../types/users.types.js";

export class UserService{
    addUser=async(firstName: string, midName: string, lastName: string, email: string, phoneNumber: string, passwordHash: string)=>{
    const client = await pool.connect();  
    try {
    await client.query("BEGIN");

    const newUser:RegistrationUser = {
        firstName,
        midName,
        lastName,
        email,
        phoneNumber,
        passwordHash
    }
    
    const insertUser = await client.query(`
        INSERT INTO users(first_name, mid_name, last_name, email, phone_number)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
        `,[newUser.firstName, newUser.midName, newUser.lastName, newUser.email, newUser.phoneNumber]);

    const userId = insertUser.rows[0]?.id;
    
    await client.query(`
    INSERT INTO user_credentials(user_id, password_hash )
    VALUES ($1, $2)
    RETURNING *
    `,[userId, newUser.passwordHash]);

    await client.query("COMMIT");

    } catch (error) {

    await client.query("ROLLBACK");

    throw error;  
    } finally{

    client.release();

    }
    }

}