import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db"; 
import Blog from "../../../models/Blog";

export async function POST(req) {
  try {
    // 1. Receive the data from the frontend fetch call
    const body = await req.json();
    
    // 2. Connect to MongoDB
    await connectDB();

    // 3. Create the new blog post in the database
    const newBlog = await Blog.create({
      title: body.title,
      slug: body.slug,
      content: body.content,
      category: body.category,
      tags: body.tags,
      featuredImage: body.featuredImage, 
      status: body.status
    });

    // 4. Send success back to the frontend
    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: error.message || "Failed to create blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Fetch all blogs from the database and sort by newest first
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    // 3. Send the blogs back to the frontend
    return NextResponse.json({ blogs }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}