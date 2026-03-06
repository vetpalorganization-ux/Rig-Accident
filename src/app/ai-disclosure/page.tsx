import LegalPage from '@/components/LegalPage';

export default function AIDisclosurePage() {
  return (
    <LegalPage
      title="AI Disclosure"
      lastUpdated="March 6, 2026"
      content={
        <div className="space-y-8 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Automated Intake Assistance</h2>
            <p>RigAccident.com may use automated tools, including AI systems, to assist with case intake, collect details about your accident, and route your inquiry for review.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">No Legal Advice</h2>
            <p>AI tools used on this website do not provide legal advice and do not replace professional legal judgment.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Human Decision-Making</h2>
            <p>All case decisions are made by independent, licensed attorneys. AI may assist with information gathering and routing only.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Data Processing</h2>
            <p>Information collected via AI-assisted tools is processed according to our Privacy Policy and may be shared with independent attorneys to evaluate your inquiry.</p>
          </section>
        </div>
      }
    />
  );
}
