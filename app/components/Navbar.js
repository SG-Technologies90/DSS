"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQueryOpen, setIsQueryOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitMessage("Query submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          setIsQueryOpen(false);
          setSubmitMessage("");
        }, 3000);
      } else {
        setSubmitMessage("Failed to submit query. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black"
          }`}
      >
        {/* TOP INFO BAR */}
        <div
          className={`w-full bg-amber-500 text-black py-2 px-6 text-sm flex justify-center sm:justify-end items-center font-medium transition-all duration-300 ${isScrolled ? "hidden" : "flex"
            }`}
        >
          <div className="flex gap-4 sm:gap-6 items-center">
            <a href="tel:+919813302676" className="flex items-center gap-2 hover:text-white transition">
              <span>📞</span> +91 9813302676, +91 8708278902
            </a>
            <a href="mailto:dssshuttering@gmail.com" className="hidden sm:flex items-center gap-2 hover:text-white transition">
              <span>✉️</span> dssshuttering@gmail.com
            </a>
          </div>
        </div>

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

            <button
              onClick={() => setIsQueryOpen(true)}
              className="group flex items-center relative"
            >
              <div className="bg-amber-600 text-white w-10 h-10 flex items-center justify-center rounded-full z-10 shadow-md transition-transform group-hover:scale-105">
                <Mail size={18} />
              </div>
              <div className="bg-amber-500 text-black h-9 flex items-center pr-5 pl-7 -ml-5 rounded-r-md font-bold shadow-sm transition-colors group-hover:bg-amber-400">
                Query Now
              </div>
            </button>
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
            <button
              onClick={() => {
                setIsQueryOpen(true);
                setMenuOpen(false);
              }}
              className="group flex items-center relative mt-2"
            >
              <div className="bg-amber-600 text-white w-10 h-10 flex items-center justify-center rounded-full z-10 shadow-md transition-transform group-hover:scale-105">
                <Mail size={18} />
              </div>
              <div className="bg-amber-500 text-black h-9 flex items-center pr-5 pl-7 -ml-5 rounded-r-md font-bold shadow-sm transition-colors group-hover:bg-amber-400">
                Query Now
              </div>
            </button>
          </div>
        )}
      </header>

      {/* QUERY MODAL */}
      {isQueryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white text-black p-8 rounded-lg max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setIsQueryOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Submit a Query</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Query / Requirements" rows="4" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required></textarea>
              <button type="submit" disabled={isSubmitting} className="bg-amber-500 text-black font-bold py-3 rounded hover:bg-amber-600 transition mt-2 disabled:bg-amber-300 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : "Submit Query"}
              </button>
              {submitMessage && (
                <p className={`text-center text-sm font-semibold mt-2 ${submitMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}