// backend/index.js  (replace your current file content or patch accordingly)
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import adminRouter from "./routes/admin.route.js";

// import listingRoutes from "./routes/listing.route.js"; // <--- add this

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// enable CORS for your frontend origin and allow cookies
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://your-frontend.vercel.app",
    ],
    credentials: true,
  })
);



// MongoDB connect
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// test
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// register routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter); // <--- mount listing routes
app.use("/api/admin", adminRouter);


// global error handler (keeps as-is)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

