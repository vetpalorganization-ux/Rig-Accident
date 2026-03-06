import LegalPage from '@/components/LegalPage';

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="March 6, 2026"
      content={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device that help us provide and improve our services. We also use similar technologies like pixels and local storage for analytics and performance.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Necessary Cookies:</strong> Required for core site functions (e.g., form submissions, preference storage).</li>
              <li><strong>Performance & Analytics Cookies:</strong> Help us understand how visitors interact with our site (e.g., page views, clicks, referrers) so we can improve speed, usability, and content.</li>
              <li><strong>Marketing Cookies:</strong> May be used to measure campaign effectiveness and deliver relevant ads where applicable.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Analytics Tracking</h2>
            <p>Analytics tools set cookies or use similar identifiers to collect usage information in aggregate. This includes anonymized or pseudonymized data about the pages you visit and actions you take, which we use to enhance performance and user experience.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Managing Your Preferences</h2>
            <p>You can adjust your cookie preferences at any time using our consent banner or by modifying your browser settings to block or delete cookies. Most browsers provide options to manage cookies; disabling cookies may impact some site functionality.</p>
          </section>
        </div>
      }
    />
  );
}
