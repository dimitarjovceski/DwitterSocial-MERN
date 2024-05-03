import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/dbConnection.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";

dotenv.config();

connectToDb();

const app = express();

const PORT = process.env.PORT || 5000;

//Cloudinary Configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
