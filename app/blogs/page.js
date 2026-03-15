import React from "react";
import Link from "next/link";
import { User, Clock, ArrowRight } from "lucide-react";
import { connectDB } from "../../lib/db";
import Blog from "../../models/Blog";

export const metadata = {
  title: "Blogs | DSS",
  description:
    "Read our latest blogs and expert insights about construction and scaffolding.",

  alternates: {
    canonical: "https://yourdomain.com/blogs",
  },

  openGraph: {
    title: "Blogs | DSS",
    description:
      "Read our latest blogs and expert insights about construction and scaffolding.",
    url: "https://yourdomain.com/blogs",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/img_1.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function BlogPage() {

  await connectDB();

  const blogs = await Blog.find({ status: "Published" })
    .sort({ createdAt: -1 })
    .lean();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <section
        className="relative h-100 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/img_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center">
          <h1 className="text-5xl font-bold mt-15">Blogs</h1>

          <div className="mt-3 text-lg">
            <Link href="/" className="hover:text-amber-300">
              Home
            </Link>
            <span className="mx-2">{">"}</span>
            <span className="text-amber-300">
              Blogs
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4">
            Industry Insights & Practical Tips
          </h2>

          <p className="text-slate-600 text-lg">
            Stay updated with the latest trends in scaffolding and construction.
          </p>
        </div>
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-700">
              No published blogs yet.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-[#f8f9fa] border border-gray-200 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-60 w-full overflow-hidden bg-gray-200">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    /> ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">

                  <div className="flex items-center gap-4 text-sm text-amber-400 mb-4">

                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>Admin</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    <Link href={`/blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-6 flex-1">
                    {truncateText(blog.content, 120)}
                  </p>
                  <Link href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#f4b63f]"
                  >
                    Read More
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}