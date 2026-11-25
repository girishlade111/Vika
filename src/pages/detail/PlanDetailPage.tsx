import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { usePricing } from '@/context/PricingContext';
import { useBooking } from '@/context/BookingContext';
import { getPlanBySlug, getServiceBySlug, getQuestionBySlug } from '@/data/cmsRelations';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function PlanDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const plan = getPlanBySlug(slug);
  const { currency, billing, setCurrency, setBilling, formatAmount } = usePricing();
  const { openBooking } = useBooking();

  if (!plan) {
    return <NotFoundPage />;
  }

  const isRetainer = plan.kind === 'retainer';
  const aedPrice = isRetainer
    ? billing === 'Yearly'
      ? plan.prices.AED.yearly ?? plan.prices.AED.monthly ?? 0
      : plan.prices.AED.monthly ?? 0
    : plan.prices.AED.fixed ?? 0;

  const gbpPrice = isRetainer
    ? billing === 'Yearly'
      ? plan.prices.GBP.yearly ?? plan.prices.GBP.monthly ?? 0
      : plan.prices.GBP.monthly ?? 0
    : plan.prices.GBP.fixed ?? 0;

  const unitLabel = isRetainer
    ? billing === 'Yearly'
      ? plan.unitLabelYearly || 'per year, plus VAT'
      : plan.unitLabelMonthly || 'per month, plus VAT'
    : plan.unitLabelFixed || 'per engagement, plus VAT';

  const billingNote = isRetainer
    ? billing === 'Yearly'
      ? plan.noteYearly
      : plan.noteMonthly
    : 'Fees are fixed for twelve months and quoted before VAT. Anything outside the plan is agreed in writing first.';

  const relatedServices = plan.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedQuestions = plan.relatedQuestions
    .map((q) => getQuestionBySlug(q))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <SiteLayout title={plan.seo.title} description={plan.seo.description}>
      <header className="section-plan-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/pricing" className="page-header_crumb-link">
                Fees
              </Link>
            </p>
            <p className="page-header_number text-style-label">
              {plan.kind === 'project' ? 'Project' : 'Retainer'}
            </p>

            <h1 className="page-header_heading heading-style-h1">{plan.name}</h1>

            <p className="page-header_lede text-size-medium text-color-secondary">
              {plan.description}
            </p>

            <div className="page-header_actions" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
              <div className="pricing_switches" style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={`pricing-toggle_btn${currency === 'AED' ? ' is-active' : ''}`}
                  onClick={() => setCurrency('AED')}
                >
                  UAE (AED)
                </button>
                <button
                  type="button"
                  className={`pricing-toggle_btn${currency === 'GBP' ? ' is-active' : ''}`}
                  onClick={() => setCurrency('GBP')}
                >
                  UK (GBP)
                </button>
              </div>

              {isRetainer && (
                <div className="pricing_switches" style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className={`pricing-toggle_btn${billing === 'Monthly' ? ' is-active' : ''}`}
                    onClick={() => setBilling('Monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={`pricing-toggle_btn${billing === 'Yearly' ? ' is-active' : ''}`}
                    onClick={() => setBilling('Yearly')}
                  >
                    Yearly
                  </button>
                </div>
              )}

              <VikaButton
                label="Book a call"
                hoverLabel="for this plan"
                variant="brand"
                onClick={() => openBooking({ planSlug: plan.slug })}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="section-plan-detail">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">{plan.pricePrefix || 'From'}</p>
                <div className="detail_content">
                  <div className="plan-detail_price">
                    <p className="plan-detail_amount heading-style-h2">
                      {formatAmount(aedPrice, gbpPrice)}
                    </p>
                    <p className="text-size-small text-color-secondary">{unitLabel}</p>
                  </div>

                  <div className="plan-detail_features w-richtext" style={{ marginTop: '1.5rem' }}>
                    <p className="detail_label text-style-label" style={{ marginBottom: '0.75rem' }}>
                      What is included
                    </p>
                    <ul>
                      {plan.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {billingNote && (
                    <p className="text-size-small text-color-secondary" style={{ marginTop: '1rem' }}>
                      {billingNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">Who it is for</p>
                <div className="detail_content">
                  <p className="detail_lead">{plan.whoItIsFor}</p>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">How it works</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      {plan.howItWorks.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">Not included</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      {plan.notIncluded.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">The details</p>
                <div className="detail_content">
                  <div className="detail_facts">
                    <p className="detail_fact-label text-style-label">Your team</p>
                    <p className="detail_fact-value">{plan.teamSummary}</p>

                    <p className="detail_fact-label text-style-label">Turnaround</p>
                    <p className="detail_fact-value">{plan.turnaround}</p>

                    <p className="detail_fact-label text-style-label">Add ons</p>
                    <p className="detail_fact-value">{plan.addOns}</p>

                    <p className="detail_fact-label text-style-label">Terms</p>
                    <p className="detail_fact-value">{plan.terms}</p>

                    {relatedServices.length > 0 && (
                      <>
                        <p className="detail_fact-label text-style-label">Practices</p>
                        <p className="detail_fact-value">
                          {relatedServices.map((srv, idx) => (
                            <span key={srv.id}>
                              {idx > 0 && ' · '}
                              <Link to={`/services/${srv.slug}`} className="text-style-link">
                                {srv.name}
                              </Link>
                            </span>
                          ))}
                        </p>
                      </>
                    )}

                    {relatedQuestions.length > 0 && (
                      <>
                        <p className="detail_fact-label text-style-label">Related questions</p>
                        <p className="detail_fact-value">
                          {relatedQuestions.map((q, idx) => (
                            <span key={q.id}>
                              {idx > 0 && ' · '}
                              <Link to={`/questions/${q.slug}`} className="text-style-link">
                                {q.question}
                              </Link>
                            </span>
                          ))}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA headingPrimary="Get a fixed quote" headingMuted="in one call." />
    </SiteLayout>
  );
}
