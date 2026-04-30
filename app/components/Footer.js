import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Company Info */}
        <div>
          <h2 className="text-yellow-500 text-xl font-semibold mb-4">
            DECENT SHUTTERING SOLUTION <span className="block text-sm tracking-widest">DSS</span>
          </h2>

          <p className="text-sm leading-6">
            At Decent Shuttering Solution, our mission is to provide high-quality shuttering and formwork solutions that support safe, accurate, and efficient construction. We aim to assist builders and contractors with durable shuttering materials, timely service, and reliable construction support that meets industry standards and on-site requirements.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="bg-gray-800 p-2 rounded hover:bg-yellow-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-gray-800 p-2 rounded hover:bg-yellow-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 ml-20">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm ml-20">
            <li className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer">
              <a href="/">
                ✔ Home
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer">
              <a href="/about">
                ✔ About
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer">
              <a href="/our-product">
                ✔ Our Products
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer">
              <a href="/gallery">
                ✔ Our Gallery
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer">
              <a href="/blogs">
                ✔ Blog
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer">
              <a href="/contact">
                ✔ Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Contact Information
          </h3>

          <p className="text-sm mb-3">
            Khata No. 334/344, VPO Chandu, Opp. Sultanpur National Park, Gurugram - 122505 (Hr.)
          </p>

          <p className="text-sm">
            Call us :{" "}
            <span className="text-yellow-500 font-semibold">
              +919813302676,
              +918708278902
            </span>
          </p>

          <p className="text-sm mt-2">
            Mail us :{" "}
            <span className="text-yellow-500 font-semibold">
              dssshuttering@gmail.com
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
        2022 © DECENT SHUTTERING SOLUTION | All Rights Reserved
      </div>
    </footer>
  );
}