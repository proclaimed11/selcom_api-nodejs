import express from "express";
import { config } from "./config/index.js";
import { dbTestConn } from "./db/connection.js";
import { dbTest } from "./db/db-test.js";
import serviceRouter from "./routes/serviceRoutes.js";

const app = express();

app.use(express.json());
app.use("/",serviceRouter);

const port = config.port;

const env= config.environment

const initialize = async()=>{
    await dbTestConn();
    //await dbTest();
    app.listen(port,()=>{
      console.log(`Database running at : ${port}[${env}]`);
    })
}

initialize().catch(console.error)
