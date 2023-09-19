import passport from 'passport';
import { Strategy as passportLocals } from 'passport-local';
import Employee from '../models/employee.js';

// this is passport local strategy for authenticating user
passport.use(new passportLocals({ usernameField: 'email', passReqToCallback: true },  async function (req, email, password, done) {
    try {
        // finds user details from database whether present in database or not
        const employeePresent = await Employee.findOne({ email: email });
        // if not present it will show erroe
        if (!employeePresent || employeePresent.password != password ) {
            req.flash('error', 'Please Enter Valid Email & Password !');
            return done(null, false);
         }
            return done(null, employeePresent);
     } catch (error) {
            return done(error);
    }
}));

// serialize the user i.e this serialize function sets cookies on browser
passport.serializeUser(function (employee, done) {
    return done(null, employee.email);
});

// deserialize user i.e this deserialize user function helps to identify the authenticated user
passport.deserializeUser(async function (email, done) {
    try {
        // finds Employee
        const employeeLogin = await Employee.findOne({ email: email });
        return done(null, employeeLogin);
    } catch (error) {
        return done(error);
    }
});

// used to authenticate internal API's inside page to page application 
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains user details
        return next();
    }
    return res.redirect('/');
}

export default passport;