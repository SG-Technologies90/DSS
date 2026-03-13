import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <div className="font-sans bg-[#f4f5f7] min-h-screen pb-20">
            {/* --- Hero Section --- */}
            <section
                className="relative h-[400px] flex items-center justify-center text-white"
                style={{
                    backgroundImage: "url('img_1.jpg')", // Ensure this path is correct in your public folder
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* center content */}
                <div className="relative text-center z-10">
                    <h1 className="text-5xl font-bold mt-15">Contact Us</h1>
                    <div className="mt-3 text-lg font-medium">
                        <span className="opacity-80 cursor-pointer">
                            <a href="/" className="hover:text-amber-300 transition-colors">
                                Home
                            </a>
                        </span>
                        <span className="mx-2 text-gray-300">{'>'}</span>
                        <span className="text-amber-400">
                            Contact Us
                        </span>
                    </div>
                </div>
            </section>

            {/* --- Main Content Container --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                
                {/* 1. Top Info Bar */}
                <div className="bg-white shadow-sm rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0 mb-12">
                    {/* Phone */}
                    <div className="flex flex-col items-center md:items-start flex-1 md:border-r border-gray-200 md:pr-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Phone size={20} className="text-[#fbbc04]" />
                            <h3 className="font-bold text-gray-900 text-lg">Phone number</h3>
                        </div>
                        <p className="text-gray-500 text-sm ml-7">+91 9811613696</p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col items-center md:items-start flex-1 md:border-r border-gray-200 md:px-8">
                        <div className="flex items-center gap-2 mb-1">
                            <Mail size={20} className="text-[#fbbc04]" />
                            <h3 className="font-bold text-gray-900 text-lg">Email Id</h3>
                        </div>
                        <p className="text-gray-500 text-sm ml-7">info@amirsons.com</p>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col items-center md:items-start flex-1 md:pl-8">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin size={20} className="text-[#fbbc04]" />
                            <h3 className="font-bold text-gray-900 text-lg">Office Adress</h3>
                        </div>
                        <p className="text-gray-500 text-sm ml-7">A-8, A-19 Hosiery Complex, Noida Phase 2 (U.P.) -201305</p>
                    </div>
                </div>

                {/* 2. Location Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* NOIDA CARD */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Noida</h3>
                        <div className="w-full h-48 bg-gray-200 mb-6 relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112151.0506822158!2d77.30906232371912!3d28.546377317789727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                className="w-full h-full border-0" 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p><strong className="text-gray-900">Phone:</strong> +91- 9811613696 (Mr. Rajesh Singh)</p>
                            <p><strong className="text-gray-900">Email Id:</strong> info@amirsons.com</p>
                            <p><strong className="text-gray-900">Address:</strong> A-8, A-19 Hosiery Complex, Noida Phase 2 (U.P.) -201305</p>
                        </div>
                    </div>

                    {/* GURUGRAM CARD */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Gurugram</h3>
                        <div className="w-full h-48 bg-gray-200 mb-6 relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.5400589139!2d76.81304910292375!3d28.422885871221606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                className="w-full h-full border-0" 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p><strong className="text-gray-900">Phone:</strong> +91- 9911088308 (Mr. Ram Kumar)</p>
                            <p><strong className="text-gray-900">Email Id:</strong> info@amirsons.com</p>
                            <p><strong className="text-gray-900">Address:</strong> Plot No -235 , Sector-6, IMT Manesar, Gurugram - 122050 (HR)</p>
                        </div>
                    </div>

                    {/* GUJARAT CARD */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Gujarat</h3>
                        <div className="w-full h-48 bg-gray-200 mb-6 relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.783637651016!2d72.396781!3d22.994967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU5JzQxLjkiTiA3MsKwMjMnNDguNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                className="w-full h-full border-0" 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p><strong className="text-gray-900">Phone:</strong> +91- 8178720440 (Mr. Ram Avtar Jat)</p>
                            <p><strong className="text-gray-900">Email Id:</strong> info@amirsons.com</p>
                            <p><strong className="text-gray-900">Address:</strong> Plot No. 4 & 5, TIMIOS Logispace, Near MRF Tyre Godown , Paradise Park, Vasna Chacharvadi , Sarkhej - Bavla Road, Sanand Taluka, Distt. Ahmedabad, Gujarat - 382213</p>
                        </div>
                    </div>
                </div>

                {/* 3. Get In Touch Form Section */}
                <div className="bg-white shadow-sm border border-gray-200 rounded p-8 md:p-12 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-2xl">
                        We have a team of highly qualified and dexterous technocrats, professional and dedicated marketing personnel. The company has a vast client network in the Indian Market. Contact Us to know more.
                    </p>

                    <form className="space-y-4">
                        {/* Name & Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Your Name*" 
                                className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                                required
                            />
                            <input 
                                type="email" 
                                placeholder="Email*" 
                                className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                                required
                            />
                        </div>

                        {/* Phone & Product Dropdown Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="tel" 
                                placeholder="Phone*" 
                                className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                                required
                            />
                            <select 
                                className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-500 bg-white focus:outline-none focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                            >
                                <option value="">Select Product</option>
                                <option value="scaffolding">Scaffolding Equipment</option>
                                <option value="shuttering">Shuttering Material</option>
                                <option value="props">Heavy Duty Props</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Queries Textarea */}
                        <textarea 
                            placeholder="Your Queries" 
                            rows="5"
                            className="w-full border border-gray-300 rounded px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#fbbc04] focus:ring-1 focus:ring-[#fbbc04]"
                        ></textarea>

                        {/* Submit Button */}
                        <button 
                            type="button" 
                            className="bg-[#fbbc04] hover:bg-yellow-500 text-gray-900 font-bold uppercase tracking-wider text-sm px-8 py-3 rounded transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}