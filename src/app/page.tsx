import LeadForm from "@/components/LeadForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200">
        <a 
          href="#lead-form"
          className="block w-full bg-accent text-primary text-center font-bold py-3 rounded-md uppercase tracking-wider shadow-lg"
        >
          Free Case Review
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-primary text-white overflow-hidden">
        {/* Background Overlay - Placeholder for actual image */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Available 24/7 for Consultations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline mb-6 leading-tight">
              Injured in a <span className="text-accent">Rig Accident?</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              You may be entitled to significant compensation. Speak with an experienced attorney today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#lead-form"
                className="bg-accent hover:bg-opacity-90 text-primary font-bold px-8 py-4 rounded-md transition duration-300 text-center uppercase tracking-wider"
              >
                Get Your Free Case Review
              </a>
              <a 
                href="tel:18005550199"
                className="bg-transparent border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-md transition duration-300 text-center flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
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

      {/* Mobile Form Section */}
      <section className="md:hidden bg-white py-12 px-4">
        <LeadForm />
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
              Check Your Case Now
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
    </main>
  );
}
