import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "../../../lib/db";
import Blog from "../../../models/Blog";


// ---------- SEO METADATA ----------
export async function generateMetadata({ params }) {

  const { slug } = await params;

  await connectDB();
  const blog = await Blog.findOne({ slug: slug, status: "Published" });

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const url = `https://yourdomain.com/blog/${slug}`;

  return {
    title: blog.metaTitle || blog.title +" | DSS",
    description:
      blog.metaDescription ||
      blog.excerpt ||
      blog.content?.slice(0, 150),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: url,
      type: "article",
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.featuredImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}



// ---------- PAGE COMPONENT ----------
export default async function SingleBlogPage({ params }) {

  const { slug } = await params;

  await connectDB();
  const blog = await Blog.findOne({ slug: slug, status: "Published" });

  if (!blog) {
    notFound();
  }

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.featuredImage,
    author: {
      "@type": "Organization",
      name: "Your Company Name",
    },
    publisher: {
      "@type": "Organization",
      name: "Your Company Name",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png",
      },
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO SECTION */}
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
          <h1 className="text-5xl font-bold mt-15">Blog</h1>

          <div className="mt-3 text-lg">

            <Link href="/" className="opacity-80 hover:text-amber-300">
              Home
            </Link>

            <span className="mx-2">{">"}</span>

            <Link href="/blogs" className="text-amber-300">
              Blog
            </Link>

          </div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

        {/* FEATURED IMAGE */}
        {blog.featuredImage && (
          <div className="w-full mb-12">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-auto object-cover border border-slate-200 shadow-sm"
            />
          </div>
        )}

        {/* BLOG TEXT */}
        <div className="prose prose-lg md:prose-xl max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-indigo-600">
          {blog.content}
        </div>

        {/* TAGS */}
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