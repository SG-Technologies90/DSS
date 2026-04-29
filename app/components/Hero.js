"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bgi.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-10 min-h-screen">

        {/* Logo */}
        <div className="mb-4 sm:mb-6">
          <Image
            src="/DSS Logo.png"
            alt="DSS Logo"
            width={120}
            height={120}
            className="mx-auto w-16 sm:w-20 md:w-24 lg:w-28 h-auto"
          />
        </div>

        {/* Title */}
        <h1 className={"font-extrabold uppercase tracking-wide sm:tracking-widest  text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl bg-linear-to-r from-yellow-500 via-white to-gray-400 bg-clip-text text-transparent animate-shine leading-tight"}>

          DECENT SHUTTERING SOLUTION

        </h1>

        {/* Description */}
        <p className="mt-6 sm:mt-8 md:mt-10 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
          Decent Shuttering Solution is a reliable provider of construction shuttering and scaffolding solutions, supporting residential, commercial, and infrastructure projects.
        </p>

      </div>
    </section>
  );
}