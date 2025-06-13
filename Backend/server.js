// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import notesRoute from "./src/Routes/notesRoute.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:3000"
}))


app.use(express.json());

// Use the rate limiter on all routes
app.use(rateLimiter);


app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
})
