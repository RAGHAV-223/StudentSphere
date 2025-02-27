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
import mongoose from 'mongoose';


// Configure dotenv
dotenv.config({path: `../.env`});


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.CLIENT_URL,// Frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser());

// Middleware to log API requests
app.use((req, res, next) => {
    console.log(`🔹 ${req.method} ${req.url} ${req.baseUrl}`);
    
    if (Object.keys(req.query).length) {
        console.log(`   📌 Query Params:`, req.query);
    }

    if (Object.keys(req.body).length) {
        console.log(`   📝 Body:`, req.body);
    }

    next(); // Move to the next middleware/route
});
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
// console.log("MongoDB URL:", process.env.MONGO_DB_URL);
connectMongo().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
        console.log("🛑 Shutting down server...");
        await mongoose.connection.close();
        console.log("✅ MongoDB connection closed.");
        process.exit(0);
      });
    
      process.on("SIGTERM", async () => {
        console.log("🛑 Server terminated...");
        await mongoose.connection.close();
        console.log("✅ MongoDB connection closed.");
        process.exit(0);
      });
  });


