import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password and Confirm Password don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(402).json({ error: "Username already exists" });
        }

        const u_email = await User.findOne({ email });
        if (u_email) {
            return res.status(403).json({ error: "Email already Registered" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email,
        });

        if (newUser) {
            const gen_token = generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                token: gen_token,
            });
        } else {
            res.status(400).json({ error: "Invalid User data, User not created" });
        }

    } catch (error) {
        console.log("Error in Signup controller: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
       const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username " });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(405).json({ error: "Invalid password" });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error("❌ Error in Login controller:", error); // Clearer error logging
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

export const logout = (req, res) => {
    try {
        // console.log("",req);
        res.cookie('jwt','', { maxAge: 0 });
        res.status(200).json({ message: "Logged out Successfully." });
    } catch (error) {
        console.log("Error in Logout controller: ", error.message);
        res.status(500).json({ error: error.message });
    }
};
