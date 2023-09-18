import express from "express";
import { jobPage } from "../controller/jobs.js";

const jobRouter = express.Router();

jobRouter.get('/list' ,jobPage);
export default jobRouter;