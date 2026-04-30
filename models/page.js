"use client";

import React, { useState, useEffect } from 'react';

export default function AdminGallery() {
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/gallery`);
            const data = await res.json();
            if (data.success) {
                setImages(data.data);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!imageUrl) return alert("Please enter an image URL");
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/gallery`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl }),
            });
            const data = await res.json();
            if (data.success) {
                setImageUrl("");
                fetchImages();
            } else {
                alert(data.message || "Failed to add image");
            }
        } catch (error) {
            console.error("Error adding image:", error);
            alert("Error adding image");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        try {
            const res = await fetch(`${baseUrl}/api/gallery/${id}`, { method: "DELETE" });
            const data = await res.json();
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
        <div className="max-w-6xl mx-auto py-32 px-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-amber-500">Manage Gallery</h1>

            <form onSubmit={handleAdd} className="mb-12 bg-white p-6 rounded shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Image</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Enter Image URL (e.g., /img_1.jpg or https://...)" className="flex-1 border text-black border-gray-300 p-3 rounded focus:outline-none focus:border-amber-500" required />
                    <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded transition disabled:opacity-50">
                        {loading ? "Adding..." : "Add Image"}
                    </button>
                </div>
            </form>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Gallery Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img._id} className="relative group rounded overflow-hidden border border-gray-200 bg-gray-100 h-48">
                        <img src={img.imageUrl} alt="gallery" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <button onClick={() => handleDelete(img._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition">Delete</button>
                        </div>
                    </div>
                ))}
                {images.length === 0 && <p className="text-gray-500 col-span-full">No images found. Please add some above.</p>}
            </div>
        </div>
    );
}