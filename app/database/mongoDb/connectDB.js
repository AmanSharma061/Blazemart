import mongoose from "mongoose";

const connectToDatabase = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully,bgbb");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default connectToDatabase;
