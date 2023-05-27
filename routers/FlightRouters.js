import express from "express";
import { addAvaibleSeat, addAvaibleSeats, addFlight } from "../controllers/FlightController.js";




const FlightRouter = express.Router();

FlightRouter.post('/flight/add',addFlight)
FlightRouter.post('/flight/add/available_seat',addAvaibleSeat)
FlightRouter.post('/flight/add/available_seats',addAvaibleSeats)

export default FlightRouter;