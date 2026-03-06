import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv:process.env.NODE_ENV || "development",
    dbUrl:process.env.DATABASE_URL || "",
}

if(!config.dbUrl){
console.error("database url not present at the .env file");
process.exit(1);
}