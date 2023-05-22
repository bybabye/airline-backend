import express from "express";
import { addAvaibleSeat, addFlight } from "../controllers/FlightController.js";




const FlightRouter = express.Router();

FlightRouter.post('/flight/add',addFlight)
FlightRouter.post('/flight/add/available_seats',addAvaibleSeat)


export default FlightRouter;