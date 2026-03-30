import express from "express";
import { config } from "./config/index.js";
import { dbConnTest } from "./db/conn.js";
import serviceRouter from "./routes/MainServiceRoutes.js";

const app = express();

app.use(express.json());
app.use("/",serviceRouter);

const PORT = config.port;

const initializeServer=()=>{
    //testing connection
    dbConnTest();

   app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
   }) 
}


initializeServer();