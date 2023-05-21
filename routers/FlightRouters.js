import express from "express";
import { addFlight } from "../controllers/FlightController.js";




const FlightRouter = express.Router();

FlightRouter.post('/flight/add',addFlight)



export default FlightRouter;