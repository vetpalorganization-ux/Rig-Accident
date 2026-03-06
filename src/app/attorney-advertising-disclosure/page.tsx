import LegalPage from '@/components/LegalPage';

export default function AttorneyAdvertisingDisclosurePage() {
  return (
    <LegalPage
      title="Attorney Advertising Disclosure"
      lastUpdated="March 6, 2026"
      content={
        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4">Attorney Advertising Notice</h2>
            <p>This website may be considered attorney advertising in some jurisdictions.</p>
          </section>

          <section>
            <p>
              RigAccident.com is a lawyer matching service that connects individuals who may have been involved in truck accidents with independent attorneys.
            </p>
          </section>

          <section>
            <p>
              RigAccident.com is not a law firm and does not provide legal representation or legal advice.
            </p>
          </section>

          <section>
            <p>
              Submitting information through this website does not create an attorney-client relationship.
            </p>
            <p>
              Any attorney-client relationship is formed only after direct agreement between a user and a licensed attorney.
            </p>
          </section>

          <section>
            <p>Prior results do not guarantee a similar outcome.</p>
            <p>Each case is different and must be evaluated on its own facts.</p>
          </section>

          <section>
            <p>
              Attorneys participating in the network may pay advertising or marketing fees to participate in the lawyer matching system.
            </p>
            <p>
              Users are under no obligation to hire any attorney who contacts them.
            </p>
          </section>

          <section>
            <p>
              If you have questions regarding this disclosure you may contact:{' '}
              <a href="mailto:legal@rigaccident.com" className="text-blue-600 underline">legal@rigaccident.com</a>
            </p>
          </section>
        </div>
      }
    />
  );
}
