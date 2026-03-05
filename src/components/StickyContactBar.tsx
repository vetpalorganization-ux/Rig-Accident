"use client";

import { useState, useEffect } from "react";

export default function StickyContactBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[60] bg-primary shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-[56px] md:h-[48px]">
        <div className="hidden md:block text-white font-bold text-sm lg:text-base">
          Injured in a Truck or Rig Accident?
        </div>
        <div className="flex-1 md:flex-none flex justify-center md:justify-end">
          <a 
            href="tel:+18005551234"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded shadow-md flex items-center space-x-2 transition duration-300 w-full md:w-auto justify-center uppercase tracking-wider text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.87 4.87l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-1C9.716 18 2 10.284 2 2V3z" />
            </svg>
            <span>Call Now – Free Case Review</span>
          </a>
        </div>
      </div>
    </div>
  );
}
