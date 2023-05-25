import express from "express";
import { getListLocation } from "../controllers/LocationController.js";
import { searchFlight, addAutomatic } from "../controllers/FlightController.js";
import { SendMailBuyTicket, sendGmailAuthencation } from "../controllers/GmailController.js";




const OpenRouter = express.Router();

OpenRouter.get('/location/list',getListLocation)
OpenRouter.post('/flight/search',searchFlight)
OpenRouter.post('/gmail/send',sendGmailAuthencation)
OpenRouter.post('/gmail/send/buyticket',SendMailBuyTicket)
// OpenRouter.get('/flight/auto',addAutomatic)



export default OpenRouter;