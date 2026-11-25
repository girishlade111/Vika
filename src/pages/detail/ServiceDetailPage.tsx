import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { FAQSection } from '@/components/faq/FAQSection';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { usePricing } from '@/context/PricingContext';
import { useBooking } from '@/context/BookingContext';
import {
  getServiceBySlug,
  getPersonBySlug,
  getQuestionBySlug,
} from '@/data/cmsRelations';
import { CASE_STUDIES } from '@/data/caseStudies';
import { SERVICES } from '@/data/services';
import { PLANS } from '@/data/plans';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function ServiceDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const { formatAmount } = usePricing();
  const { openBooking } = useBooking();

  if (!service) {
    return <NotFoundPage />;
  }

  const leadPerson = getPersonBySlug(service.leadPersonSlug);
  const relatedCases = CASE_STUDIES.filter((cs) =>
    service.relatedCaseStudies.includes(cs.slug),
  );
  const relatedPlans = PLANS.filter((pl) => service.relatedPlans.includes(pl.slug));
  const relatedQuestions = service.relatedQuestions
    .map((qSlug) => getQuestionBySlug(qSlug))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <SiteLayout title={service.seo.title} description={service.seo.description}>
      <header className="section-service-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/services" className="page-header_crumb-link">
                Services
              </Link>
            </p>
            <p className="page-header_number text-style-label">{service.number}</p>

            <h1 className="page-header_heading heading-style-display">{service.name}</h1>

            <p className="page-header_lede text-size-large">
              From{' '}
              <strong>
                {formatAmount(service.startingPrice.AED, service.startingPrice.GBP)}
              </strong>{' '}
              {service.priceUnit}. {service.shortSummary}
            </p>

            <div className="page-header_actions">
              <VikaButton
                label="Book a call"
                hoverLabel="with a partner"
                variant="brand"
                onClick={() =>
                  openBooking({
                    serviceSlug: service.slug,
                    partnerSlug: service.leadPersonSlug,
                  })
                }
              />
              <Link to="/pricing" className="text-style-link">
                How fees work
              </Link>
            </div>

            <div className="page-header_media">
              <div className="page-header_image-wrapper">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="eager"
                  className="page-header_image"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-service-detail">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">(01) Included</p>
                <div className="detail_content">
                  <h2 className="heading-style-h2">
                    What you get, <span className="text-color-tertiary">every time.</span>
                  </h2>
                  <p className="detail_lead">{service.description}</p>
                  <div className="detail_rich w-richtext" style={{ marginTop: '1.5rem' }}>
                    <ul>
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">(02) How it runs</p>
                <div className="detail_content">
                  <div className="detail_facts">
                    {service.steps.map((step) => (
                      <div key={step.number} style={{ display: 'contents' }}>
                        <p className="detail_fact-label text-style-label">
                          {step.number} {step.title}
                        </p>
                        <p className="detail_fact-value">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">(03) Notes</p>
                <div className="detail_content">
                  <div className="detail_facts">
                    {service.notes.map((note) => (
                      <div key={note.number} style={{ display: 'contents' }}>
                        <p className="detail_fact-label text-style-label">
                          {note.number} {note.title}
                        </p>
                        <p className="detail_fact-value">{note.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {leadPerson && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">(04) Practice lead</p>
                  <div className="detail_content">
                    <Link to={`/people/${leadPerson.slug}`} className="service-lead_card">
                      <div className="service-lead_image-wrapper">
                        <img
                          src={leadPerson.portrait}
                          alt={leadPerson.name}
                          loading="lazy"
                          className="service-lead_image"
                        />
                      </div>
                      <div className="service-lead_body">
                        <p className="text-style-label text-color-secondary">
                          {leadPerson.office} · {leadPerson.role}
                        </p>
                        <h3 className="heading-style-h3" style={{ marginTop: '0.4rem' }}>
                          {leadPerson.name}
                        </h3>
                        <p className="text-color-secondary" style={{ marginTop: '0.5rem' }}>
                          {leadPerson.shortBiography}
                        </p>
                        <span className="text-style-link" style={{ marginTop: '0.75rem' }}>
                          Read profile
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {relatedPlans.length > 0 && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">(05) Plans</p>
                  <div className="detail_content">
                    <div className="detail_facts">
                      {relatedPlans.map((plan) => (
                        <div key={plan.id} style={{ display: 'contents' }}>
                          <p className="detail_fact-label text-style-label">
                            <Link to={`/plans/${plan.slug}`} className="text-style-link">
                              {plan.name}
                            </Link>
                          </p>
                          <p className="detail_fact-value">{plan.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <section className="section-service-cases">
          <div className="padding-global padding-section-large">
            <div className="grid-global">
              <div className="section-head">
                <p className="section-head_label text-style-label">Selected work</p>
                <h2 className="section-head_heading heading-style-h2">
                  How this looks <span className="text-color-tertiary">in practice.</span>
                </h2>
              </div>

              <div className="case-cards_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
                {relatedCases.map((cs) => (
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
      )}

      {relatedQuestions.length > 0 && (
        <FAQSection
          sectionLabel="Common questions"
          headingPrimary={`Questions on ${service.name.toLowerCase()},`}
          headingMuted="answered simply."
          questions={relatedQuestions}
        />
      )}

      <section className="section-service-other">
        <div className="padding-global padding-section-medium">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">Other practices</p>
              <h2 className="section-head_heading heading-style-h3">
                Everything else <span className="text-color-tertiary">under one roof.</span>
              </h2>
            </div>
            <div className="practices_list" style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
              {otherServices.map((other) => (
                <Link key={other.id} to={`/services/${other.slug}`} className="practices_row">
                  <span className="practices_number text-style-label">{other.number}</span>
                  <span className="practices_title heading-style-h3">{other.name}</span>
                  <span className="practices_summary text-color-secondary">
                    {other.shortSummary}
                  </span>
                  <span className="practices_link text-style-link">Open</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA
        headingPrimary={`Need ${service.name.toLowerCase()} sorted?`}
        headingMuted="Talk to the partner who runs it."
      />
    </SiteLayout>
  );
}
