import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Database connected!"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default connectToDatabase;
