"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryCarousel() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/gallery");
                const data = await res.json();
                if (data.success && data.data) {
                    setImages(data.data);
                }
            } catch (error) {
                console.error("Error fetching gallery images:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000); // changes slide every 4 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (images.length === 0) return null;

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Work</h2>
                    <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="relative group rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[500px]">
                    <div
                        className="flex transition-transform duration-700 ease-out h-full"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((img) => (
                            <div key={img._id} className="w-full flex-shrink-0 h-full relative">
                                <img
                                    src={img.imageUrl}
                                    alt="Gallery Image"
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle gradient overlay to make images pop */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={24} />
                    </button>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-amber-400 scale-125 shadow-md" : "bg-white/50 hover:bg-white/90"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}