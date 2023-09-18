import express from "express";
import passport from "passport";
import dashboardRouter from "./employeedashboard.js";
import interviewRouter from "./interview.js";
import resultRouter from "./result.js";
import jobRouter from "./job.js";
import { SignIn,SignInPage,createSession,createSessionPage,SignOut } from "../controller/employee.js";

const router = express.Router();

router.get('/',SignInPage);
router.post('/sign_in', passport.authenticate('local', { failureRedirect: '/' }),SignIn);
router.get('/signUp',createSessionPage);
router.get('/destroy_session' ,SignOut);
router.post('/create_session',createSession);
router.use('/employee', dashboardRouter);
router.use('/student', interviewRouter);
router.use('/result', resultRouter);
router.use('/job', jobRouter);

export default router; 