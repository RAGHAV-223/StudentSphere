import mongoose from "mongoose";

const connectMongo = async () => {
   if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
       serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

export default connectMongo
