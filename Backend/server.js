// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import notesRoute from "./src/Routes/notesRoute.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}


app.use(express.json());

// Use the rate limiter on all routes
app.use(rateLimiter);


app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
})
