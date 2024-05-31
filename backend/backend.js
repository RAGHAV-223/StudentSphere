import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.routes.js"
import threadRoutes from "./routes/thread.routes.js"
import connectMongo from "./db/connectMongo.js";
// import projectRoutes from "./routes/projectspace.routes.js"

dotenv.config({ path: '../.env' })


const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:5173", // Frontend's URL
    credentials: true, // Allow cookies to be sent with requests
  };

  
  // app.get("/", (req, res) => {
    //     res.send("Project");
    // });
    
app.use(cors(corsOptions)); 
app.use(express.json()); // for requests into JSON payload
app.use(cookieParser());


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth-ed/forums", threadRoutes);
// app.use("/api/auth-ed/project-space", projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    connectMongo()
    console.log(`Server is running on port ${PORT}`)

})