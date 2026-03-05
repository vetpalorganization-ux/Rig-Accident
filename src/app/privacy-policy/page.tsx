import LegalPage from '@/components/LegalPage';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="March 5, 2026"
      content={
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>RigAccident.com (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you visit our website.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us through our lead capture forms, calculator, and chat assistant, including your name, phone number, email address, and accident details.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">3. GDPR Compliance</h2>
            <p>For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have the right to access, rectify, or erase your personal data.</p>
          </section>
        </div>
      }
    />
  );
}
