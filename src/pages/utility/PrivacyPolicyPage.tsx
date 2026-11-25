import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';

export function PrivacyPolicyPage() {
  return (
    <SiteLayout
      title="Privacy Policy | How Vika handles your data"
      description="How Vika collects, uses and protects personal data for clients, applicants and visitors in the UAE and the UK, and the rights you have over it."
    >
      <header className="section-licensing-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Privacy Policy</span>
            </p>
            <p className="page-header_number text-style-label">Sample policy</p>
            <h1 className="page-header_heading heading-style-display">Privacy Policy</h1>
            <p className="page-header_lede text-size-large">
              How Vika collects, uses and protects personal data for clients, applicants and
              visitors in the UAE and the UK, and the rights you have over it.
            </p>
            <p className="page-header_status text-style-label">Updated 21 Oct 2026</p>
          </div>
        </div>
      </header>

      <section className="section-licensing-list">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="instructions_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">How we handle personal data</p>
                <div className="detail_content">
                  <p className="detail_lead">
                    This is sample wording for a fictional firm. Replace it with a policy written
                    for your business and reviewed by your own adviser before you publish. It is not
                    legal advice.
                  </p>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">01 Who we are</p>
                <div className="detail_content">
                  <h2 className="instructions_heading heading-style-h4">Controllers</h2>
                  <p className="text-color-secondary" style={{ marginTop: '0.75rem' }}>
                    Vika is an accounting, tax and audit studio with offices in Dubai and London. In
                    this policy, Vika, we and us mean Vika Accounting LLC in Dubai and Vika Audit
                    Ltd in London. The office you deal with is the controller of your personal data.
                    For any question about this policy, write to hello@vika.example.
                  </p>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">02 What we collect</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      <li>
                        Contact details you give us, such as your name, job title, email address,
                        phone number and company.
                      </li>
                      <li>
                        Identity documents and ownership records we must check before we accept a
                        client.
                      </li>
                      <li>
                        Accounting, payroll and tax records we need to keep your books and file
                        your returns.
                      </li>
                      <li>Messages and answers you send through the forms on this site.</li>
                      <li>
                        Basic technical data when you visit, such as your browser, device and the
                        pages you view.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">03 Lawful basis</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>Under UK GDPR we rely on four lawful bases:</p>
                    <ul>
                      <li>Contract, to deliver the accounting, tax and audit work you engage us for.</li>
                      <li>
                        Legal obligation, for anti money laundering checks, record keeping and
                        filings with HMRC, Companies House and the UAE Federal Tax Authority.
                      </li>
                      <li>
                        Legitimate interests, to reply to enquiries, run and secure our business and
                        improve this site, where your rights do not outweigh those interests.
                      </li>
                      <li>Consent, for optional cookies and our quarterly note.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">04 UAE PDPL & retention</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>
                      For clients and visitors in the UAE we process personal data in line with
                      Federal Decree Law No. 45 of 2021 on the Protection of Personal Data (or DIFC
                      and ADGM rules where applicable).
                    </p>
                    <p>
                      Engagement, tax and AML records are retained for five to seven years after the
                      engagement or tax period ends. Unconverted enquiries are removed after two
                      years.
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">05 Your rights & contact</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>
                      You may request access, correction, deletion, restriction, portability or
                      withdrawal of consent at any time. Write to hello@vika.example and we reply
                      within one month.
                    </p>
                    <p>
                      In the UK you may complain to the ICO at ico.org.uk. In the UAE you may
                      contact the UAE Data Office.
                    </p>
                    <p>
                      Email hello@vika.example, call Dubai on +971 4 000 0000 or London on +44 20
                      7946 0142, or write to Level 12, Vika House, Business Bay, Dubai, or 14 Vika
                      Yard, London EC1.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
