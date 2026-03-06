"use client";
import Link from "next/link";
export default function Navbar() {

  return (
    <header className="fixed top-0 w-full z-50 bg-black shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => (window.location.href = "/")}>
          <img src="/DSS Logo.png" alt="Logo" className="h-10" />
          <span className="text-white font-bold text-xl">DECENT SHUTTERING SOLUTION</span>
        </div>

        {/* --- DESKTOP NAVIGATION (Unchanged) --- */}
        <nav className="hidden md:flex items-center gap-10 text-white font-medium mr-6">
          <Link href="/" >Home</Link>
          <Link href="/about">About</Link>
          <Link href="/our-product" className="flex items-center gap-1 hover:text-cyan-400 transition"> Our Products</Link>
          <Link href="/gallery">Our Gallery</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}