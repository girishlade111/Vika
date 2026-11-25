import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { getCaseStudyBySlug, getPersonBySlug, getServiceBySlug } from '@/data/cmsRelations';
import { CASE_STUDIES } from '@/data/caseStudies';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function CaseStudyDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <NotFoundPage />;
  }

  const relatedPeople = study.relatedPeople
    .map((pSlug) => getPersonBySlug(pSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedServices = study.relatedServices
    .map((sSlug) => getServiceBySlug(sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const moreStudies = CASE_STUDIES.filter((cs) => cs.slug !== study.slug).slice(0, 2);

  return (
    <SiteLayout title={study.seo.title} description={study.seo.description}>
      <header className="section-case-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/case-studies" className="page-header_crumb-link">
                Case studies
              </Link>
            </p>
            <p className="page-header_number text-style-label">Case study</p>

            <h1 className="page-header_heading heading-style-h1">{study.title}</h1>

            <p className="page-header_lede text-size-large">{study.summary}</p>

            <div className="case-hero_facts">
              <div className="case-hero_fact">
                <p className="text-style-label text-color-secondary">Client</p>
                <p className="text-weight-medium">{study.client}</p>
              </div>
              <div className="case-hero_fact">
                <p className="text-style-label text-color-secondary">Sector</p>
                <p className="text-weight-medium">{study.sector}</p>
              </div>
              <div className="case-hero_fact">
                <p className="text-style-label text-color-secondary">Location</p>
                <p className="text-weight-medium">{study.location}</p>
              </div>
              <div className="case-hero_fact">
                <p className="text-style-label text-color-secondary">Year</p>
                <p className="text-weight-medium">{study.year}</p>
              </div>
              <div className="case-hero_fact">
                <p className="text-style-label text-color-secondary">Engagement</p>
                <p className="text-weight-medium">{study.engagement}</p>
              </div>
              <div className="case-hero_fact">
                <p className="text-style-label text-color-secondary">Led by</p>
                <p className="text-weight-medium">{study.practice}</p>
              </div>
            </div>

            <div className="page-header_media">
              <div className="page-header_image-wrapper">
                <img
                  src={study.coverImage}
                  alt={study.coverAlt}
                  loading="eager"
                  className="page-header_image"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-case-metrics">
        <div className="padding-global padding-section-medium">
          <div className="grid-global">
            <div className="case-metrics_grid" style={{ gridColumn: '1 / -1' }}>
              {study.metrics.map((m) => (
                <div key={m.label} className="case-metrics_item">
                  <p className="case-metrics_value heading-style-h1">{m.value}</p>
                  <p className="case-metrics_label text-style-label text-color-secondary">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-case-detail">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">(01) In short</p>
                <div className="detail_content">
                  <p className="detail_lead">{study.inShort}</p>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">(02) The challenge</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    {study.challenge.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">(03) What we did</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      {study.whatWeDid.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">(04) The outcome</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    {study.outcome.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">In their words</p>
                <div className="detail_content">
                  <div className="case-quote_block">
                    <div className="case-quote_image-wrapper">
                      <img
                        src={study.secondaryImage}
                        alt={study.secondaryAlt}
                        loading="lazy"
                        className="case-quote_image"
                      />
                    </div>
                    <div>
                      <blockquote className="heading-style-h3">
                        &ldquo;{study.quotation}&rdquo;
                      </blockquote>
                      <p className="text-style-label text-color-secondary" style={{ marginTop: '1rem' }}>
                        {study.attribution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">(05) The team</p>
                <div className="detail_content">
                  <p className="detail_lead">Who did the work.</p>
                  <div className="detail_facts" style={{ marginTop: '1.25rem' }}>
                    <p className="detail_fact-label text-style-label">People</p>
                    <p className="detail_fact-value">
                      {study.teamSummary}
                      {relatedPeople.length > 0 && (
                        <span style={{ display: 'block', marginTop: '0.5rem' }}>
                          {relatedPeople.map((person, i) => (
                            <span key={person.id}>
                              {i > 0 && ' · '}
                              <Link to={`/people/${person.slug}`} className="text-style-link">
                                {person.name}
                              </Link>
                            </span>
                          ))}
                        </span>
                      )}
                    </p>
                    <p className="detail_fact-label text-style-label">Practices</p>
                    <p className="detail_fact-value">
                      {study.practicesSummary}
                      {relatedServices.length > 0 && (
                        <span style={{ display: 'block', marginTop: '0.5rem' }}>
                          {relatedServices.map((srv, i) => (
                            <span key={srv.id}>
                              {i > 0 && ' · '}
                              <Link to={`/services/${srv.slug}`} className="text-style-link">
                                {srv.name}
                              </Link>
                            </span>
                          ))}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-case-more">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(06) More work</p>
              <h2 className="section-head_heading heading-style-h2">
                Other <span className="text-color-tertiary">case studies.</span>
              </h2>
            </div>

            <div className="case-cards_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {moreStudies.map((cs) => (
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

            <div className="case-more_footer">
              <Link to="/case-studies" className="text-style-link">
                All case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA
        headingPrimary="Recognise the problem?"
        headingMuted="Let us talk it through."
      />
    </SiteLayout>
  );
}
