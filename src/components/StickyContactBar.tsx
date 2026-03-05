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
            href="#lead-form"
            className="bg-accent hover:bg-opacity-90 text-primary font-bold px-6 py-2 rounded shadow-md flex items-center space-x-2 transition duration-300 w-full md:w-auto justify-center uppercase tracking-wider text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Get Matched with a Lawyer</span>
          </a>
        </div>
      </div>
    </div>
  );
}
