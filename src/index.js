import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { config } from "dotenv";

const app = express();
config();
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
mongoose.connect(
  "mongodb+srv://ankit:Admin123@recipes.7frcpxz.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(process.env.PORT || 3002, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
