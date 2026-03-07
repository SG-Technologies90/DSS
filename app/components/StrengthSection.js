"use client";

import Image from "next/image";
import { useState } from "react";

export default function StrengthSection() {

    const [hover, setHover] = useState(false);

    return (
        <section className="py-24 bg-gray-100">
            <style>
                {`
          @keyframes dashMove {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -120; }
          }
        `}
            </style>
            <div className="max-w-7xl mx-auto flex items-center gap-20 px-6">
                <div className="relative w-[420px] h-[420px]">

                    {/* Moving Dash Border */}
                    <svg className="absolute -top-4 -left-4 pointer-events-none" width="460" height="460">
                        <rect
                            x="5"
                            y="5"
                            width="450"
                            height="450"
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
                        <Image src="/strength.jpg" alt="strength" fill className="object-cover transition-transform duration-700"
                            style={{transform: hover ? "scale(1.15)" : "scale(1)",}}
                        />
                    </div>
                    <div className="absolute -right-10 top-20 w-[150px] h-[150px] bg-gray-100 rounded-full flex flex-col items-center justify-center">
                        <h3 className="text-lg font-bold text-amber-400">17+</h3>
                        <p className="text-lg text-center leading-tight">
                            Years of <br /> Experience
                        </p>
                    </div>
                </div>

                <div className="max-w-xl ml-20">
                    <span className="text-lg tracking-[3px] text-amber-400 font-semibold">
                        DECENT SHUTTERING SOLUTION
                    </span>
                    <h2 className="text-5xl font-extrabold mt-2 mb-6">
                        Strength
                    </h2>
                    <p className="text-gray-600 leading-7 mb-5">
                       The company focuses on delivering strong, safe, and durable shuttering materials that help achieve accurate concrete structures and smooth construction execution.
                       
                    </p>
                    <p className="text-gray-600 leading-7 mb-6">
                        With a clear understanding of modern construction requirements, Decent Shuttering Solution offers dependable shuttering systems that improve work efficiency, structural strength, and on-site safety. By following industry standards and quality practices, the company supports builders and contractors in completing projects on time and with precision.
                    </p>
                    <button className="bg-amber-300 hover:bg-amber-500 px-7 py-3 font-semibold transition">
                        CONTACT US +
                    </button>
                </div>
            </div>
        </section>
    );
}