import mongoose from "mongoose";

const connectToDb = async () => {
    try {
       const connection = await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Successfully connected to the MongoDB!");
       })   
    } catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}

export default connectToDb;