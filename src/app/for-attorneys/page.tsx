'use client';

import Link from 'next/link';
import FallbackImage from '@/components/FallbackImage';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import FAQ from '@/components/FAQ';
import StateGrid from '@/components/StateGrid';
 
 export default function ForAttorneysPage() {
   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
   const [form, setForm] = useState({
     firm: '',
     contact: '',
     email: '',
     phone: '',
     states: '',
     practice: '',
     website: '',
     honeypot: '',
   });
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setForm((prev) => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (status === 'loading') return;
     setStatus('loading');
     try {
       const timestamp = new Date().toISOString();
       const res = await fetch('/api/lead', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           name: `${form.contact} (${form.firm})`,
           phone: form.phone,
           email: form.email,
           timestamp,
           source: 'attorney',
           honeypot: form.honeypot,
           answers: {
             'Firm Name': form.firm,
             'States': form.states,
             'Practice Areas': form.practice,
             'Website': form.website,
             'Inquiry Type': 'Attorney Network',
           },
         }),
       });
       const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        trackEvent('attorney_form_submitted', { firm: form.firm, states: form.states });
      } else {
        setStatus('error');
      }
     } catch {
       setStatus('error');
     }
   };
 
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-primary font-extrabold tracking-tight text-lg">RigAccident.com</Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold underline underline-offset-4 hover:opacity-80">Back to Home</Link>
            <a href="#attorney-form" className="hidden sm:inline-block bg-accent text-primary font-bold px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm">Request Access</a>
          </div>
        </div>
      </header>

      <section className="relative bg-primary text-white pt-[164px] pb-[164px] overflow-hidden">
        <div className="absolute inset-0">
          <FallbackImage
            src="/truck-accident-2.jpg"
            alt="Attorney onboarding background"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest">For Law Firms</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Join the RigAccident Attorney Network</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Receive pre-screened truck accident inquiries in your licensed states. No upfront fees. We will call you back within 24 hours.</p>
          <div className="mt-8 flex justify-center gap-6">
            <a href="#attorney-form" onClick={() => trackEvent('attorney_cta_click', { location: 'hero' })} className="bg-accent text-primary font-bold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors">Request Network Access</a>
            <a href="mailto:partners@rigaccident.com?subject=Attorney%20Network%20Inquiry&body=Firm%20Name:%0AContact%20Name:%0APhone:%0AEmail:%0AWebsite:%0ALicensed%20States:%0APractice%20Areas:%0ANotes:" onClick={() => trackEvent('attorney_email_click', { location: 'hero' })} className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">Email Us</a>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full h-36">
                <FallbackImage
                  src="/images/stock/attorney-card-1.jpg"
                  alt="Pre-screened inquiry review"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">✓</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Pre-Screened Inquiries</h3>
              <p className="text-gray-700 text-sm">Intake captures essentials: state, truck involvement, injury severity, and economic losses.</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full h-36">
                <FallbackImage
                  src="/images/stock/attorney-card-2.jpg"
                  alt="Territory control"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">✓</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Territory Control</h3>
              <p className="text-gray-700 text-sm">Select states and case types to align with your capacity and expertise.</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full h-36">
                <FallbackImage
                  src="/images/stock/attorney-card-3.jpg"
                  alt="No upfront fees"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">✓</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">No Upfront Fees</h3>
              <p className="text-gray-700 text-sm">Performance-driven model; focus on qualified conversations, not clicks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="space-y-4 md:space-y-5 text-left flex flex-col h-full">
                <h3 className="font-bold text-2xl md:text-3xl text-gray-900">Why Top Firms Join Our Network</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Pre‑screened truck‑accident inquiries matched to your licensed states. We verify key facts (truck involvement, severity, economic losses) so your team focuses on qualified conversations. No upfront fees, flexible pacing, and fast 24‑hour callbacks. Trusted by regional and multistate firms seeking consistent, high‑quality case opportunities.
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-base md:text-lg text-gray-700 leading-7 md:leading-8">
                  <li>Apply with firm details and practice focus</li>
                  <li>Verify licensing, routing, and capacity</li>
                  <li>Go live with targeted coverage</li>
                  <li>Track weekly summaries and optimize</li>
                </ol>
                <div className="mt-auto pt-3">
                  <a href="#attorney-form" className="inline-block bg-accent text-primary font-bold px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm">Get Started</a>
                </div>
              </div>
              <div className="h-full flex items-center">
                <StateGrid />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section removed per request */}

      {/* Removed slider section per request to streamline content */}

      <section className="py-8 md:py-10 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Step 1</div>
              <div className="font-bold text-gray-900 mb-1">Apply</div>
              <div className="text-gray-700 text-sm">Tell us about your firm, states, and focus areas.</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Step 2</div>
              <div className="font-bold text-gray-900 mb-1">Verify</div>
              <div className="text-gray-700 text-sm">We confirm licensing, capacity, and routing preferences.</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Step 3</div>
              <div className="font-bold text-gray-900 mb-1">Go Live</div>
              <div className="text-gray-700 text-sm">We activate coverage and send matched inquiries in real time.</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Step 4</div>
              <div className="font-bold text-gray-900 mb-1">Track</div>
              <div className="text-gray-700 text-sm">Simple event tracking and weekly summaries to optimize.</div>
            </div>
          </div>
        </div>
      </section>
 
      <section className="py-8 md:py-10 bg-white">
         <div className="container mx-auto px-4">
          {status === 'success' ? (
             <div className="max-w-2xl mx-auto bg-green-50 border border-green-100 p-8 rounded-2xl text-center">
               <h2 className="text-2xl font-bold text-green-800 mb-2">Thank you!</h2>
              <p className="text-green-800">We received your information. We will call you back within 24 hours to complete onboarding.</p>
              <p className="text-sm text-green-800 mt-2">
                Prefer email? <a className="underline font-semibold" href="mailto:partners@rigaccident.com?subject=Attorney%20Network%20Inquiry">partners@rigaccident.com</a>
              </p>
             </div>
           ) : (
            <div id="attorney-form" className="w-full grid lg:grid-cols-2 gap-6 items-stretch">
              <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6 md:p-8 h-full">
                <FAQ headline="Attorney Network FAQs" />
              </div>
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6 h-full">
                <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Firm Name</label>
                 <input name="firm" required value={form.firm} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="Your firm" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Contact Name</label>
                   <input name="contact" required value={form.contact} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="Jane Doe" />
                  </div>
                  <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Phone</label>
                   <input name="phone" required value={form.phone} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="(555) 123-4567" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email</label>
                   <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="contact@firm.com" />
                  </div>
                  <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Website</label>
                   <input name="website" value={form.website} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="https://" />
                  </div>
                </div>
                <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Licensed States</label>
                 <input name="states" required value={form.states} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="e.g., TX, FL, CA" />
                </div>
                <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Practice Areas</label>
                 <input name="practice" required value={form.practice} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="Truck accidents, wrongful death, catastrophic injury" />
                </div>
                <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />
                
                <button 
                  disabled={status === 'loading'}
                  className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors text-lg"
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Network Access'}
                </button>
                <div className="text-center text-sm text-gray-700">
                  Prefer email? <a className="underline font-semibold" href="mailto:partners@rigaccident.com?subject=Attorney%20Network%20Inquiry&body=Firm%20Name:%0AContact%20Name:%0APhone:%0AEmail:%0AWebsite:%0ALicensed%20States:%0APractice%20Areas:%0ANotes:">partners@rigaccident.com</a> • We will call you back within 24 hours.
                </div>
                 {status === 'error' && <div className="text-sm text-red-600">Submission failed. Please try again.</div>}
              </form>
            </div>
           )}
         </div>
      </section>

      <section className="bg-primary text-white py-10 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg md:text-xl font-semibold">Ready to activate your firm profile?</p>
          <p className="text-white/90 mt-2">Submit your details above and our team will contact you within 24 hours.</p>
          <a
            href="#attorney-form"
            onClick={() => trackEvent('attorney_cta_click', { location: 'bottom_footer' })}
            className="inline-block mt-6 bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
          >
            Request Network Access
          </a>
        </div>
      </section>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur border-t border-gray-100">
        <a href="#attorney-form" onClick={() => trackEvent('attorney_cta_click', { location: 'mobile_sticky' })} className="block w-full bg-accent text-primary text-center font-bold py-4 rounded-xl uppercase tracking-widest shadow-lg text-lg">Request Access</a>
      </div>
     </main>
   );
 }
