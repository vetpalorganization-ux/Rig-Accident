'use client';

import { useState } from 'react';
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
import Image from 'next/image';

const FEATURES = [
  {
    title: 'Experienced Lawyers',
    desc: 'We only match you with attorneys who have a proven track record in truck accident cases.',
    image: '/images/stock/feature-experienced-lawyers.jpg',
    longDesc: 'Our network consists exclusively of attorneys who specialize in commercial vehicle litigation. These firms have the resources to take on large trucking corporations and their insurance providers.\n\nWhen you are matched through our system, you can be confident that your legal representative understands the complexities of federal trucking regulations, FMCSA compliance requirements, and the strategies needed to build strong cases against commercial carriers.',
    icon: (
      <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'No Upfront Cost',
    desc: 'Your consultation is free, and you pay nothing unless your lawyer wins your case.',
    image: '/images/stock/feature-no-upfront-cost.jpg',
    longDesc: 'The attorneys in our network typically work on a contingency fee basis, meaning they only collect a fee if they recover compensation for you.\n\nThis arrangement allows accident victims to pursue justice without paying upfront legal costs. Specific fee arrangements vary by attorney and will be discussed during your free consultation.',
    icon: (
      <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Fast Case Review',
    desc: 'Our system prioritizes serious accidents for immediate review by legal specialists.',
    image: '/images/stock/feature-fast-review.jpg',
    longDesc: 'Time is of the essence in truck accident cases. Evidence can disappear quickly, and black box data must be preserved immediately.\n\nOur matching system is designed for speed. Once you submit your details, our automation engine prioritizes high-impact cases for instant notification to available attorneys. Most users receive a call back within minutes to begin their free legal evaluation.',
    icon: (
      <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

 

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<typeof FEATURES[0] | null>(null);

  return (
    <main className="min-h-screen">
      <StickyContactBar />
      
      {/* Hero Section */}
      <section className="relative min-h-[100svh] md:min-h-[calc(90vh+200px)] flex flex-col bg-primary text-white overflow-hidden">
        {/* Banner */}
        <div className="w-full bg-accent py-3 sm:py-4 text-primary text-center relative z-20 shadow-lg px-4">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight md:leading-none">
            <span className="block sm:inline">INJURED IN A TRUCK ACCIDENT?</span>
            <span className="block sm:inline normal-case sm:ml-2 font-bold text-base sm:text-xl md:text-2xl lg:text-3xl mt-1 sm:mt-0">Rig Accident Matching System</span>
          </h1>
        </div>

        <div className="flex-1 relative flex items-center pt-8 md:pt-12">
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

          <div className="container mx-auto px-4 sm:px-6 relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center py-8 md:py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-primary border border-accent/30 px-3 py-1 rounded-full mb-4 md:mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">Free Lawyer Matching System</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[2.35rem] lg:text-[3.4rem] font-bold mb-4 md:mb-6 leading-tight text-balance">
                <span className="xl:whitespace-nowrap">Injured in a Truck Accident?</span>
                <span className="text-accent text-glow block mt-1 md:mt-2">You May Be Entitled<br className="hidden md:block" /> to Significant Compensation.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 leading-relaxed">
                Get Matched With an Experienced Truck Accident Lawyer in Minutes.
                <span className="block sm:inline font-bold text-white mt-2 sm:mt-0">
                  <br className="hidden sm:block" />
                  Free Case Review • <span className="whitespace-nowrap">Contingency-Based Attorneys</span> • 100% Confidential
                </span>
              </p>

              <div className="hidden md:block mb-8 lg:mb-16">
                  <TrustBadges />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-12">
                <a
                  href="#lead-form"
                  className="bg-accent hover:bg-opacity-90 text-primary font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition duration-300 text-center uppercase tracking-wider text-base sm:text-lg shadow-xl flex-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
                >
                  Get Matched with a Lawyer
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="mb-6 lg:mb-8 text-center md:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 text-white">Get Matched with a Truck Accident Lawyer</h3>
                <p className="text-white text-base lg:text-lg leading-relaxed max-w-xl">Our system connects accident victims with experienced truck accident attorneys. Your consultation is free and confidential.</p>
              </div>
              <LeadForm />
              <div className="mt-[50px] flex flex-col items-center lg:flex-row lg:items-center justify-center lg:justify-start gap-2 lg:gap-3 text-sm text-gray-100 text-center lg:text-left">
                <a 
                  href="#calculator"
                  className="inline-flex items-center space-x-2 text-white hover:text-accent font-bold transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded"
                >
                  <span className="border-b-2 border-accent group-hover:border-white">Estimate Claim Value</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <span aria-hidden="true" className="text-white/60">•</span>
                <p className="text-gray-100">Speak with a local truck accident specialist. No cost, no obligation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Background Image for Calculator */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/stock/calculator-bg.jpg"
            alt="Dramatic scene of a semi-truck accident with emergency responders"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority={false}
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-white">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="bg-accent text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">Free Tool</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Truck Accident Settlements Can Be Significant.
                <span className="text-accent block mt-2">Use Our Free Estimate Tool to See What Your Case Could Be Worth.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                Truck accident claims may include compensation for:
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  'Medical expenses & hospital bills',
                  'Lost wages & future earnings',
                  'Pain and suffering',
                  'Property damage recovery'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-bold text-sm sm:text-base text-gray-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <SettlementCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Form Section (Visible only on mobile) */}
      <section id="lead-form" className="md:hidden py-10 sm:py-16 bg-white px-4">
        <div className="max-w-lg mx-auto">
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Get Matched with a Truck Accident Lawyer</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Our system connects accident victims with experienced truck accident attorneys. Your consultation is free and confidential.</p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Background Image for Trust Section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/truck-accident-2.jpg"
            alt="Professional responders at a commercial vehicle accident site"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority={false}
          />
          <div className="absolute inset-0 bg-white/95" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8 sm:mb-12 md:mb-16">Why Victims Choose Our Matching System</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {FEATURES.map((feature, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full focus-within:ring-2 focus-within:ring-accent">
                <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/70 backdrop-blur-md border border-white/20 p-1.5 sm:p-2 rounded-lg shadow-lg">
                    <div className="[&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10 md:[&>svg]:w-12 md:[&>svg]:h-12">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 flex-1">{feature.desc}</p>
                  <button
                    onClick={() => setSelectedFeature(feature)}
                    className="inline-flex items-center justify-center w-full min-h-[44px] sm:min-h-[48px] bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 text-sm sm:text-base"
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
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/big-rig-accident-hero.jpg"
            alt="Commercial truck on highway"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority={false}
          />
          <div className="absolute inset-0 bg-primary/95" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Types of Truck Accident Cases Our Attorneys Handle</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Our attorney network specializes in all types of commercial vehicle accidents. Each case type requires specific expertise to investigate evidence, establish liability, and maximize your compensation.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-left">
            {/* 18-Wheeler Collisions */}
            <li className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">18-Wheeler Collisions</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                    Large semi-truck accidents often result in catastrophic injuries due to the massive weight differential. These cases require investigation into braking systems, load distribution, and driver compliance with federal regulations.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Black box data analysis</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Load shift investigations</span>
                    </li>
                  </ul>
                  <a href="#lead-form" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors">
                    Get a free case review
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </li>

            {/* Jackknife Accidents */}
            <li className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Jackknife Accidents</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                    When a truck trailer swings outward and folds against the cab, it can sweep across multiple lanes causing multi-vehicle pileups. These accidents are often caused by improper braking, slick roads, or equipment failure.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>ABS and brake log review</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Road condition analysis</span>
                    </li>
                  </ul>
                  <a href="#lead-form" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors">
                    Get a free case review
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </li>

            {/* Underride Accidents */}
            <li className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Underride Accidents</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                    Among the most deadly truck accidents, underride collisions occur when a smaller vehicle slides beneath a truck trailer. These often involve inadequate rear or side guards and poor trailer visibility at night.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Guard compliance investigation</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Reflector and lighting review</span>
                    </li>
                  </ul>
                  <a href="#lead-form" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors">
                    Get a free case review
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </li>

            {/* Driver Fatigue Accidents */}
            <li className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Driver Fatigue Accidents</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                    Federal hours-of-service regulations exist because fatigued driving is as dangerous as drunk driving. Trucking companies that pressure drivers to exceed legal driving limits can be held liable for resulting accidents.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>ELD and logbook analysis</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Company scheduling review</span>
                    </li>
                  </ul>
                  <a href="#lead-form" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors">
                    Get a free case review
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </li>

            {/* Overloaded Truck Accidents */}
            <li className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Overloaded Truck Accidents</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                    Trucks carrying loads beyond legal weight limits have longer stopping distances, increased tire blowout risk, and compromised steering. Shippers and carriers can both be liable for overweight cargo accidents.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Weigh station records</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Load securement audit</span>
                    </li>
                  </ul>
                  <a href="#lead-form" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors">
                    Get a free case review
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </li>

            {/* Rear-End Truck Collisions */}
            <li className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/15 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Rear-End Truck Collisions</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                    A fully loaded commercial truck needs up to 40% more distance to stop than a passenger vehicle. When trucks rear-end cars at highway speeds, the results are often fatal. Evidence preservation is critical.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>ECU and telematics data</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>Dash cam evidence</span>
                    </li>
                  </ul>
                  <a href="#lead-form" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-white transition-colors">
                    Get a free case review
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="bg-secondary text-primary py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Speak With a Truck Accident Lawyer Today</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">Free Case Review • Contingency-Based Attorneys • 100% Confidential</p>
          <a
            href="#lead-form"
            className="inline-block bg-accent hover:bg-opacity-90 text-primary font-bold px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl transition duration-300 text-center uppercase tracking-wider text-base sm:text-lg shadow-xl"
          >
            Start My Free Case Review
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8 sm:py-10 md:py-12 text-white text-center border-t border-white/10 pb-24 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="mb-3 sm:mb-4 font-bold text-white text-lg">RigAccident.com</p>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed" style={{ color: '#FDF6E3' }}>
            RigAccident.com is a lawyer matching service. We connect accident victims with independent attorneys who may review their case. RigAccident.com is not a law firm and does not provide legal advice. Consultations are provided by independent attorneys.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 mb-6 sm:mb-8 text-xs sm:text-sm font-medium">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-accent transition-colors">Cookie Policy</Link>
            <Link href="/ai-disclosure" className="hover:text-accent transition-colors">AI Disclosure</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="/attorney-advertising-disclosure" className="hover:text-accent transition-colors">Attorney Advertising Disclosure</Link>
            <Link href="/for-attorneys" className="hover:text-accent transition-colors">For Attorneys</Link>
          </div>

          <p className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-white/80">
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a
          href="#lead-form"
          className="block w-full bg-accent text-primary text-center font-bold py-3.5 sm:py-4 rounded-xl uppercase tracking-wider sm:tracking-widest shadow-lg text-base sm:text-lg"
        >
          Free Case Review
        </a>
      </div>
    </main>
  );
}
