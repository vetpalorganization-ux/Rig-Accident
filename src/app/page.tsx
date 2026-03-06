'use client';

import { useState, useEffect } from 'react';
import LeadForm from "@/components/LeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyContactBar from "@/components/StickyContactBar";
import FloatingCallButton from "@/components/FloatingCallButton";
import TrustBadges from "@/components/TrustBadges";
import SettlementCalculator from "@/components/SettlementCalculator";
import ChatWidget from "@/components/ChatWidget";
import FeatureModal from "@/components/FeatureModal";
import CookieConsent from "@/components/CookieConsent";
import Link from 'next/link';

const FEATURES = [
  {
    title: 'Experienced Lawyers',
    desc: 'We only match you with attorneys who have a proven track record in truck accident cases.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    longDesc: 'Our network consists exclusively of attorneys who specialize in commercial vehicle litigation. These firms have the resources to take on large trucking corporations and their insurance providers.\n\nWhen you are matched through our system, you can be confident that your legal representative understands the complexities of federal trucking regulations and has successfully secured multi-million dollar settlements for victims like you.',
    icon: (
      <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'No Upfront Cost',
    desc: 'Your consultation is free, and you pay nothing unless your lawyer wins your case.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    longDesc: 'We believe that legal representation should be accessible to everyone, regardless of their financial situation. All attorneys in our matching system work on a contingency fee basis.\n\nThis means you will never receive a bill for hourly fees. Your lawyer only gets paid if they successfully recover compensation for you through a settlement or jury verdict. If there is no recovery, you owe no attorney fees—period.',
    icon: (
      <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Fast Case Review',
    desc: 'Our system prioritizes serious accidents for immediate review by legal specialists.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop',
    longDesc: 'Time is of the essence in truck accident cases. Evidence can disappear quickly, and black box data must be preserved immediately.\n\nOur matching system is designed for speed. Once you submit your details, our automation engine prioritizes high-impact cases for instant notification to available attorneys. Most users receive a call back within minutes to begin their free legal evaluation.',
    icon: (
      <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

const HERO_VARIANTS = [
  {
    id: 'variant-a',
    image: 'https://images.unsplash.com/photo-1529148532222-293c24360a2b?q=80&w=2560&auto=format&fit=crop',
    alt: 'Large commercial truck driving on a highway'
  },
  {
    id: 'variant-b',
    image: 'https://images.unsplash.com/photo-1578509321557-b08a9ed2a4b7?q=80&w=2560&auto=format&fit=crop',
    alt: 'Front view of a large semi-truck on the road'
  }
];

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<typeof FEATURES[0] | null>(null);
  const [heroVariant, setHeroVariant] = useState(HERO_VARIANTS[0]);

  useEffect(() => {
     // Simple A/B testing logic
     let variant = localStorage.getItem('hero-ab-variant');
     if (!variant) {
       variant = Math.random() > 0.5 ? 'variant-a' : 'variant-b';
       localStorage.setItem('hero-ab-variant', variant);
     }
     const selected = HERO_VARIANTS.find(v => v.id === variant) || HERO_VARIANTS[0];
     
     // Move to next tick to avoid cascading render lint error
     const timer = setTimeout(() => {
       setHeroVariant(selected);
     }, 0);
     return () => clearTimeout(timer);
   }, []);

  return (
    <main className="min-h-screen">
      <StickyContactBar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col bg-primary text-white overflow-hidden">
        {/* Banner */}
        <div className="w-full bg-accent py-4 text-primary text-center relative z-20 shadow-lg">
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">
            INJURED IN A TRUCK ACCIDENT? <span className="font-playfair italic normal-case ml-2 font-bold">RigAccident MatchingSystem</span>
          </h1>
        </div>

        <div className="flex-1 relative flex items-center pt-12">
          {/* Background Overlay with Responsive Variants */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source 
                srcSet="/big-rig-accident-hero.jpg"
                sizes="100vw"
                type="image/jpeg"
              />
              <img 
                 src="/big-rig-accident-hero.jpg"
                 alt="Dramatic scene of a semi-truck accident"
                 className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000"
                 style={{ objectPosition: 'center' }}
                 loading="eager"
               />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-black/40" /> {/* Darkening overlay for contrast */}
          </div>
          
          <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-20 items-center py-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-primary border border-accent/30 px-3 py-1 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Free Lawyer Matching System</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Injured in a Truck Accident? <br />
                <span className="text-accent text-glow">You May Be Entitled to Significant Compensation.</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Get Matched With an Experienced Truck Accident Lawyer in Minutes. <br />
                <span className="font-bold text-white">Free Case Review • No Fee Unless You Win • 100% Confidential</span>
              </p>
              
              <div className="hidden md:block mb-12">
                  <TrustBadges />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="#lead-form"
                  className="bg-accent hover:bg-opacity-90 text-primary font-bold px-8 py-4 rounded-xl transition duration-300 text-center uppercase tracking-wider text-lg shadow-xl flex-1"
                >
                  Get Matched with a Lawyer
                </a>
              </div>

              <div className="mb-12">
                  <a 
                      href="#calculator"
                      className="inline-flex items-center space-x-2 text-white hover:text-accent font-bold transition-colors group"
                  >
                      <span className="border-b-2 border-accent group-hover:border-white">Estimate Claim Value</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                  </a>
              </div>

              <p className="text-sm text-gray-400 mt-4 italic">
                Speak with a local truck accident specialist. No cost, no obligation.
              </p>
            </div>

            <div className="hidden md:block">
              <div className="mb-8 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4 text-white">Get Matched with a Truck Accident Lawyer</h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-xl">Our system connects accident victims with experienced truck accident attorneys. Your consultation is free and confidential.</p>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 relative overflow-hidden">
        {/* Background Image for Calculator */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?q=80&w=2560&auto=format&fit=crop" 
            alt="Dramatic scene of a semi-truck accident with emergency responders"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-accent text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">Free Tool</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Truck Accident Settlements Can Be Significant. <br />
                <span className="text-accent">Use Our Free Estimate Tool to See What Your Case Could Be Worth.</span>
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                Truck accident claims may include compensation for:
              </p>
              <div className="space-y-4">
                {[
                  'Medical expenses & hospital bills',
                  'Lost wages & future earnings',
                  'Pain and suffering',
                  'Property damage recovery'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-bold text-gray-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SettlementCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section (Visible only on mobile) */}
      <section className="md:hidden py-16 bg-white px-4">
        <div className="max-w-lg mx-auto">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary">Get Matched with a Truck Accident Lawyer</h3>
            <p className="text-gray-600 leading-relaxed">Our system connects accident victims with experienced truck accident attorneys. Your consultation is free and confidential.</p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image for Trust Section */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/truck-accident-2.jpg" 
            alt="Professional responders at a commercial vehicle accident site"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-white/95" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16">Why Victims Choose Our Matching System</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {FEATURES.map((feature, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full focus-within:ring-2 focus-within:ring-accent">
                <div className="relative h-48 overflow-hidden">
                  <picture>
                    <source srcSet={`${feature.image}&fm=webp`} type="image/webp" />
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      loading="lazy" 
                      width="400" 
                      height="200" 
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md border border-white/20 p-2 rounded-lg shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">{feature.desc}</p>
                  <button 
                    onClick={() => setSelectedFeature(feature)}
                    className="inline-flex items-center justify-center w-full min-h-[48px] bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accident Types Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16">Common Truck Accident Cases We Handle</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {[
              '18-Wheeler Collisions', 
              'Jackknife Accidents', 
              'Underride Accidents', 
              'Driver Fatigue Accidents', 
              'Overloaded Truck Accidents', 
              'Rear-End Truck Collisions'
            ].map((type) => (
              <div key={type} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
                <span className="font-semibold text-gray-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Speak With a Truck Accident Lawyer Today</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Free Case Review • No Fee Unless You Win • 100% Confidential</p>
          <a 
            href="#lead-form"
            className="bg-accent hover:bg-opacity-90 text-primary font-bold px-12 py-5 rounded-xl transition duration-300 text-center uppercase tracking-wider text-lg shadow-xl"
          >
            Start My Free Case Review
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="mb-4 font-bold text-white">RigAccident.com</p>
          <p className="text-sm max-w-2xl mx-auto mb-8" style={{ color: '#FDF6E3' }}>
            RigAccident.com is a lawyer matching service. We connect accident victims with independent attorneys who may review their case. RigAccident.com is not a law firm and does not provide legal advice. Consultations are provided by independent attorneys.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-accent transition-colors">Cookie Policy</Link>
            <Link href="/ai-disclosure" className="hover:text-accent transition-colors">AI Disclosure</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="/attorney-advertising-disclosure" className="hover:text-accent transition-colors">Attorney Advertising Disclosure</Link>
          </div>

          <p className="mt-8 text-xs text-white">
            © {new Date().getFullYear() === 2024 ? '2024 - 2026' : `2024 - ${new Date().getFullYear()}`} RigAccident.com. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Feature Modal */}
      <FeatureModal 
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.title || ''}
        description={selectedFeature?.desc || ''}
        image={selectedFeature?.image || ''}
        longDescription={selectedFeature?.longDesc || ''}
      />

      {/* Floating Components */}
      <ChatWidget />
      <FloatingCallButton />
      <ExitIntentPopup />
      <CookieConsent />

      {/* Mobile CTA (Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100">
        <a 
          href="#lead-form"
          className="block w-full bg-accent text-primary text-center font-bold py-4 rounded-xl uppercase tracking-widest shadow-lg text-lg"
        >
          Free Case Review
        </a>
      </div>
    </main>
  );
}
