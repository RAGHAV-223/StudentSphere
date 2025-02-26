import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import threadRoutes from './routes/thread.routes.js';
import connectMongo from './db/connectMongo.js';
import projectRoutes from './routes/projectspace.routes.js'

// Configure dotenv
dotenv.config({path: `../.env`});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["https://student-sphere-frontend.vercel.app", "http://localhost:5173"];
const corsOptions = {
    origin: "http://localhost:5173",// Frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser());

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Hello from Server!" });
});
app.use('/api/auth', authRoutes);
app.use('/api/auth-ed/forums', threadRoutes);
app.use('/api/auth-ed/user/project-space', projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(500).send('Something broke!');
});

// Start the server and connect to MongoDB
app.listen(PORT, () => {
    console.log("MongoDB URL:", process.env.MONGO_DB_URL);
    connectMongo();
    console.log(`Server is running on port ${PORT}`);
});
