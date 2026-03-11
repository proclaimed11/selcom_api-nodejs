export const config = {
   port:process.env.PORT || 3000,
   dbUrl:process.env.DATABASE_URL || "postgresql://postgres:nabokiLASCAP1998@localhost:5432/selcom_payment",
   environment:process.env.NODE_ENV || "development"
}