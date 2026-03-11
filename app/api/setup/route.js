import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db"; 
import User from "../../../models/User";

export async function GET() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      return NextResponse.json({ message: "Admin user already exists!" });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Create the user in MongoDB
    await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Admin created successfully! You can now log in." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}