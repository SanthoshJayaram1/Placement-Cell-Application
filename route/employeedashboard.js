import express from "express";
import { dashboard,addStudent,addStudentPage,downloadData } from "../controller/student.js";

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard',dashboard)
dashboardRouter.get('/student',addStudentPage);
dashboardRouter.post('/addstudent',addStudent);
dashboardRouter.get('/download' ,downloadData);

export default dashboardRouter;