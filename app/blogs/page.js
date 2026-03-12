"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blogs from the API when the page loads
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        
        const data = await res.json();
        // Only show blogs that are marked as "Published"
        const publishedBlogs = data.blogs.filter(blog => blog.status === "Published");
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format the date to match the picture (e.g., "September 5, 2025")
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper function to truncate long descriptions
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

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
          <h1 className="text-5xl font-bold mt-15">Blogs</h1>
          <div className="mt-3 text-lg">
           <span className="opacity-80 cursor-pointer">
           <a href="/" className="hover:text-amber-300">
              Home
            </a>
            </span>
            <span className="mx-2">{'>'}</span>
            <span className="text-amber-300" href="/blogs">
            Blogs
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Blog Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Intro Text */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Industry Insights & Practical Tips
          </h2>
          <p className="text-slate-600 text-lg">
            Stay updated with the latest trends in scaffolding, shuttering, and construction technology. 
            Read our expert guides, safety protocols, and industry analyses to ensure your projects are built on a solid foundation.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f4b63f]"></div>
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-700">No published blogs yet.</h3>
            <p className="text-slate-500 mt-2">Check back soon for new articles!</p>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogs.map((blog) => (
              <article key={blog._id} className="bg-[#f8f9fa] border border-gray-200 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                
                {/* Blog Image */}
                <div className="h-60 w-full overflow-hidden bg-gray-200">
                  {blog.featuredImage ? (
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  
                  {/* Meta Info (Author & Date) */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
                    <div className="flex items-center gap-1.5">
                      <User size={16} className="text-[#f4b63f]" />
                      <span>By Admin</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-[#f4b63f]" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    <Link href={`/blogs/${blog.slug}`} className="hover:text-[#f4b63f] transition-colors">
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                    {truncateText(blog.content, 120)}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto">
                    <Link 
                      href={`/blogs/${blog.slug}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#f4b63f] transition-colors group uppercase tracking-wide"
                    >
                      Read More
                      <ArrowRight size={18} className="text-[#f4b63f] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* 3. Pagination Section (Visual matching the picture) */}
        {!isLoading && blogs.length > 0 && (
          <div className="flex justify-center items-center gap-2 pt-8">
            <button className="px-4 py-2 text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
              Prev
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-slate-200 text-slate-800 border border-slate-300">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
              3
            </button>
            <span className="px-2 text-slate-500">...</span>
            <button className="px-4 py-2 text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        )}

      </section>
    </div>
  );
}