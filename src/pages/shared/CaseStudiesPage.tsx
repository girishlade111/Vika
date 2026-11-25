import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { CASE_STUDIES } from '@/data/caseStudies';

export function CaseStudiesPage() {
  return (
    <SiteLayout
      title="Case studies | Results, on file | Vika"
      description="Four engagements across accounting, tax and audit, from a first UAE corporate tax return to one set of numbers for a group in two countries."
    >
      <header className="section-case-studies-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Case studies</span>
            </p>
            <p className="page-header_number text-style-label">Selected work</p>

            <h1 className="page-header_heading heading-style-display">
              Results, <span className="text-color-tertiary">on file.</span>
            </h1>

            <p className="page-header_lede text-size-large">
              Four engagements across accounting, tax and audit, from a first UAE corporate tax
              return to one set of numbers for a group in two countries.
            </p>

            <p className="page-header_status text-style-label">Client names withheld</p>
          </div>
        </div>
      </header>

      <section className="section-case-studies-list">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">All case studies</p>
              <h2 className="section-head_heading heading-style-h2">
                The problem, the work, <span className="text-color-tertiary">the result.</span>
              </h2>
            </div>

            <div className="case-cards_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {CASE_STUDIES.map((cs) => (
                <Link
                  key={cs.id}
                  to={`/case-studies/${cs.slug}`}
                  className="case-cards_card is-stack w-inline-block"
                >
                  <div className="case-cards_image-wrapper">
                    <img
                      src={cs.coverImage}
                      alt={cs.coverAlt}
                      loading="lazy"
                      className="case-cards_image"
                    />
                  </div>
                  <div className="case-cards_content">
                    <div className="case-cards_meta">
                      <p className="case-cards_meta-text text-style-label">{cs.sector}</p>
                      <p className="case-cards_meta-text text-style-label">{cs.location}</p>
                    </div>
                    <h3 className="case-cards_title heading-style-h3">{cs.title}</h3>
                    <p className="case-cards_result">{cs.summary}</p>
                    <div className="case-cards_metric">
                      <p className="case-cards_metric-value">{cs.primaryMetric.value}</p>
                      <p className="case-cards_metric-label text-style-label">
                        {cs.primaryMetric.label}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA
        headingPrimary="Recognise one of these?"
        headingMuted="Talk to a partner."
      />
    </SiteLayout>
  );
}
