import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { QuoteSlider } from '@/components/testimonials/QuoteSlider';
import { FAQSection } from '@/components/faq/FAQSection';
import { PartnerCloseCard } from '@/components/cta/PartnerCloseCard';
import {
  EXTRA_FEES,
  PLAN_COMPARISON_ROWS,
  PLANS,
  PRICING_BILLING_STEPS,
} from '@/data/plans';
import { SITE_CONFIG } from '@/data/siteConfig';
import { usePricing } from '@/context/PricingContext';

export function PricingPage() {
  const { currency, region, billing, setRegion, setBilling } = usePricing();

  const retainers = PLANS.filter((p) => p.kind === 'retainer');
  const projects = PLANS.filter((p) => p.kind === 'project');

  const formatMoney = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-GB').format(amount);
    return currency === 'GBP' ? `£${formatted}` : `AED ${formatted}`;
  };

  return (
    <SiteLayout
      title="Pricing | Vika fixed fees for UAE and UK companies"
      description="Three monthly plans and three fixed fee projects, in AED for the UAE or GBP for the UK."
    >
      <div data-pricing-region={region} data-pricing-billing={billing}>
        {/* 1. Pricing Header + Interactive Toggles */}
        <header className="section-pricing-header">
          <div className="padding-global">
            <div className="grid-global">
              <p className="page-header_crumb text-style-label">
                <Link to="/" className="page-header_crumb-link">
                  Index
                </Link>
                <span aria-hidden="true">/</span>
                <span>Pricing</span>
              </p>
              <p className="page-header_number text-style-label">(01) Pricing</p>

              <h1 className="page-header_heading heading-style-display">
                Know your fee <span className="text-color-tertiary">before the first call.</span>
              </h1>

              <p className="page-header_lede text-size-large">
                Three monthly plans and three fixed fee projects, in AED for the UAE or GBP for the
                UK. Every fee is agreed up front, reviewed once a year and never billed by the hour.
              </p>

              <div className="pricing-toggle_component">
                <div className="pricing-toggle_groups">
                  <div className="pricing-toggle_group">
                    <p id="pricing-region-label" className="text-style-label">
                      Prices for
                    </p>
                    <div
                      role="group"
                      aria-labelledby="pricing-region-label"
                      className="pricing-toggle_switch"
                    >
                      <button
                        type="button"
                        data-region="UAE"
                        aria-pressed={region === 'UAE'}
                        className={`pricing-toggle_option ${region === 'UAE' ? 'is-active' : ''}`}
                        onClick={() => setRegion('UAE')}
                      >
                        UAE, in AED
                      </button>
                      <button
                        type="button"
                        data-region="UK"
                        aria-pressed={region === 'UK'}
                        className={`pricing-toggle_option ${region === 'UK' ? 'is-active' : ''}`}
                        onClick={() => setRegion('UK')}
                      >
                        UK, in GBP
                      </button>
                    </div>
                  </div>

                  <div className="pricing-toggle_group">
                    <p id="pricing-billing-label" className="text-style-label">
                      Billing
                    </p>
                    <div
                      role="group"
                      aria-labelledby="pricing-billing-label"
                      className="pricing-toggle_switch"
                    >
                      <button
                        type="button"
                        data-billing="Monthly"
                        aria-pressed={billing === 'Monthly'}
                        className={`pricing-toggle_option ${billing === 'Monthly' ? 'is-active' : ''}`}
                        onClick={() => setBilling('Monthly')}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        data-billing="Yearly"
                        aria-pressed={billing === 'Yearly'}
                        className={`pricing-toggle_option ${billing === 'Yearly' ? 'is-active' : ''}`}
                        onClick={() => setBilling('Yearly')}
                      >
                        Yearly, two months free
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-style-label">
                  Fees exclude VAT. Fixed up front. Never billed by the hour.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* 2. Monthly Plans + Fixed-Fee Projects */}
        <section id="plans" className="section-pricing-plans">
          <div className="padding-global padding-section-bottom">
            <div className="grid-global">
              <div className="pricing-plans_head">
                <h2 className="text-style-label">(02) Monthly plans</h2>
                <p className="text-style-label">
                  {billing === 'Monthly'
                    ? 'Billed monthly in advance'
                    : 'Billed yearly, two months free'}
                </p>
              </div>

              <div className="pricing-plans_list" style={{ gridColumn: '1 / -1' }}>
                {retainers.map((plan) => {
                  const amount =
                    billing === 'Yearly'
                      ? plan.prices[currency].yearly ?? 0
                      : plan.prices[currency].monthly ?? 0;

                  return (
                    <article key={plan.id} className="pricing-plans_item fees_card">
                      <div
                        className="fees_card-content"
                        style={
                          plan.highlighted
                            ? { backgroundColor: '#4C2218', color: '#ECEBE6' }
                            : undefined
                        }
                      >
                        <div className="fees_card-top">
                          <h3 className="fees_card-name heading-style-h3">{plan.name}</h3>
                          <div className="pricing-plans_tags">
                            {plan.badge && (
                              <div
                                className="fees_card-tag"
                                style={{ color: '#4C2218', backgroundColor: '#ECEBE6' }}
                              >
                                {plan.badge}
                              </div>
                            )}
                          </div>
                        </div>

                        <p
                          className="fees_card-description text-size-regular text-color-secondary"
                          style={
                            plan.highlighted ? { color: 'rgba(236, 235, 230, 0.78)' } : undefined
                          }
                        >
                          {plan.description}
                        </p>

                        <div className="fees_card-price">
                          <p
                            className="fees_card-label text-style-label"
                            style={
                              plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined
                            }
                          >
                            {plan.pricePrefix}
                          </p>
                          <p className="fees_card-amount">{formatMoney(amount)}</p>
                          <p
                            className="fees_card-label text-style-label"
                            style={
                              plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined
                            }
                          >
                            {billing === 'Monthly' ? plan.unitLabelMonthly : plan.unitLabelYearly}
                          </p>
                        </div>

                        <div className="pricing-plans_note">
                          <p
                            className="fees_card-note text-size-small"
                            style={
                              plan.highlighted ? { color: 'rgba(236, 235, 230, 0.78)' } : undefined
                            }
                          >
                            {billing === 'Monthly' ? plan.noteMonthly : plan.noteYearly}
                          </p>
                        </div>

                        <div
                          className="fees_card-features text-rich-text text-size-small text-color-secondary w-richtext"
                          style={
                            plan.highlighted ? { color: 'rgba(236, 235, 230, 0.85)' } : undefined
                          }
                        >
                          <ul>
                            {plan.deliverables.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="fees_card-button-wrapper">
                          <VikaButton
                            label="Choose this plan"
                            hoverLabel="talk it through"
                            to={`/plans/${plan.slug}`}
                            variant={plan.highlighted ? 'light' : 'dark'}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Fixed-fee projects */}
              <div className="pricing-plans_head" style={{ marginTop: '4.5rem' }}>
                <h2 className="text-style-label">Projects, quoted once</h2>
                <p className="text-style-label">Half at the start, half on delivery</p>
              </div>

              <div
                className="pricing-project_list"
                style={{
                  gridColumn: '1 / -1',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {projects.map((proj) => {
                  const amount = proj.prices[currency].fixed ?? 0;
                  return (
                    <article
                      key={proj.id}
                      className="pricing-project_card"
                      style={
                        proj.highlighted
                          ? { backgroundColor: '#4C2218', color: '#ECEBE6' }
                          : undefined
                      }
                    >
                      <h3 className="heading-style-h4">{proj.name}</h3>
                      <p
                        className="pricing-project_text text-size-small text-color-secondary"
                        style={proj.highlighted ? { color: 'rgba(236,235,230,0.78)' } : undefined}
                      >
                        {proj.description}
                      </p>
                      <div style={{ margin: '1rem 0' }}>
                        <p
                          className="fees_card-label text-style-label"
                          style={proj.highlighted ? { color: 'rgba(236,235,230,0.7)' } : undefined}
                        >
                          {proj.pricePrefix}
                        </p>
                        <p className="pricing-project_amount">{formatMoney(amount)}</p>
                        <p
                          className="fees_card-label text-style-label"
                          style={proj.highlighted ? { color: 'rgba(236,235,230,0.7)' } : undefined}
                        >
                          {proj.unitLabelFixed}
                        </p>
                      </div>
                      <div
                        className="text-rich-text text-size-small text-color-secondary w-richtext"
                        style={proj.highlighted ? { color: 'rgba(236,235,230,0.85)' } : undefined}
                      >
                        <ul>
                          {proj.deliverables.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ marginTop: '1.5rem' }}>
                        <VikaButton
                          label="View project scope"
                          hoverLabel="fixed quote"
                          to={`/plans/${proj.slug}`}
                          variant={proj.highlighted ? 'light' : 'dark'}
                          size="small"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Plan Comparison Table */}
        <section className="section-pricing-compare">
          <div className="padding-global padding-section-large">
            <div className="grid-global">
              <div className="section-head">
                <p className="section-head_label text-style-label">(03) Compare</p>
                <h2 className="section-head_heading heading-style-h2">
                  Plan by plan, <span className="text-color-tertiary">line by line.</span>
                </h2>
              </div>

              <div style={{ gridColumn: '1 / -1', overflowX: 'auto', marginTop: '2.5rem' }}>
                <table style={{ width: '100%', minWidth: '46rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color--border-primary)', textAlign: 'left' }}>
                      <th className="text-style-label" style={{ padding: '1rem 0.5rem 1rem 0', width: '34%' }}>
                        What you get
                      </th>
                      {retainers.map((plan) => {
                        const amount =
                          billing === 'Yearly'
                            ? plan.prices[currency].yearly ?? 0
                            : plan.prices[currency].monthly ?? 0;
                        return (
                          <th key={plan.id} style={{ padding: '1rem 0.5rem', verticalAlign: 'bottom' }}>
                            <p className="pricing-compare_plan-name">{plan.name}</p>
                            <p className="text-style-label">
                              {formatMoney(amount)} {billing === 'Monthly' ? 'a month' : 'a year'}
                            </p>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {PLAN_COMPARISON_ROWS.map((row) => {
                      const renderCell = (val: string | boolean) => {
                        if (val === true) {
                          return (
                            <img
                              src={SITE_CONFIG.checkIcon}
                              alt="Included"
                              className="pricing-compare_check"
                              style={{ width: '1.125rem', height: '1.125rem' }}
                            />
                          );
                        }
                        if (val === false) {
                          return <span className="text-style-label">Not included</span>;
                        }
                        return <span className="pricing-compare_cell">{val}</span>;
                      };

                      const essentialVal =
                        currency === 'GBP' && row.essentialUk ? row.essentialUk : row.essential;

                      return (
                        <tr
                          key={row.label}
                          style={{ borderBottom: '1px solid var(--border-color--border-primary)' }}
                        >
                          <td className="pricing-compare_label" style={{ padding: '1rem 0.75rem 1rem 0' }}>
                            {row.label}
                          </td>
                          <td style={{ padding: '1rem 0.5rem' }}>{renderCell(essentialVal)}</td>
                          <td style={{ padding: '1rem 0.5rem' }}>{renderCell(row.growth)}</td>
                          <td style={{ padding: '1rem 0.5rem' }}>{renderCell(row.group)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Additional Service Fees */}
        <section className="section-pricing-extras">
          <div className="padding-global padding-section-large">
            <div className="grid-global">
              <div className="section-head">
                <p className="section-head_label text-style-label">(04) Extras</p>
                <h2 className="section-head_heading heading-style-h2">
                  Priced now, <span className="text-color-tertiary">not when you need them.</span>
                </h2>
              </div>

              <div className="pricing-extras_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
                {EXTRA_FEES.map((extra) => (
                  <div
                    key={extra.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '1rem',
                      padding: '1.25rem 0',
                      borderTop: '1px solid var(--border-color--border-primary)',
                    }}
                  >
                    <div>
                      <p className="text-weight-medium">{extra.name}</p>
                      <p className="text-size-small text-color-secondary">{extra.description}</p>
                    </div>
                    <p className="pricing-extras_price" style={{ whiteSpace: 'nowrap' }}>
                      {currency === 'GBP' ? extra.priceGBP : extra.priceAED}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Billing Assurances */}
        <section className="section-pricing-billing">
          <div className="padding-global padding-section-large">
            <div className="grid-global">
              <div className="pricing-plans_head">
                <h2 className="text-style-label">How billing works</h2>
                <p className="text-style-label">Three steps, no surprises</p>
              </div>

              <ul className="pricing-billing_list" style={{ gridColumn: '1 / -1', listStyle: 'none', padding: 0 }}>
                {PRICING_BILLING_STEPS.map((b) => (
                  <li key={b.number} className="pricing-billing_item">
                    <p className="pricing-billing_number">{b.number}</p>
                    <h3 className="pricing-billing_title heading-style-h4">{b.title}</h3>
                    <p className="pricing-billing_text text-size-small text-color-secondary">
                      {b.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Client Quote Slider */}
        <QuoteSlider
          sectionLabel="(05) What clients say"
          sectionClassName="section-pricing-quotes"
        />

        {/* 7. Pricing FAQ */}
        <FAQSection
          context="pricing"
          sectionLabel="(06) Questions"
          headingPrimary="About fees,"
          headingMuted="answered."
          subtext="The questions we hear most once the numbers are on the table. Anything else,"
          ctaHref="#talk"
          ctaLabel="ask us directly"
          sectionClassName="section-pricing-questions"
        />

        {/* 8. Partner Close Card */}
        <PartnerCloseCard
          id="talk"
          sectionClassName="section-pricing-talk"
          description="Thirty minutes with our managing partner. Bring your numbers, and by the end of the call you will know your fee."
        />
      </div>
    </SiteLayout>
  );
}
