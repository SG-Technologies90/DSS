import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "../../../lib/db"; 
import Blog from "../../../models/Blog";     

// Server Component for excellent SEO
export default async function SingleBlogPage({ params }) {
  // Await the slug from the URL parameters
  const { slug } = await params;

  // Connect to the database and find the specific blog post
  await connectDB();
  const blog = await Blog.findOne({ slug: slug, status: "Published" });

  // Redirect to 404 if the blog doesn't exist
  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      
      <section
        className="relative h-[400px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('img_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* center content */}
        <div className="relative text-center">
          <h1 className="text-5xl font-bold mt-15">Blog</h1>
          <div className="mt-3 text-lg">
           <span className="opacity-80 cursor-pointer">
           <a href="/" className="hover:text-amber-300">
              Home
            </a>
            </span>
            <span className="mx-2">{'>'}</span>
            <span className="text-amber-300" href="/blogs">
            Blog
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Article Content (Matches your second image) */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="w-full mb-12">
            <img 
              src={blog.featuredImage} 
              alt={blog.title} 
              className="w-full h-auto object-cover border border-slate-200 shadow-sm"
            />
          </div>
        )}

        {/* Blog Text Content */}
        {/* whitespace-pre-wrap ensures your standard textarea spacing and line breaks are preserved */}
        <div className="prose prose-lg md:prose-xl max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-indigo-600">
          {blog.content}
        </div>

        {/* Optional: Tags Section at the bottom */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Related Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}