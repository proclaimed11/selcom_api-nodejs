import { pool } from "../db/conn.js";
import type { RegistrationUser } from "../types/users.types.js";

export class UserService{
 registerUser=async(user:RegistrationUser)=>{
  const client = await pool.connect();

  if(!user.firstName || !user.midName || !user.lastName || !user.email || !user.phoneNumber){
   throw new Error("Missing fields on the body")
  }

  try {
    await client.query("BEGIN");

    const userDataSql = `
    INSERT INTO users(first_name, mid_name, last_name, email, phone_number)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `

    const userData=[
    user.firstName,
    user.midName,
    user.lastName,
    user.email,
    user.phoneNumber
    ]

    const userRegData = await client.query<{id:number}>(userDataSql, userData);
    const userId = userRegData.rows[0]?.id;

    if(!userId){
     throw new Error("Database failed to fetch an id");
    }

    const userCredentials = `
    INSERT INTO user_credentials(user_id, password_hash)
    VALUES ($1, $2)
    `

    await client.query(userCredentials,[userId, user.passwordHash]);

    await client.query("COMMIT");

    return {
        success:true,
        userId:userId, 
        message:`user account with id${userId} created successfuly!`
    }

  } catch (error:any) {

    await client.query("ROLLBACK");

    if(error.code === '23505'){
     throw new Error("A user with this email or phone number already exists.")
    }

    throw error;
    
  } finally{
    client.release();
  }
 }   
}