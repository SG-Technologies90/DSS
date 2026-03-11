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
      
      {/* 1. Hero Banner Section (Matches your first image) */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            // Generic scaffolding background, you can swap this with your actual background
            backgroundImage: "url('https://images.unsplash.com/photo-1541888088325-1ce11667e4e0?q=80&w=2000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        {/* Hero Content: Title and Breadcrumbs */}
        <div className="relative z-10 text-white px-4 max-w-5xl mx-auto mt-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight md:leading-snug">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-400">&gt;</span>
            <Link href="/blogs" className="hover:text-white transition-colors">Our Blog</Link>
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