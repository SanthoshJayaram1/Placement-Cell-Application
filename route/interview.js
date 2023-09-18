import express from "express";
import { interviewAllocation,interviewForm,interviewPage } from "../controller/interview.js";

const interviewRouter = express.Router();

interviewRouter.get('/interview_list' ,interviewPage);
interviewRouter.get('/:id' , interviewForm);
interviewRouter.post('/interview_allocation' , interviewAllocation);

export default interviewRouter;