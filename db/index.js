import mongoose from "mongoose";
const connectDB = async () => {
    try{
        const conn= await mongoose.connect('mongodb+srv://siddhartha:sidd12345@cluster0.34y4yjt.mongodb.net/impulse');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log('Error Connecting to MongoDB',err);
        process.exit(1);
    }
}

export default connectDB