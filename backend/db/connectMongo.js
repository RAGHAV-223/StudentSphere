import mongoose from "mongoose";

const connectMongo = async () => {
   if (mongoose.connection.readyState === 1) {
    console.log("🔄 MongoDB already connected!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Exit if unable to connect
  }
}

export default connectMongo
