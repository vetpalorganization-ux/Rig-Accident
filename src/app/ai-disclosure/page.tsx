import LegalPage from '@/components/LegalPage';

export default function AIDisclosurePage() {
  return (
    <LegalPage
      title="AI Usage Disclosure"
      lastUpdated="March 5, 2026"
      content={
        <div className="space-y-8 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">How We Use AI</h2>
            <p>RigAccident.com utilizes artificial intelligence (AI) and automated systems to improve user experience and lead qualification processes.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">AI Chat Assistant</h2>
            <p>Our Chat Assistant is a deterministic AI-powered tool designed to help visitors quickly navigate their potential legal options. It collects accident details and provides information based on programmed logic.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Data Processing</h2>
            <p>Lead data captured via AI systems is processed according to our Privacy Policy. We prioritize the security and confidentiality of all information provided to our automated tools.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Human Oversight</h2>
            <p>All AI-processed leads are reviewed by human legal intake specialists to ensure accuracy and provide a personalized experience during follow-up consultations.</p>
          </section>
        </div>
      }
    />
  );
}
