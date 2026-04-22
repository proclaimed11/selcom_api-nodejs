import express from "express";
import { config } from "./config/index.js";
import { DBConnTest } from "./db/conn.js";
import serviceRouter from "./routers/services.routes.js";


const app = express();

app.use(express.json());
app.use("/", serviceRouter)

const PORT = config.PORT;

const inititalizeApp=()=>{
app.listen(PORT, ()=>{
DBConnTest();
console.log(`Server running on port : ${PORT}`)
})
}

inititalizeApp();