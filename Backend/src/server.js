import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Update CORS to allow the Vercel front-end and localhost for development
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://your-vercel-app.vercel.app"]
}));

// Serve static files (optional)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/foods", foodRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
