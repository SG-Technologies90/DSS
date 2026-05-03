"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import {
    LayoutDashboard,
    PenTool,
    LogOut,
    Image as ImageIcon,
    Menu,
    X,
    Trash2,
    ImagePlus
} from "lucide-react";

export default function AdminGallery() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/gallery`);
            if (!res.ok) {
                console.error("Failed to fetch images, server returned status:", res.status);
                return;
            }
            const data = await res.json();
            if (data.success) {
                setImages(data.data);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    // Handle image selection from PC
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Limit file size to ~5MB to prevent 'Payload Too Large' errors
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit. Please select a smaller image.");
                e.target.value = ""; // Reset input
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async () => {
        if (!selectedImage) return alert("Please select an image first");
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/gallery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: selectedImage }),
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("Non-JSON response from server:", text);
                throw new Error(`Server error (${res.status}). Please restart your Next.js server (Ctrl+C then npm run dev).`);
            }

            if (data.success) {
                setSelectedImage(null);
                fetchImages();
            } else {
                alert(data.message || "Failed to add image");
            }
        } catch (error) {
            console.error("Error adding image:", error);
            alert(error.message || "Error adding image");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        try {
            const res = await fetch(`${baseUrl}/api/gallery?id=${id}`, { method: "DELETE" });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("Non-JSON response from server:", text);
                throw new Error(`Server error (${res.status}). Please restart your Next.js server.`);
            }

            if (data.success) {
                fetchImages();
            } else {
                alert(data.message || "Failed to delete image");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans relative mt-30">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:static lg:h-screen z-[9999]`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b shrink-0 bg-indigo-50 lg:bg-white">
                    <span className="text-xl text-indigo-900 lg:text-black font-bold">AdminPanel</span>
                    <button
                        className="lg:hidden p-2 text-indigo-900 hover:bg-indigo-100 rounded-md"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                    <Link href="/admin/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-black hover:bg-slate-100 rounded-lg transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/add-blog" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-black hover:bg-slate-100 rounded-lg transition-colors">
                        <PenTool size={20} />
                        Write Blog
                    </Link>
                    <Link href="/admin/gallery" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-lg transition-colors font-medium">
                        <ImagePlus size={20} />
                        Manage Gallery
                    </Link>
                </nav>

                <div className="p-4 border-t shrink-0">
                    <button className="flex items-center gap-3 px-4 py-3 w-full font-medium text-black hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
                {/* HEADER */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-md flex items-center gap-2 border border-slate-200"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                            <span className="text-sm font-semibold">Menu</span>
                        </button>
                        <h1 className="text-lg sm:text-xl text-black font-bold truncate hidden sm:block">
                            Manage Gallery
                        </h1>
                    </div>
                    <button onClick={handleAdd} disabled={loading || !selectedImage} className="px-4 py-2 text-sm sm:text-base font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap disabled:opacity-50">
                        {loading ? "Uploading..." : "Upload Image"}
                    </button>
                </header>

                {/* SCROLLABLE PAGE CONTENT */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                        {/* LEFT COLUMN: Upload Box */}
                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm text-black font-bold mb-4">Add New Image</h3>
                                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />

                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors rounded-lg p-6 text-black cursor-pointer text-center flex flex-col items-center justify-center min-h-[200px]"
                                >
                                    {selectedImage ? (
                                        <img src={selectedImage} className="rounded-md w-full h-auto object-cover max-h-[200px]" alt="Selected" />
                                    ) : (
                                        <>
                                            <ImageIcon className="mx-auto mb-3 text-slate-400" size={32} />
                                            <span className="font-medium text-sm text-slate-700">Click to select image</span>
                                            <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP</span>
                                        </>
                                    )}
                                </div>

                                {selectedImage && (
                                    <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
                                        <button onClick={handleAdd} disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 shadow-sm">
                                            {loading ? "Uploading..." : "Upload to Gallery"}
                                        </button>
                                        <button onClick={() => setSelectedImage(null)} disabled={loading} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50">
                                            Remove Image
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Image Grid */}
                        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm text-black font-bold mb-4 flex justify-between items-center">
                                Existing Gallery Images
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs">{images.length} images</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {images.map((img) => (
                                    <div key={img._id} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-square">
                                        <img src={img.imageUrl} alt="gallery" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <button onClick={() => handleDelete(img._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2">
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {images.length === 0 && (
                                    <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
                                        <ImageIcon className="mx-auto mb-3 text-slate-300" size={32} />
                                        <p className="text-slate-500 text-sm font-medium">No images in gallery</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}