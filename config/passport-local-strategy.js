import passport from 'passport';
import { Strategy as passportLocals } from 'passport-local';
import Employee from '../models/employee.js';

passport.use(new passportLocals({ usernameField: 'email', passReqToCallback: true },  async function (req, email, password, done) {
    try {
        const employeePresent = await Employee.findOne({ email: email });

        if (!employeePresent || employeePresent.password != password ) {
            req.flash('error', 'Please Enter Valid Email & Password !');
            return done(null, false);
        }
            
            return done(null, employeePresent);
        

    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function (employee, done) {
    return done(null, employee.email);
});

passport.deserializeUser(async function (email, done) {
    try {
        const employeeLogin = await Employee.findOne({ email: email });
        return done(null, employeeLogin);
    } catch (error) {
        return done(error);
    }
});
//now check user is authenticated or not
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains user details
        return next();
    }
    return res.redirect('/');
}

export default passport;