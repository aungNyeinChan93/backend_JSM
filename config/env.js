import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT = 4000, MONGO_URI, NODE_ENV, CookieSecret, JWT_SECRET, ARCJET_ENV, ARCJET_KEY } = process.env;

