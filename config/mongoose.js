import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.URI;
mongoose.set('strictQuery', true);
const connectWithDb = () => {
    try{
        mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log("Database connected successfully");
    }catch(err){
        console.log("Error while comnnecting to the database",err);
    }
};

export default connectWithDb;