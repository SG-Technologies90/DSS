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
          <Link href="/" className="flex items-center gap-1 hover:text-amber-300 transition">Home</Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-amber-300 transition">About</Link>
          <Link href="/our-product" className="flex items-center gap-1 hover:text-amber-300 transition"> Our Products</Link>
          <Link href="/gallery" className="flex items-center gap-1 hover:text-amber-300 transition">Our Gallery</Link>
          <Link href="/blogs" className="flex items-center gap-1 hover:text-amber-300 transition">Blogs</Link>
          <Link href="/contact" className="flex items-center gap-1 hover:text-amber-300 transition">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}