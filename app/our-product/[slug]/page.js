import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Import the static array we created in the main products page
import { productList } from "../page"; 

export default async function SingleProductPage({ params }) {
  // Await params in modern Next.js 15+
  const { slug } = await params;

  // Search the array for the product that matches the URL slug
  const product = productList.find((p) => p.slug === slug);

  // If someone types an invalid slug in the URL, show 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      
      {/* Hero Header with dark overlay */}
      <section className="relative h-[300px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/img_1.jpg')", // Used the same background as the main page
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mt-10">{product.title}</h1>
          <div className="mt-3 text-lg font-medium">
            <Link href="/" className="hover:text-amber-300 transition-colors opacity-80">Home</Link>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <Link href="/our-product" className="hover:text-amber-300 transition-colors opacity-80">Our Products</Link>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-amber-400">{product.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Back Button */}
        <Link 
          href="/our-product" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#fbbc04] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to all products
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Product Overview
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{product.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Extra static details block to make the page look full */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Key Benefits:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                  <li>High durability and structural integrity</li>
                  <li>Manufactured to strict industry standards</li>
                  <li>Cost-effective for large scale projects</li>
                  <li>Easy integration with existing scaffolding systems</li>
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-200">
                <Link href="/contact">
                  <button className="bg-[#fbbc04] text-black font-bold uppercase tracking-wider px-8 py-4 rounded hover:bg-yellow-500 transition-colors shadow-md w-full sm:w-auto">
                    Inquire About This Product
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}