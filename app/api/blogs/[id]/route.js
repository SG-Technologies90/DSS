import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db"; // Adjust path depending on your folder structure
import Blog from "../../../../models/Blog";     // Adjust path depending on your folder structure

// 1. GET: Fetch a single blog by its ID (Useful if you want to load data into an Edit Form)
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 2. PUT: Update an existing blog (For your Edit button)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await connectDB();

    // Find the blog by ID and update it with the new data from the body
    // { new: true } tells Mongoose to return the updated document, not the old one
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { 
      new: true,
      runValidators: true // Ensures the new data still matches your Schema rules
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: error.message || "Failed to update blog" }, { status: 500 });
  }
}

// 3. DELETE: Remove a blog (For your Trash Can button)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}