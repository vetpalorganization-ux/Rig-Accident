import LegalPage from '@/components/LegalPage';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="March 6, 2026"
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
            <h2 className="text-2xl font-bold mb-4">3. No Attorney-Client Relationship</h2>
            <p>Submitting information through this website does not create an attorney-client relationship. Any attorney-client relationship is formed only after you enter into a direct agreement with a licensed attorney.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">4. No Guarantee of Representation or Results</h2>
            <p>We do not guarantee that you will be contacted by an attorney, that legal representation will be offered, or that any specific outcome will be achieved. Prior results do not guarantee a similar outcome.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Information</h2>
            <p>You agree to provide accurate and truthful information during your intake process. Providing false information may lead to disqualification.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p>We are not liable for any legal outcomes or the performance of third-party attorneys you are matched with.</p>
          </section>
        </div>
      }
    />
  );
}
