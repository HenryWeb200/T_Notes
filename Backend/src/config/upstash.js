// src/config/upstash.js
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";


dotenv.config();
const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 60 seconds
  analytics: true, // optional: allows you to view it in Upstash dashboard
});

export default ratelimit;