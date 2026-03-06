
"use client";

import Link from "next/link";

export default function About() {
  return (
    <section className="py-40 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-2xl font-extrabold text-yellow-500 uppercase mb-4">
            About Us
          </h2>
          <h3 className="text-5xl font-semibold text-black mb-8">
            Welcome To <span className="text-yellow-600">DSS</span> - Your Scaffolding Solutions Partner
          </h3>
        </div>

        <div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4 mt-12">
           At Decent Shuttering Solution, we specialize in providing high-quality shuttering material, scaffolding solutions, and construction support systems for every range of building projects. Our objective is to assist contractors, builders, and developers with reliable shuttering solutions that ensure strength, accuracy, and durability in concrete structures.
           We understand the technical and operational challenges of construction work.<br/>
           Our team works closely with clients to deliver cost-effective shuttering and scaffolding solutions, focusing on material quality, safety compliance, and timely availability. Every project is handled with attention to detail, ensuring consistent performance at the construction site.
           Through transparent working practices and a commitment to continuous improvement, Decent Shuttering Solution has earned the trust of professionals across the construction industry. Our solutions contribute to efficient project execution, reduced material wastage, and improved structural outcomes.

          </p>

          <div className="flex space-x-4">
            <Link href="/about">
              <button className="bg-yellow-500 text-white px-6 py-3 font-semibold rounded-md shadow hover:bg-yellow-600 transition cursor-pointer">
                Learn More +
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white border border-gray-300 px-6 py-3 font-semibold rounded-md shadow hover:bg-gray-100 transition cursor-pointer">
                Contact Us
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}