import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";

// Configure environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// Database config
connectDB();

// Define route handler for the root route
app.get("/", (req, res) => {
  res.send("<h1 style='bgcolor:yellow'>Welcome to the ecommerce website</h1>");
});

// Set the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} on port ${PORT}`.cyan
  );
});
