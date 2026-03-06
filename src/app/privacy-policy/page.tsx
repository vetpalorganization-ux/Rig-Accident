import LegalPage from '@/components/LegalPage';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="March 6, 2026"
      content={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>RigAccident.com (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share personal information when you use our website and related services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Personal Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details you submit (name, phone number, email).</li>
              <li>Accident and case details you provide in forms, calculator, or chat.</li>
              <li>Technical data like IP address, device information, and browser type.</li>
              <li>Usage data for analytics (pages viewed, time on page, referrer, and interactions).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Lawyer Matching Disclosure</h2>
            <p>We operate a lawyer matching service. Information you submit is used to determine eligibility and to match you with independent attorneys who may contact you for a free consultation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Share Information</h2>
            <p>We share relevant information you provide with independent attorneys for the purpose of evaluating and responding to your inquiry. We also share data with service providers that support our operations (e.g., analytics and email services) under confidentiality obligations. We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Analytics and Tracking</h2>
            <p>We use analytics tools to understand site performance and improve user experience. These tools may set cookies or use similar technologies to collect usage data such as page views, clicks, and device information in aggregated form.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p>We use cookies and similar technologies for essential site functionality, performance, and analytics. You can control cookies through your browser settings and via our cookie consent banner. For more detail, see our Cookie Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            <p>Depending on your location, you may have rights under laws such as the CCPA and GDPR, including the rights to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction or deletion of your personal information.</li>
              <li>Object to or limit certain processing, or withdraw consent where applicable.</li>
              <li>Receive a copy of your data in a portable format where technically feasible.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Deletion Requests</h2>
            <p>You may request deletion of your personal information by contacting us at <a href="mailto:legal@rigaccident.com" className="text-blue-600 underline">legal@rigaccident.com</a>. We will verify and process your request as required by applicable law.</p>
          </section>
        </div>
      }
    />
  );
}
