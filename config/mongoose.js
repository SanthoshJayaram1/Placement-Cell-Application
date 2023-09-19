import mongoose from "mongoose";
import dotenv from "dotenv";

// env config and env variables
dotenv.config();
const url = process.env.URI;

// setting mongoose default options
mongoose.set('strictQuery', true);

// connecting mongoose server through newly created database project URL
const connectWithDb = () => {
    try{
        // connection to mongoose
        mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log("Database connected successfully");
    }catch(err){
        // if error
        console.log("Error while comnnecting to the database",err);
    }
};

export default connectWithDb;