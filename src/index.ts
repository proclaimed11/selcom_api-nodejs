import express from "express";
import {config} from "./config/index.js";
import { DbTestConn } from "./db/conn.js";
import serviceRouter from "./routes/services.routes.js";


const app = express();

app.use(express.json());
app.use("/", serviceRouter)

const PORT = config.PORT;
const ENV = config.ENV;

const initializeServer=()=>{
    DbTestConn();
    app.listen(PORT,()=>{
        console.log(`${ENV} server is running on port ${PORT}`);
    })
}

initializeServer();