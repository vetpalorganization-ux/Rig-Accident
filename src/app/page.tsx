import LeadForm from "@/components/LeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyContactBar from "@/components/StickyContactBar";
import FloatingCallButton from "@/components/FloatingCallButton";
import TrustBadges from "@/components/TrustBadges";
import SettlementCalculator from "@/components/SettlementCalculator";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <StickyContactBar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary text-white overflow-hidden pt-12">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Free Lawyer Matching System</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Injured in a <span className="text-accent text-glow">Truck or Rig Accident?</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Our system connects accident victims with experienced truck accident attorneys. Your consultation is free and confidential.
            </p>
            
            <div className="hidden md:block mb-12">
                <TrustBadges />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#lead-form"
                className="bg-accent hover:bg-opacity-90 text-primary font-bold px-8 py-4 rounded-xl transition duration-300 text-center uppercase tracking-wider text-lg shadow-xl"
              >
                Get Matched with a Lawyer
              </a>
              <a 
                href="#calculator"
                className="bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                Estimate Claim Value
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-4 italic">
              Speak with a local truck accident specialist. No cost, no obligation.
            </p>
          </div>

          <div className="hidden md:block">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-gray-50 border-y border-gray-100 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit">Free Tool</div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Calculate Your Potential <span className="text-accent">Settlement Value</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Truck accident claims can be worth significant amounts due to the severe nature of injuries and commercial insurance policies. Use our free calculator to see what your case could be worth.
              </p>
              <div className="space-y-4">
                {[
                  'Medical expenses & hospital bills',
                  'Lost wages & future earnings',
                  'Pain and suffering',
                  'Property damage recovery'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-bold text-gray-700">{item}</span>
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
          <LeadForm />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16">Why Victims Choose Our Matching System</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Experienced Lawyers',
                desc: 'We only match you with attorneys who have a proven track record in truck accident cases.',
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'No Upfront Cost',
                desc: 'Your consultation is free, and you pay nothing unless your lawyer wins your case.',
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Fast Case Review',
                desc: 'Our system prioritizes serious accidents for immediate review by legal specialists.',
                icon: (
                  <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 text-white/50 text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="mb-4 font-bold text-white">RigAccident.com</p>
          <p className="text-sm max-w-2xl mx-auto">
            RigAccident.com is a lawyer matching service. We connect victims with independent attorneys. We are not a law firm and do not provide legal advice. Consultations are provided by third-party lawyers.
          </p>
          <p className="mt-8 text-xs">© 2024 RigAccident.com. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Components */}
      <ChatWidget />
      <FloatingCallButton />
      <ExitIntentPopup />

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
