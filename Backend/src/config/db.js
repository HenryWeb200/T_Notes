import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to DataBase Successfully!");
    } catch (error) {
        console.error("Error connecting to database??", (error));
        process.exit(1)
    }
}