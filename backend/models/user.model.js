import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 6, },
    email: { type: String, require: true, unique: true },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;