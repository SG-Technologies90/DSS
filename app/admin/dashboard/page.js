"use client";

import React, { useState, useEffect } from "react";
import {
    LayoutDashboard,
    PenTool,
    LogOut,
    Menu,
    X,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardList() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch blogs on load
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/blogs`);
                if (!res.ok) throw new Error("Failed to fetch blogs");

                const data = await res.json();
                setBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // NEW: Delete Handler
    const handleDelete = async (blogId) => {
        // 1. Show a confirmation popup so you don't delete by accident
        const isConfirmed = window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.");

        if (!isConfirmed) return;

        try {
            // 2. Call the DELETE API we just created
            const res = await fetch(`${baseUrl}/api/blogs/${blogId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // 3. Remove the deleted blog from the screen instantly
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
                alert("Blog deleted successfully!");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Something went wrong while deleting.");
        }
    };

    // Logout Handler
    const handleLogout = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/logout`, {
                method: "POST",
            });

            if (res.ok) {
                router.push("/login");
                router.refresh();
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // Date Formatter
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* ... (Keep your Sidebar and Header exactly as they are) ... */}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
                    <span className="text-xl font-bold text-black">AdminPanel</span>
                    <button className="lg:hidden text-black" onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/add-blog" className="flex items-center gap-3 px-4 py-3 text-black rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                        <PenTool size={20} />
                        <span className="font-medium">Write Blog</span>
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-black rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
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
                        <h1 className="text-xl font-semibold text-black">Manage Posts</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/add-blog"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Add New Post</span>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Search and Filter Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="relative w-full sm:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    className="w-full pl-10 pr-4 py-2 text-sm text-black placeholder:text-gray-500 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Blog Posts Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-black">
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-black">Loading posts...</td>
                                            </tr>
                                        ) : blogs.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-black">No posts found.</td>
                                            </tr>
                                        ) : (
                                            blogs.map((blog) => (
                                                <tr key={blog._id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-semibold text-black">{blog.title}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-black">{blog.category}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                            {blog.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-black">
                                                        {formatDate(blog.createdAt)}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => router.push(`/admin/edit-blog/${blog._id}`)}
                                                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                                title="Edit Post"
                                                            >
                                                                <Edit size={18} />
                                                            </button>

                                                            {/* UPDATED: Attach handleDelete to the Trash button */}
                                                            <button
                                                                onClick={() => handleDelete(blog._id)}
                                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete Post"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}