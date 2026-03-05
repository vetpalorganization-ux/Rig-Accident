"use client";

import { useState, useEffect } from "react";

export default function FloatingCallButton() {
  return (
    <div className="md:hidden fixed bottom-24 right-6 z-50">
      <a 
        href="tel:+18005551234"
        className="bg-red-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center animate-pulse-slow group"
      >
        <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20 group-hover:hidden" style={{ animationDuration: '3s' }} />
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.87 4.87l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-1C9.716 18 2 10.284 2 2V3z" />
        </svg>
        <span className="sr-only">Call Now</span>
      </a>
    </div>
  );
}
