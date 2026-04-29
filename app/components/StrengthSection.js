"use client";

import Image from "next/image";
import { useState } from "react";

export default function StrengthSection() {
  const [hover, setHover] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <style>
        {`@keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }`}
      </style>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6">

        {/* Image Section */}
        <div className="relative w-full max-w-105 aspect-square">

          {/* Moving Dash Border */}
          <svg className="absolute -top-4 -left-4 pointer-events-none w-[108%] h-[108%]">
            <rect
              x="5"
              y="5"
              width="98%"
              height="98%"
              fill="none"
              stroke="#facc15"
              strokeWidth="2"
              strokeDasharray="10 10"
              style={{ animation: "dashMove 3s linear infinite" }}
            />
          </svg>

          <div
            className="relative w-full h-full overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Image
              src="/strength.jpg"
              alt="strength"
              fill
              className="object-cover transition-transform duration-700"
              style={{
                transform: hover ? "scale(1.15)" : "scale(1)",
              }}
            />
          </div>

          {/* Experience Badge */}
          <div className="absolute -right-6 md:-right-10 top-12 md:top-20 w-27.5 h-27.5 md:w-38 md:h-38 bg-gray-100 rounded-full flex flex-col items-center justify-center shadow">
            <h3 className="text-base md:text-lg font-bold text-amber-400">
              17+
            </h3>
            <p className="text-xs md:text-lg text-center leading-tight">
              Years of <br /> Experience
            </p>
          </div>
        </div>

        {/* Text Section */}
        <div className="max-w-xl text-center lg:text-left lg:ml-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-2 mb-6">
            Decent Shuttering Solution <span className="text-amber-400">Strength</span>
          </h2>

          <p className="text-gray-600 leading-7 mb-5 text-sm md:text-base">
            The company focuses on delivering strong, safe, and durable shuttering materials that help achieve accurate concrete structures and smooth construction execution.
          </p>

          <p className="text-gray-600 leading-7 mb-6 text-sm md:text-base">
            With a clear understanding of modern construction requirements, Decent Shuttering Solution offers dependable shuttering systems that improve work efficiency, structural strength, and on-site safety. By following industry standards and quality practices, the company supports builders and contractors in completing projects on time and with precision.
          </p>

          <button className="bg-amber-300 hover:bg-amber-500 px-6 md:px-7 py-3 font-semibold transition">
            CONTACT US +
          </button>
        </div>
      </div>
    </section>

  );
}
