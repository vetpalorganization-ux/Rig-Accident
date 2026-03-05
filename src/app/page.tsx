import LeadForm from "@/components/LeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyContactBar from "@/components/StickyContactBar";
import FloatingCallButton from "@/components/FloatingCallButton";
import TrustSignals from "@/components/TrustSignals";

export default function Home() {
  return (
    <main className="min-h-screen">
      <StickyContactBar />
      
      {/* Sticky Mobile CTA - Hidden on desktop */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200">
        <a 
          href="#lead-form"
          className="block w-full bg-accent text-primary text-center font-bold py-3 rounded-md uppercase tracking-wider shadow-lg"
        >
          Free Case Review
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-primary text-white overflow-hidden pt-12">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Available 24/7 for Consultations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline mb-6 leading-tight">
              Injured in a <span className="text-accent">Truck or Rig Accident?</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              You may be entitled to significant compensation. Speak with an experienced attorney today.
            </p>
            
            <div className="hidden md:block">
                <TrustSignals />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#lead-form"
                className="bg-accent hover:bg-opacity-90 text-primary font-bold px-8 py-4 rounded-md transition duration-300 text-center uppercase tracking-wider text-lg shadow-xl"
              >
                Check My Case Eligibility
              </a>
              <a 
                href="tel:18005550199"
                className="bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-md transition duration-300 text-center flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now – Free Review</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 opacity-70">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium uppercase tracking-wide">No Fee Unless You Win</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium uppercase tracking-wide">100% Confidential</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium uppercase tracking-wide">Free Consultation</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Helping Victims After Serious Truck Accidents</h2>
                <div className="flex justify-center items-center space-x-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="ml-2 text-primary font-bold">5.0 Rating</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { quote: "They connected me with a lawyer the same day after my accident. Extremely helpful.", author: "Michael R." },
                    { quote: "Professional and fast. I didn't know where to turn after my oilfield injury.", author: "Sarah T." },
                    { quote: "The consultation was 100% free just like they said. They handled everything.", author: "James D." }
                ].map((testimonial, index) => (
                    <div key={index} className="bg-secondary p-8 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-600 italic mb-6">&quot;{testimonial.quote}&quot;</p>
                        <div className="font-bold text-primary">{testimonial.author}</div>
                        <div className="text-xs text-accent uppercase tracking-widest mt-1">Verified Case Review</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Mobile Form Section */}
      <section className="md:hidden bg-secondary py-12 px-4">
        <LeadForm />
      </section>

      {/* Case Value Indicator */}
      <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Truck accident settlements can reach hundreds of thousands or more.</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          Compensation can cover medical bills, lost wages, pain and suffering, and future care. A free case review can determine if you qualify for a significant settlement.
                      </p>
                      <p className="text-[10px] text-gray-400 mt-4 italic uppercase tracking-widest">
                          Disclaimer: Past results do not guarantee future outcomes.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* What Qualifies Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline text-primary mb-6">Do You Have a Case?</h2>
            <p className="text-xl text-gray-600">If you or a loved one were injured in any of the following, you deserve representation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Oil rig accidents",
              "Drilling rig explosions",
              "Oilfield injuries",
              "Offshore rig accidents",
              "18-wheeler / trucking rig crashes",
              "Equipment failures",
              "Refinery accidents",
              "Pipeline explosions",
              "Wrongful death"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 rounded-lg bg-secondary border border-gray-100 hover:shadow-md transition duration-300">
                <div className="bg-accent/10 p-2 rounded-full">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-primary">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="#lead-form"
              className="inline-block bg-primary text-white font-bold px-10 py-4 rounded-md hover:bg-primary/90 transition duration-300 uppercase tracking-wider"
            >
              Start My Free Case Review
            </a>
          </div>
        </div>
      </section>

      {/* Why Act Now Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline text-primary mb-8">Why You Should Speak With an Attorney Today</h2>
              <div className="space-y-8">
                {[
                  { title: "Evidence disappears quickly", desc: "Industrial sites are cleaned up and records can be altered. We act fast to preserve the facts." },
                  { title: "Employers may deny responsibility", desc: "Large corporations have legal teams working against you from minute one. You need someone on your side." },
                  { title: "Medical bills and lost wages add up", desc: "Don't let debt spiral out of control while you're unable to work. We seek maximum compensation." },
                  { title: "Legal deadlines apply", desc: "The 'statute of limitations' means if you wait too long, you lose your right to sue forever." }
                ].map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-accent rounded-full flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 -rotate-3 rounded-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                alt="Oil rig worker" 
                className="relative rounded-2xl shadow-2xl z-10 grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-headline text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { step: "Step 1", title: "Submit your information", desc: "Fill out our simple case review form in less than 60 seconds." },
              { step: "Step 2", title: "An attorney reviews your case", desc: "Our experienced legal team analyzes the details of your accident." },
              { step: "Step 3", title: "Get a free consultation", desc: "If you have a case, we'll connect you for a 100% free legal consultation." }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-accent font-bold text-sm uppercase tracking-widest mb-4">{item.step}</div>
                <h3 className="text-2xl font-headline mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-2xl font-headline font-bold text-primary mb-4 md:mb-0">
              Rig Accident Legal Help
            </div>
            <div className="flex space-x-6 text-sm font-medium text-gray-500 uppercase tracking-wide">
              <a href="#" className="hover:text-accent transition">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition">Disclaimer</a>
              <a href="#" className="hover:text-accent transition">Terms</a>
            </div>
          </div>
          <div className="max-w-4xl text-center md:text-left">
            <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider">
              Disclaimer: This website is a legal advertising service. Submitting this form does not establish an attorney-client relationship. The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} Rig Accident Legal Help. All rights reserved.
          </div>
        </div>
      </footer>

      <ExitIntentPopup />
      <FloatingCallButton />
    </main>
  );
}
