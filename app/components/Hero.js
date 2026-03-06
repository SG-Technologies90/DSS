"use client";

import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <video
                autoPlay
                muted
                loop
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/bgi.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

                <div className="mb-6">
                    <Image src="/DSS Logo.png" alt="DSS Logo" width={100} height={100} className="mx-auto" />
                </div>
                <h1 className="text-8xl font-extrabold uppercase tracking-widest bg-linear-to-r from-yellow-500 via-white to-gray-600 bg-clip-text text-transparent animate-shine">
                    DECENT SHUTTERING SOLUTION
                </h1>
                <p className="max-w-3xl text-base sm:text-lg md:text-xl text-gray-300 mt-10">
                   Decent Shuttering Solution is a reliable provider of construction shuttering and scaffolding solutions, supporting residential, commercial, and infrastructure projects.
                </p>

            </div>
        </section>
    );
}