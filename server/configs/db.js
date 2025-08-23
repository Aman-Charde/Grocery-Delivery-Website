import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/GroceryDeliveryWebsite`)
    } catch {
        console.error(error.message);   
    }
}

export default connectDB;