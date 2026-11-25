import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';

type InstructionTab = 'design' | 'content' | 'animations';

const LAUNCH_CHECKLIST = [
  'Keep one Home, Studio and Contact layout family active, or link all three via the layout switcher.',
  'Replace sample names, client metrics, telephone numbers and vika.example addresses with verified firm details.',
  'Update UAE and UK filing calendar dates each January against Federal Tax Authority and HMRC notices.',
  'Replace sample privacy policy text with legal copy reviewed by your data protection adviser.',
  'Set environment variables VITE_CONTACT_ENDPOINT and VITE_BOOKING_ENDPOINT if wiring a live CRM webhook.',
];

export function InstructionsPage() {
  const [activeTab, setActiveTab] = useState<InstructionTab>('design');

  return (
    <SiteLayout
      title="Instructions | Template guide | Vika"
      description="How Vika is structured across Client-First tokens, seven CMS collections and GSAP interactions."
    >
      <header className="section-instructions-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Instructions</span>
            </p>
            <p className="page-header_number text-style-label">Template guide</p>
            <h1 className="page-header_heading heading-style-display">Instructions</h1>
            <p className="page-header_lede text-size-large">
              Pick a tab: Design, Content or Animations. The launch checklist sits below them.
            </p>

            <div className="page-header_actions" style={{ gap: '0.5rem' }}>
              <button
                type="button"
                className={`pricing-toggle_btn${activeTab === 'design' ? ' is-active' : ''}`}
                onClick={() => setActiveTab('design')}
              >
                Design
              </button>
              <button
                type="button"
                className={`pricing-toggle_btn${activeTab === 'content' ? ' is-active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button
                type="button"
                className={`pricing-toggle_btn${activeTab === 'animations' ? ' is-active' : ''}`}
                onClick={() => setActiveTab('animations')}
              >
                Animations
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="section-instructions-body">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            {activeTab === 'design' && (
              <div className="instructions_list">
                <div className="detail_component">
                  <p className="detail_label text-style-label">01 Structure</p>
                  <div className="detail_content">
                    <h2 className="instructions_heading heading-style-h4">Built on Client First</h2>
                    <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                      <p>
                        Every page runs Header, main sections and Footer. Each section uses{' '}
                        <code>padding-global</code> and the 12-column <code>grid-global</code>.
                      </p>
                      <p>
                        Home, Studio and Contact come in three layouts: Classic, Cinematic and
                        Statement. Every layout reads from the same semantic tokens.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="detail_component">
                  <p className="detail_label text-style-label">02 Colour and type</p>
                  <div className="detail_content">
                    <h2 className="instructions_heading heading-style-h4">
                      Change the brand in Variables
                    </h2>
                    <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                      <p>
                        Colours, radii and typography scales live in <code>src/styles/tokens.css</code>
                        . Editing Burgundy 700 (<code>#4c2218</code>) updates buttons and accent
                        highlights across every layout.
                      </p>
                      <p>
                        Familjen Grotesk sets display and body text, while DM Mono sets tabular
                        numbers, labels and office clocks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="detail_component">
                  <p className="detail_label text-style-label">03 Components</p>
                  <div className="detail_content">
                    <h2 className="instructions_heading heading-style-h4">
                      Edit once, update everywhere
                    </h2>
                    <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                      <ul>
                        <li>
                          <strong>VikaButton</strong>: Supports dark, brand, light and secondary
                          variants with sliding circular arrow hover indicator.
                        </li>
                        <li>
                          <strong>Header</strong>: Fullscreen dark navigation drawer with live Dubai
                          and London analog/digital clocks plus bottom floating dock pill.
                        </li>
                        <li>
                          <strong>Footer & Explore Vika</strong>: Multi-column sitemap, live office
                          directory, validated newsletter form and Tour Drawer.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="instructions_list">
                <div className="detail_component">
                  <p className="detail_label text-style-label">01 CMS collections</p>
                  <div className="detail_content">
                    <h2 className="instructions_heading heading-style-h4">
                      Seven collections run the site
                    </h2>
                    <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                      <ul>
                        <li>
                          <strong>Services</strong>: Accounting, Tax and Audit pages and home rows.
                        </li>
                        <li>
                          <strong>Insights</strong>: Long-form studio notes with reading times and
                          author bios.
                        </li>
                        <li>
                          <strong>People</strong>: Partner and manager profiles in Dubai and London.
                        </li>
                        <li>
                          <strong>Plans</strong>: Retainer tiers and fixed-fee projects with UAE/UK
                          pricing.
                        </li>
                        <li>
                          <strong>Deadlines</strong>: UAE FTA and UK HMRC/Companies House filing
                          dates.
                        </li>
                        <li>
                          <strong>Case Studies</strong>: Client metrics, challenge, outcome and
                          quotations.
                        </li>
                        <li>
                          <strong>Questions</strong>: Contextual FAQs across Home, Services and
                          Pricing.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="detail_component">
                  <p className="detail_label text-style-label">02 Pricing & Clocks</p>
                  <div className="detail_content">
                    <h2 className="instructions_heading heading-style-h4">
                      Single data source in src/data/
                    </h2>
                    <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                      <p>
                        Edit <code>src/data/plans.ts</code> to change monthly or yearly AED/GBP fees
                        everywhere. Office hours and IANA timezones live in{' '}
                        <code>src/data/offices.ts</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'animations' && (
              <div className="instructions_list">
                <div className="detail_component">
                  <p className="detail_label text-style-label">01 GSAP & ScrollTrigger</p>
                  <div className="detail_content">
                    <h2 className="instructions_heading heading-style-h4">
                      Registered once, cleaned up per route
                    </h2>
                    <div className="detail_rich w-richtext" style={{ marginTop: '1rem' }}>
                      <p>
                        Scroll reveals, hairline divider sweeps, KPI counters and floating pill
                        visibility run through <code>gsap.context()</code> in{' '}
                        <code>src/animations/gsapSetup.ts</code>.
                      </p>
                      <p>
                        Respecting <code>prefers-reduced-motion: reduce</code> is mandatory: motion
                        timelines automatically resolve immediately without hiding elements when
                        reduced motion is active.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="detail_list" style={{ marginTop: '4rem' }}>
              <div className="detail_component">
                <p className="detail_label text-style-label">Launch checklist</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      {LAUNCH_CHECKLIST.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
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
