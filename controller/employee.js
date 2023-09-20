import Employee from '../models/employee.js';
import validator from 'validator';

//renders sign-in page for employee
export const SignInPage = async function (req, res) {
    return res.render('signIn', {
        title: "SignIn"
    });
}

// renders dashboard page after user Authentication
export const SignIn = async function (req, res) {
    try {
        req.flash('success', 'Sign In SuccessFully');
        return res.redirect('/employee/dashboard');
    } catch (error) {
        return res.send('<h1>Error in SignIn</h1>');
    }
}
// renders sign up page for employee
export const createSessionPage = async function (req, res) {
    return res.render('signUp', {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: ""
    });
}

// it creayes session after click on login button
export const createUserCredentials = async function (req, res) {
    try {
        // checks for firsh name ,it should not be null
        if (req.body.firstname.length === 0) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: 'FirstName cannot blank',
                lastNameError: "",
                emailError: "",
                passwordError: ""
            });
        }
        if (!isNaN(req.body.firstname)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: 'FirstName is not number',
                lastNameError: "",
                emailError: "",
                passwordError: ""
            });
        }
        // checks for lastname
        if (req.body.lastname.length === 0) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: 'LastName is not empty',
                emailError: "",
                passwordError: ""
            });
        }
        // last name should not be null and number
        if (!isNaN(req.body.lastname)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: 'LastName is not number',
                emailError: "",
                passwordError: ""
            });
        }
        // validate on email whether correct or not
        if (!validator.isEmail(req.body.email)) {
            req.flash('error', '');
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: "",
                emailError: 'Please Enter Valid Email'
            });
        } else if (req.body.password.length < 2) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: "",
                emailError: "",
                passwordError: 'Password is Small !!'
            });
        } else {
            const employeePresent = await Employee.findOne({ email: req.body.email });
            // checks in database collection whether entered Email already present 
            if (employeePresent) {
                //if email already present redirect to sign-in page
                req.flash('error', 'Employee Already Exist !!');
                return res.redirect('/');
            } else {
                // if not present in database it creates user credentials in Database
                const registerEmployee = await Employee(req.body);
                registerEmployee.save();
                req.flash('success', 'Sign Up SuccessFully !!');
                // then redirect to login page
                return res.redirect('/');
            }
        }
    } catch (error) {
        return res.send("<h1>Error in SignUp</h1>");
    }


}

// to sign out
export const SignOut = async function (req, res) {
    req.logout(function(err) {
        if (err) {
          console.error(err);
        }
        req.flash('success', 'Sign Out SuccessFully');
        return res.redirect('/');
      });
    
}