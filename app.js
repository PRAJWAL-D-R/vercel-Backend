import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// CORS configuration (update with your frontend URL for production)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies 
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

// Test route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
