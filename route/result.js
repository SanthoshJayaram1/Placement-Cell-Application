import express from "express";
import { update,resultPage } from "../controller/result.js";

const resultRouter = express.Router();

resultRouter.get('/:id' ,resultPage);
resultRouter.post('/update',update);

export default resultRouter;