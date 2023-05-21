import express from "express";
import { getListLocation } from "../controllers/LocationController.js";
import { searchFlight, addAutomatic } from "../controllers/FlightController.js";




const OpenRouter = express.Router();

OpenRouter.get('/location/list',getListLocation)
OpenRouter.post('/flight/search',searchFlight)
// OpenRouter.get('/flight/auto',addAutomatic)



export default OpenRouter;