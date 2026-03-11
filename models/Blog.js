import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this blog."],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug (URL)."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide the blog content."],
    },
    featuredImage: {
      type: String, 
      required: false,
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);