import dotenv from "dotenv";

dotenv.config();

export const config ={
    DbUrl:process.env.DATABASE_URL || "postgresql://postgres:nabokiLASCAP1998@localhost:5432/selcom_payment",
    port:process.env.PORT || 3000,
    environment:process.env.NODE_ENV || "development"
}