
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
          <h3 className="text-5xl font-semibold text-black ">
            Welcome To <span className="text-yellow-600">DSS</span> - Your Shuttering and Scaffolding Service Provider
          </h3>
        </div>

        <div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4 mt-12">
           At Decent Shuttering Solution, we specialise in providing top quality shuttering and scaffolding
            materials on rent to meet all your construction needs. We have products, Cuplocks, Joint pins, 
            Couplers, Jacks, Mild steel pipes, Steel plates, Planks, Acrospan, Props, Channels, Steel Challi, 
            and many more. If you are looking for any kind of shuttering and scaffolding materials, we are your 
            one stop destination.
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