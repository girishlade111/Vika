import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLANS } from '@/data/plans';
import { usePricing } from '@/context/PricingContext';
import { VikaButton } from '@/components/common/VikaButton';

interface PricingCardsSectionProps {
  id?: string;
  sectionClassName?: string;
  sectionLabel?: string;
  headingPrimary?: string;
  headingMuted?: string;
  mode?: 'tabbed' | 'full';
}

export function PricingCardsSection({
  id = 'fees',
  sectionClassName = 'section-home-fees',
  sectionLabel = '(05) Fees',
  headingPrimary = 'Fixed fees.',
  headingMuted = 'Said early.',
  mode = 'tabbed',
}: PricingCardsSectionProps) {
  const { currency, billing, setCurrency, setBilling } = usePricing();
  const [activeTab, setActiveTab] = useState<'Monthly' | 'Projects'>('Monthly');

  const retainers = PLANS.filter((p) => p.kind === 'retainer');
  const projects = PLANS.filter((p) => p.kind === 'project');

  const formatMoney = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-GB').format(amount);
    return currency === 'GBP' ? `£${formatted}` : `AED ${formatted}`;
  };

  return (
    <section
      id={id}
      className={sectionClassName}
      data-pricing-region={currency === 'GBP' ? 'UK' : 'UAE'}
      data-pricing-billing={billing}
    >
      <div className="padding-global padding-section-large">
        <div className="grid-global">
          <div className="section-head">
            <p className="section-head_label text-style-label">{sectionLabel}</p>
            <h2 className="section-head_heading heading-style-h2">
              {headingPrimary} <span className="text-color-tertiary">{headingMuted}</span>
            </h2>
          </div>

          {mode === 'tabbed' && (
            <div className="home-fees_controls" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div className="tabs_menu" role="tablist" aria-label="Fee plan type">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'Monthly'}
                  className={`tabs_link w-inline-block w-tab-link ${activeTab === 'Monthly' ? 'w--current' : ''}`}
                  onClick={() => setActiveTab('Monthly')}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'Projects'}
                  className={`tabs_link w-inline-block w-tab-link ${activeTab === 'Projects' ? 'w--current' : ''}`}
                  onClick={() => setActiveTab('Projects')}
                >
                  Projects
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div className="pricing-toggle_switch" role="group" aria-label="Currency">
                  <button
                    type="button"
                    className={`pricing-toggle_option ${currency === 'AED' ? 'is-active' : ''}`}
                    onClick={() => setCurrency('AED')}
                  >
                    AED
                  </button>
                  <button
                    type="button"
                    className={`pricing-toggle_option ${currency === 'GBP' ? 'is-active' : ''}`}
                    onClick={() => setCurrency('GBP')}
                  >
                    GBP
                  </button>
                </div>
                {activeTab === 'Monthly' && (
                  <div className="pricing-toggle_switch" role="group" aria-label="Billing interval">
                    <button
                      type="button"
                      className={`pricing-toggle_option ${billing === 'Monthly' ? 'is-active' : ''}`}
                      onClick={() => setBilling('Monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      className={`pricing-toggle_option ${billing === 'Yearly' ? 'is-active' : ''}`}
                      onClick={() => setBilling('Yearly')}
                    >
                      Yearly
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {(mode === 'full' || activeTab === 'Monthly') && (
            <div className="fees_grid" style={{ gridColumn: '1 / -1' }}>
              {retainers.map((plan) => {
                const amount =
                  billing === 'Yearly'
                    ? plan.prices[currency].yearly ?? 0
                    : plan.prices[currency].monthly ?? 0;
                const unit =
                  billing === 'Yearly'
                    ? plan.unitLabelYearly || 'per year, plus VAT'
                    : plan.unitLabelMonthly || 'per month, plus VAT';

                return (
                  <article key={plan.id} className="fees_card">
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
                        style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.78)' } : undefined}
                      >
                        {plan.description}
                      </p>

                      <div className="fees_card-price">
                        <p
                          className="fees_card-label text-style-label"
                          style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined}
                        >
                          {plan.pricePrefix}
                        </p>
                        <p className="fees_card-amount">{formatMoney(amount)}</p>
                        <p
                          className="fees_card-label text-style-label"
                          style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined}
                        >
                          {unit}
                        </p>
                      </div>

                      <div
                        className="fees_card-features text-rich-text text-size-small text-color-secondary w-richtext"
                        style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.85)' } : undefined}
                      >
                        <ul>
                          {plan.deliverables.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="fees_card-button-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
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
          )}

          {(mode === 'tabbed' && activeTab === 'Projects') && (
            <div className="fees_grid" style={{ gridColumn: '1 / -1' }}>
              {projects.map((plan) => {
                const amount = plan.prices[currency].fixed ?? 0;
                return (
                  <article key={plan.id} className="fees_card">
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
                      </div>
                      <p
                        className="fees_card-description text-size-regular text-color-secondary"
                        style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.78)' } : undefined}
                      >
                        {plan.description}
                      </p>
                      <div className="fees_card-price">
                        <p
                          className="fees_card-label text-style-label"
                          style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined}
                        >
                          {plan.pricePrefix}
                        </p>
                        <p className="fees_card-amount">{formatMoney(amount)}</p>
                        <p
                          className="fees_card-label text-style-label"
                          style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined}
                        >
                          {plan.unitLabelFixed}
                        </p>
                      </div>
                      <div
                        className="fees_card-features text-rich-text text-size-small text-color-secondary w-richtext"
                        style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.85)' } : undefined}
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
          )}

          <p className="fees_note text-size-small text-color-secondary">
            Fees exclude VAT. Monthly fees are reviewed with you once a year, never in the middle of
            a contract. London clients are quoted in pounds.{' '}
            <Link to="/pricing" className="text-style-link">
              Full fee table
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
