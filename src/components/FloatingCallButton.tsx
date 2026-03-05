"use client";

import { useState, useEffect } from "react";

export default function FloatingCallButton() {
  return (
    <div className="md:hidden fixed bottom-24 right-6 z-50">
      <a 
        href="#lead-form"
        className="bg-accent text-primary w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 group-hover:hidden" style={{ animationDuration: '3s' }} />
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="sr-only">Free Case Review</span>
      </a>
    </div>
  );
}
