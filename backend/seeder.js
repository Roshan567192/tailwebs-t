import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const users = [
      {
        name: "John Teacher",
        email: "teacher567@gmail.com",
        password: bcrypt.hashSync("teacher123", 10),
        role: "teacher",
      },
      {
        name: "Alice Student",
        email: "student567@gmail.com",
        password: bcrypt.hashSync("student123", 10),
        role: "student",
      },
    ];

    await User.insertMany(users);
    console.log("✅ Users Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedUsers();
