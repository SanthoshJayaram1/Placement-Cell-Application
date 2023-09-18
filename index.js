import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import flash from "connect-flash";
import session from "express-session";
import passport from "./config/passport-local-strategy.js"
import router from "./route/index.js";
import { setFlash } from "./config/flashMessage.js";
import connectWithDb from "./config/mongoose.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const {assets_path}=process.env;
const {secret_key}=process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressEjsLayouts);
app.use(express.static(assets_path));
app.use(session({
    name: 'placementCell',
    secret: secret_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(setFlash);
app.use('/', router);

app.listen(PORT || 5000, function (error) {
    if (error) {
        console.log("Error in running Server");
    }
    console.log(`Server is running on port ${PORT}`);
    connectWithDb();
});