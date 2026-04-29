"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  PenTool,
  LogOut,
  Image as ImageIcon,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditBlogDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Get the blog ID from the URL
  const fileInputRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Form State Variables
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // 1. Fetch Existing Blog Data on Load
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          const blog = data.blog;

          // Pre-fill the form with the fetched data
          setTitle(blog.title);
          setSlug(blog.slug);
          setContent(blog.content);
          setCategory(blog.category);
          setTags(blog.tags.join(", ")); // Convert array back to comma-separated string
          setFeaturedImage(blog.featuredImage);
        } else {
          alert("Failed to fetch blog data.");
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id, router]);

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Handle API Call to UPDATE Data (PUT Request)
  const handleSave = async (status) => {
    if (!title || !slug || !content) {
      alert("Please fill in the title, slug, and content.");
      return;
    }

    setIsLoading(true);

    const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    const payload = {
      title,
      slug,
      content,
      category,
      tags: tagsArray,
      featuredImage,
      status,
    };

    try {
      // Use PUT method and target the specific ID
      const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`Blog ${status === "Published" ? "updated and published" : "saved as draft"} successfully!`);
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update blog");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/logout`, { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center text-black">Loading editor...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans mt-30">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <span className="text-xl font-bold text-black">AdminPanel</span>
          <button className="lg:hidden text-black" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-black rounded-lg hover:bg-slate-200 hover:text-indigo-600 transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/add-blog" className="flex items-center gap-3 px-4 py-3 text-black rounded-lg hover:bg-slate-200 hover:text-indigo-600 transition-colors">
            <PenTool size={20} />
            <span className="font-medium">Write Blog</span>
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 text-black rounded-lg hover:bg-slate-200 hover:text-indigo-600 transition-colors">
            <PenTool size={20} />
            <span className="font-medium">Gellary</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-black rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-black hover:text-gray-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-black">Edit Post</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSave("Draft")}
              disabled={isLoading}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-black bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave("Published")}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </header>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Main Editor */}
            <div className="lg:col-span-2 space-y-6">

              {/* Title Input */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post Title..."
                  className="w-full text-3xl font-bold text-black placeholder:text-gray-400 border-none outline-none focus:ring-0 bg-transparent"
                />
              </div>

              {/* Text Area for Description */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[400px] p-6 border-none outline-none focus:ring-0 text-black resize-none"
                  placeholder="Write your blog post description here..."
                ></textarea>
              </div>

              {/* BIG SUBMIT BUTTON AT THE BOTTOM */}
              <div className="pt-2">
                <button
                  onClick={() => handleSave("Published")}
                  disabled={isLoading}
                  className="w-full py-4 text-lg font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Updating in Database..." : "Update Blog Post"}
                </button>
              </div>

            </div>

            {/* Right Column: Post Settings */}
            <div className="space-y-6">

              {/* Featured Image Card with Click-to-Upload */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-semibold text-black mb-4">Featured Image</h3>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />

                <div
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-slate-300 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-colors overflow-hidden min-h-[160px]"
                >
                  {featuredImage ? (
                    <img src={featuredImage} alt="Preview" className="w-full h-auto object-cover rounded-md" />
                  ) : (
                    <>
                      <ImageIcon className="text-black mb-3" size={32} />
                      <p className="text-sm font-medium text-black">Click to upload image</p>
                      <p className="text-xs text-black mt-1">SVG, PNG, JPG or GIF</p>
                    </>
                  )}
                </div>
                {featuredImage && (
                  <button
                    onClick={() => setFeaturedImage(null)}
                    className="mt-2 w-full text-xs text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Post Details Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-semibold text-black mb-2">Post Settings</h3>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="my-awesome-post"
                    className="w-full px-3 py-2 text-sm text-black border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-black border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="React, Next.js, Frontend"
                    className="w-full px-3 py-2 text-sm text-black border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}