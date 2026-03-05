import LegalPage from '@/components/LegalPage';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="March 5, 2026"
      content={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>By using RigAccident.com, you agree to these Terms of Service. If you do not agree, please do not use our website.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Lawyer Matching Service</h2>
            <p>RigAccident.com is a matching service and does not provide legal advice. We connect you with independent, third-party lawyers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Accuracy of Information</h2>
            <p>You agree to provide accurate and truthful information during your intake process. Providing false information may lead to disqualification.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
            <p>We are not liable for any legal outcomes or the performance of third-party attorneys you are matched with.</p>
          </section>
        </div>
      }
    />
  );
}
