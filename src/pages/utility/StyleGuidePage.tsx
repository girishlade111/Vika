import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';

const COLOR_TOKENS = [
  { name: 'Neutral 50 (Card)', varName: '--_primitives---neutral--50', hex: '#fbfaf8' },
  { name: 'Neutral 100 (Paper)', varName: '--_primitives---neutral--100', hex: '#f3f2ee' },
  { name: 'Neutral 200 (Secondary)', varName: '--_primitives---neutral--200', hex: '#e9e7e1' },
  { name: 'Neutral 400 (Muted)', varName: '--_primitives---neutral--400', hex: '#9c9b92' },
  { name: 'Neutral 500 (Tertiary)', varName: '--_primitives---neutral--500', hex: '#6e6d67' },
  { name: 'Neutral 600 (Secondary Text)', varName: '--_primitives---neutral--600', hex: '#5f5e58' },
  { name: 'Neutral 900 (Ink)', varName: '--_primitives---neutral--900', hex: '#121211' },
  { name: 'Neutral 950 (Footer)', varName: '--_primitives---neutral--950', hex: '#0f0f0e' },
  { name: 'Burgundy 300 (Dark Accent)', varName: '--_primitives---burgundy--300', hex: '#d9a493' },
  { name: 'Burgundy 700 (Primary Accent)', varName: '--_primitives---burgundy--700', hex: '#4c2218' },
  { name: 'Status Green (Dubai Open)', varName: '--_primitives---green', hex: '#4ade80' },
];

export function StyleGuidePage() {
  return (
    <SiteLayout
      title="Style guide | Vika design system tokens and components"
      description="Reference for Vika typography, color primitives, semantic variables, buttons, containers and form elements."
    >
      <header className="section-style-guide-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Style guide</span>
            </p>
            <p className="page-header_number text-style-label">Design system</p>
            <h1 className="page-header_heading heading-style-display">Style guide</h1>
            <p className="page-header_lede text-size-large">
              Client-First typography, color primitives, button variants, form controls and layout
              spacing tokens used across every Vika page.
            </p>
          </div>
        </div>
      </header>

      <section className="section-style-guide-body">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">01 Colour palette</p>
                <div className="detail_content">
                  <div className="detail_facts">
                    {COLOR_TOKENS.map((token) => (
                      <div key={token.name} style={{ display: 'contents' }}>
                        <p className="detail_fact-label text-style-label">{token.name}</p>
                        <div
                          className="detail_fact-value"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        >
                          <span
                            style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              borderRadius: '0.25rem',
                              backgroundColor: token.hex,
                              border: '1px solid rgba(18, 18, 17, 0.2)',
                              display: 'inline-block',
                            }}
                          />
                          <code className="text-style-label">{token.hex}</code>
                          <span className="text-color-secondary text-size-small">
                            {token.varName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">02 Typography scale</p>
                <div className="detail_content">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <p className="text-style-label text-color-secondary">heading-style-display</p>
                      <p className="heading-style-display">130px Display</p>
                    </div>
                    <div>
                      <p className="text-style-label text-color-secondary">heading-style-h1</p>
                      <p className="heading-style-h1">Heading H1 (80px)</p>
                    </div>
                    <div>
                      <p className="text-style-label text-color-secondary">heading-style-h2</p>
                      <p className="heading-style-h2">Heading H2 (56px)</p>
                    </div>
                    <div>
                      <p className="text-style-label text-color-secondary">heading-style-h3</p>
                      <p className="heading-style-h3">Heading H3 (32px)</p>
                    </div>
                    <div>
                      <p className="text-style-label text-color-secondary">heading-style-h4</p>
                      <p className="heading-style-h4">Heading H4 (24px)</p>
                    </div>
                    <div>
                      <p className="text-style-label text-color-secondary">
                        text-size-large / regular / small / text-style-label
                      </p>
                      <p className="text-size-large">
                        Large body copy (20px) in Familjen Grotesk for editorial ledes.
                      </p>
                      <p className="text-size-regular" style={{ marginTop: '0.5rem' }}>
                        Regular body copy (16px) in Familjen Grotesk with comfortable leading.
                      </p>
                      <p
                        className="text-style-label text-color-secondary"
                        style={{ marginTop: '0.75rem' }}
                      >
                        DM MONO 11.5PX UPPERCASE METADATA LABEL
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">03 Buttons</p>
                <div className="detail_content">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <VikaButton label="Primary dark" hoverLabel="variant" variant="dark" to="/" />
                    <VikaButton label="Brand accent" hoverLabel="burgundy" variant="brand" to="/pricing" />
                    <VikaButton
                      label="Secondary pill"
                      hoverLabel="outline"
                      variant="secondary"
                      to="/services"
                    />
                    <VikaButton label="Small dark" variant="dark" size="small" to="/contact" />
                  </div>
                  <div
                    style={{
                      marginTop: '1.5rem',
                      padding: '1.5rem',
                      backgroundColor: '#121211',
                      borderRadius: '0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    <VikaButton label="Light surface" hoverLabel="on dark" variant="light" to="/cinematic/home-cinematic" />
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
