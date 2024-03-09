//es6 format
import mongoose from "mongoose";


//arrow function
const connectDB = async () => {
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongodb Database ${conn.connection.host}`);
    }catch(err){
        console.log(`Error in Mongodb ${err}`);
    }
}

export default connectDB;