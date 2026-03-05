"use client";

import { useState, useEffect } from "react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-headline text-primary mb-4">Wait! Don&apos;t Miss Out.</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Rig accident claims have strict deadlines. You could be entitled to significant compensation for your medical bills and lost wages.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                setIsVisible(false);
                document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-accent hover:bg-opacity-90 text-primary font-bold py-4 rounded-lg transition duration-300 uppercase tracking-wider"
            >
              Get My Free Evaluation Now
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-sm text-gray-400 hover:text-gray-600 underline"
            >
              No, I&apos;ll take my chances
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
