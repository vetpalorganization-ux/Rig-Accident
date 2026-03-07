'use client';

import { useState, useEffect } from 'react';
import FallbackImage from './FallbackImage';

type Quote = {
  text: string;
  name: string;
  role: string;
  photo: string;
};

const QUOTES: Quote[] = [
  {
    text:
      'The intake quality has been excellent and aligned with our trucking docket. Our team appreciates the concise case summaries.',
    name: 'Partner, Regional PI Firm',
    role: 'Truck Accident Litigation',
    photo: '/images/stock/quote-1.jpg',
  },
  {
    text:
      'Coverage targeting by state and case type made onboarding simple. We can scale volume when our capacity increases.',
    name: 'Intake Director, Multistate Firm',
    role: 'Operations',
    photo: '/images/stock/quote-2.jpg',
  },
  {
    text:
      'Fast follow-ups and relevant inquiries. The screening process saves our staff time without sacrificing quality.',
    name: 'Lead Counsel',
    role: 'Commercial Vehicle Cases',
    photo: '/images/stock/quote-3.jpg',
  },
];

export default function QuoteSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + QUOTES.length) % QUOTES.length);
  const next = () => setIndex((i) => (i + 1) % QUOTES.length);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {QUOTES.map((q, i) => (
          <div key={i} className="min-w-full p-6 md:p-10">
            <div className="max-w-3xl mx-auto grid md:grid-cols-[120px_1fr] gap-6 items-center">
              <FallbackImage
                src={q.photo}
                alt={q.name}
                width={112}
                height={112}
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border border-gray-200"
              />
              <div>
                <p className="text-lg md:text-xl text-gray-900 leading-relaxed">“{q.text}”</p>
                <div className="mt-3 text-sm font-semibold text-gray-700">{q.name}</div>
                <div className="text-xs text-gray-500">{q.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 border border-gray-200 w-9 h-9 rounded-full flex items-center justify-center"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 border border-gray-200 w-9 h-9 rounded-full flex items-center justify-center"
      >
        ›
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
