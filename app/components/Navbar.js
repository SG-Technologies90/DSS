"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/10 backdrop-blur-md" : "bg-black"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img src="/DSS Logo.png" alt="Logo" className="h-10" />
          <span className="text-white font-bold text-xl hidden sm:block">
            DECENT SHUTTERING SOLUTION
          </span>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-10 text-white font-medium mr-6">
          <Link href="/" className="hover:text-amber-300 transition">Home</Link>
          <Link href="/about" className="hover:text-amber-300 transition">About</Link>
          <Link href="/our-product" className="hover:text-amber-300 transition">Our Products</Link>
          <Link href="/gallery" className="hover:text-amber-300 transition">Our Gallery</Link>
          <Link href="/blogs" className="hover:text-amber-300 transition">Blogs</Link>
          <Link href="/contact" className="hover:text-amber-300 transition">Contact Us</Link>
        </nav>

        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center gap-6 py-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/our-product" onClick={() => setMenuOpen(false)}>Our Products</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Our Gallery</Link>
          <Link href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
}