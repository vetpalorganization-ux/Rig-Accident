'use client';

import { useState, useId } from 'react';
import Script from 'next/script';

type QA = { q: string; a: string };

const QUESTIONS: QA[] = [
  {
    q: 'What types of cases does the network focus on?',
    a: 'Commercial truck accidents prioritized by severity, economic losses, and clear liability signals. Non-truck cases can be filtered.',
  },
  {
    q: 'How quickly will I hear back after applying?',
    a: 'We will contact you within 24 hours to verify licensing, routing preferences, and initial capacity.',
  },
  {
    q: 'Are there upfront costs or long-term contracts?',
    a: 'No upfront fees and no long-term commitments. Performance-focused arrangements are aligned to your preferences.',
  },
  {
    q: 'Can I choose my licensed states and volume pacing?',
    a: 'Yes. You can select states and adjust volume pacing so your team can respond quickly and consistently.',
  },
  {
    q: 'What types of inquiries will I receive?',
    a: 'Commercial truck accident matters prioritized by severity and economic losses. Screening includes state, truck involvement, and brief facts.',
  },
  {
    q: 'How are inquiries delivered?',
    a: 'Direct phone or email handoffs. CRM integration can be discussed during onboarding based on your systems.',
  },
];

export default function FAQ({ headline = 'Frequently Asked Questions' }: { headline?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const schemaId = useId();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUESTIONS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="space-y-6">
      <Script
        id={`faq-schema-${schemaId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{headline}</h2>
      <ul className="space-y-3">
        {QUESTIONS.map((item, idx) => (
          <li key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <button
              type="button"
              aria-expanded={open === idx}
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full text-left p-4 md:p-5 flex items-center justify-between"
            >
              <span className="font-semibold text-gray-900">{item.q}</span>
              <span className="text-gray-500">{open === idx ? '−' : '+'}</span>
            </button>
            <div className={`${open === idx ? 'block' : 'hidden'} px-4 md:px-5 pb-4 md:pb-5`}>
              <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
