import bodyParser from "body-parser";
import express from "express";

import cors from "cors";

import dotevn from "dotenv";
import OpenRouter from "./routers/OpenRouters.js";
import FlightRouter from "./routers/FlightRouters.js";
import UserRouter from "./routers/UserRouters.js";


const app = express();
dotevn.config();

const whitelist = ['http://localhost:3000/', 'http://localhost:8888/','https://shopii.onrender.com/'];
app.use(cors(),bodyParser.json());
app.use("/", OpenRouter);
app.use("/",UserRouter)
app.use("/", FlightRouter);
// app.use(authorizationJWT) ;
// app.use("/",ProductRouter)
app.listen(process.env.PORT || 8888, () => {
  console.log("server is running");
});
