import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import path from "path";
import { fileURLToPath } from "url";

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration with dynamic origin handling
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        const allowedOrigins = ["http://localhost:3000", "http://localhost:1234", "https://burp-six.vercel.app/"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));

// Vercel will serve static files from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// API routes
app.use("/api/foods", foodRouter);

// Use dynamic PORT for deployment environments like Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
