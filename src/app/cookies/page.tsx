import LegalPage from '@/components/LegalPage';

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="March 5, 2026"
      content={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device that help us provide and improve our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Necessary Cookies:</strong> Required for core site functions.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site (e.g., PostHog).</li>
              <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to deliver relevant ads.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Managing Your Preferences</h2>
            <p>You can adjust your cookie preferences at any time using our consent banner or by modifying your browser settings.</p>
          </section>
        </div>
      }
    />
  );
}
