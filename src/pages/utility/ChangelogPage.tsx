import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';

const RELEASE_ITEMS = [
  'Index, Studio and Contact, each in three layouts: Classic, Cinematic and Statement. Services, Insights, Pricing, Case studies and Team.',
  'Service, Insight, Case Study, People, Plans, Questions and Deadlines CMS templates, with a full profile page for every team member.',
  'Tax calendar for the UAE and the UK, fee plans, case studies, questions and team across all seven collections.',
  'GSAP page reveals, scroll scenes, animated metrics and interactive drawers with full prefers-reduced-motion support.',
  'Client-First design system, semantic colour ramps, spacing, type and size scales across Desktop, Tablet and Mobile breakpoints.',
  'Style guide, Instructions, Privacy Policy, Licenses, Changelog, 404, Password and system Overview pages.',
  'Live timezone-aware Dubai (Asia/Dubai) and London (Europe/London) office clocks and timezone-aware booking flow.',
];

export function ChangelogPage() {
  return (
    <SiteLayout
      title="Changelog | Version history | Vika"
      description="Every change to Vika, newest first."
    >
      <header className="section-changelog-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Changelog</span>
            </p>
            <p className="page-header_number text-style-label">Release history</p>
            <h1 className="page-header_heading heading-style-display">Changelog</h1>
            <p className="page-header_lede text-size-large">
              Every change to Vika, newest first.
            </p>
          </div>
        </div>
      </header>

      <section className="section-changelog-list">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">Version 1.0 · 22 October 2026</p>
                <div className="detail_content">
                  <h2 className="heading-style-h3">First release</h2>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1.25rem' }}>
                    <ul>
                      {RELEASE_ITEMS.map((item) => (
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
