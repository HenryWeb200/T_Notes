// src/middleware/rateLimiter.js
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use client IP as key for per-user rate limiting
    const key = req.ip;

    const { success } = await ratelimit.limit(key);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(); // continue without blocking request if Redis fails
  }
};

export default rateLimiter;
