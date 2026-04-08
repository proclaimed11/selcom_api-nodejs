import express from "express";
import { config } from "./config/index.js";
import { dbTestConn } from "./db/conn.js";
import ServiceRouter from "./routers/service.routers.js";
import { errorHandler } from "./middlewares/errors.middleware.js";

const app = express();

app.use(express.json());

app.use("/", ServiceRouter);

app.use(errorHandler);


const PORT = config.port;
const ENV = config.env;

const initializeServer=()=>{
dbTestConn();
app.listen(PORT,()=>{
console.log(`Server running on ${PORT}: ${ENV} database`);
});
}

initializeServer()
