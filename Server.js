import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/api.js";
const app = express();
const port = process.env.PORT || 9000;

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/v1', router)

app.listen(port, () => console.log(`Connected on port ${port}`));
