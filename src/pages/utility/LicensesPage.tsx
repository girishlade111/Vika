import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';

export function LicensesPage() {
  return (
    <SiteLayout
      title="Licenses | Fonts, media and sample copy | Vika"
      description="Origin and licensing attribution for Vika typography, UI geometry, bespoke imagery, video and sample legal copy."
    >
      <header className="section-licensing-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Licenses</span>
            </p>
            <p className="page-header_number text-style-label">Attribution</p>
            <h1 className="page-header_heading heading-style-display">Licenses</h1>
            <p className="page-header_lede text-size-large">
              All graphical assets, fonts, photography and sample content in Vika are either open
              source or originally generated for this project.
            </p>
          </div>
        </div>
      </header>

      <section className="section-licensing-list">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="instructions_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">01 Typography</p>
                <div className="detail_content">
                  <h2 className="instructions_heading heading-style-h4">
                    Familjen Grotesk and DM Mono
                  </h2>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                    <p>
                      Vika uses <strong>Familjen Grotesk</strong> (400, 500, 600, 700) for display
                      and editorial body text, paired with <strong>DM Mono</strong> (300, 400, 500)
                      for metadata, labels, tabular pricing and office clocks. Both typefaces are
                      licensed under the SIL Open Font License (OFL).
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">02 Icons and graphics</p>
                <div className="detail_content">
                  <h2 className="instructions_heading heading-style-h4">CSS geometry and marks</h2>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                    <p>
                      UI arrows, hairline rules, analog clock hands, checkbox checkmarks and
                      progress indicators are built directly with SVG and CSS geometry without
                      external icon pack dependencies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">03 Photography and film</p>
                <div className="detail_content">
                  <h2 className="instructions_heading heading-style-h4">
                    Editorial studio imagery
                  </h2>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                    <p>
                      Studio scenes, architectural office views, partner portraits and still life
                      compositions (including Dubai Business Bay, London EC1, meeting room stills
                      and document scenes) were created specifically for the reference template via
                      Higgsfield GPT Image 2.5 and Seedance 2.5 video generation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">04 Motion</p>
                <div className="detail_content">
                  <h2 className="instructions_heading heading-style-h4">
                    GSAP and ScrollTrigger
                  </h2>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                    <p>
                      Scroll scenes, text reveals, counters and interactive drawers are powered by
                      GSAP (Standard License, including Webflow distribution).
                    </p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">05 Sample copy and figures</p>
                <div className="detail_content">
                  <h2 className="instructions_heading heading-style-h4">
                    Fictional firm and demonstration data
                  </h2>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                    <p>
                      Vika Accounting LLC, Vika Audit Ltd, its partners, client metrics and pricing
                      examples are fictional demonstration content. UAE and UK tax dates reflect
                      published 2026 guidance as general illustration only and must be verified with
                      a qualified practitioner before reliance.
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
