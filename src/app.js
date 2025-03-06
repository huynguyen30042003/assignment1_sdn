import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import quizRouter from "./router/quizRouter.js";
import questionRouter from "./router/questionRouter.js";
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB
connectDB(process.env.DB_URI);


app.use("/api/quizzes",quizRouter)
app.use("/api/question",questionRouter)
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
