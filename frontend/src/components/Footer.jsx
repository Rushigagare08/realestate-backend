import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-12">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-md flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l9-9 9 9M4 10v10h6V14h4v6h6V10"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white">BrickByte</span>
          </div>

          <p className="max-w-xs text-gray-400 leading-relaxed">
            Your trusted partner in finding the perfect home.  
            Connecting dreams with reality.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/buy" className="hover:text-orange-400">Buy Property</Link></li>
            <li><Link to="/sell" className="hover:text-orange-400">Sell Property</Link></li>
            <li><Link to="/about" className="hover:text-orange-400">About Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75 12.44 12.44 0 0 0 .57 1.81 1 1 0 0 1-.23 1L8.91 8.91a16.06 16.06 0 0 0 6.18 6.18l2.34-2.34a1 1 0 0 1 1-.23 12.44 12.44 0 0 0 1.81.57 1 1 0 0 1 .75 1z" />
              </svg>
              +1 (555) 123-4567
            </li>

            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4z" />
                <path d="M4 4l8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              info@brickbyte.com
            </li>

            <li className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              123 Real Estate Ave, NY
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to get the latest property listings and news.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-[#2a2a2a] text-gray-300 px-3 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BrickByte. All rights reserved.
      </div>
    </footer>
  );
}
