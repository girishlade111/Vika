import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';

export function NotFoundPage() {
  return (
    <SiteLayout
      title="Page not found | Vika accounting, tax and audit studio"
      description="The page you were looking for is not on file. It may have moved, or the link is out of date. Head back to the Vika index or read the latest studio notes."
    >
      <section className="section-404-hero">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div style={{ gridColumn: '1 / -1', maxWidth: '42rem' }}>
              <p className="text-style-label text-color-secondary">Error 404 · Not found</p>
              <h1 className="heading-style-display" style={{ marginTop: '1.25rem' }}>
                This page is <span className="text-color-tertiary">not on file.</span>
              </h1>
              <p className="text-size-large text-color-secondary" style={{ marginTop: '1.5rem' }}>
                The link may be out of date, or the page has moved. Everything else is where you
                left it.
              </p>
              <div
                style={{
                  marginTop: '2.25rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  alignItems: 'center',
                }}
              >
                <VikaButton
                  label="Back to the index"
                  hoverLabel="and start over"
                  variant="brand"
                  to="/"
                />
                <Link to="/insights" className="text-style-link">
                  Read the insights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
