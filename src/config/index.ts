import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT,
    DB_URL:process.env.DB_URL,
    ENV:process.env.NODE_ENV
}