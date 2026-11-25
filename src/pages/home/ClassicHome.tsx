import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { DeadlineCalendar } from '@/components/deadlines/DeadlineCalendar';
import { PricingCardsSection } from '@/components/pricing/PricingCardsSection';
import { QuoteSlider } from '@/components/testimonials/QuoteSlider';
import { FAQSection } from '@/components/faq/FAQSection';
import { PartnerCloseCard } from '@/components/cta/PartnerCloseCard';
import { SERVICES } from '@/data/services';
import { CASE_STUDIES } from '@/data/caseStudies';
import { INSIGHTS } from '@/data/insights';
import { DEADLINES } from '@/data/deadlines';
import { CLIENT_MARKS } from '@/data/testimonials';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useBooking } from '@/context/BookingContext';
import { usePricing } from '@/context/PricingContext';

const WORKING_STEPS = [
  {
    number: '01',
    title: 'A first call',
    description:
      'Thirty minutes with a partner. We ask about your companies, your software and anything overdue.',
  },
  {
    number: '02',
    title: 'A written proposal',
    description:
      'A fixed fee, a start date and the name of your accountant, within two working days.',
  },
  {
    number: '03',
    title: 'Onboarding',
    description:
      'We take over from your last firm, rebuild what is missing and connect your feeds.',
  },
  {
    number: '04',
    title: 'Every month after',
    description:
      'Books closed by the tenth, returns filed early and a partner one call away.',
  },
];

export function ClassicHome() {
  const { openBooking } = useBooking();
  const { currency } = usePricing();
  const nextDeadline = DEADLINES[0];
  const featuredCases = CASE_STUDIES.slice(0, 3);
  const latestInsights = INSIGHTS.slice(0, 3);

  const formatMoney = (aed: number, gbp: number) => {
    const val = currency === 'GBP' ? gbp : aed;
    return currency === 'GBP'
      ? `£${new Intl.NumberFormat('en-GB').format(val)}`
      : `AED ${new Intl.NumberFormat('en-GB').format(val)}`;
  };

  return (
    <SiteLayout
      title="Vika | Accounting, tax and audit studio in Dubai and London"
      description="We keep the books, file the returns and sign the audits for growing companies in the UAE and the UK. Fixed fees, and every month closed by the tenth."
    >
      {/* 1. Hero */}
      <section id="top" className="section-home-hero">
        <div className="padding-global">
          <div className="grid-global">
            <p className="home-hero_meta text-style-label">(Accounting · Tax · Audit)</p>
            <p className="home-hero_meta text-style-label hide-tablet">340 companies on our books</p>
            <p className="home-hero_meta text-style-label">Dubai and London</p>

            <h1 className="home-hero_heading heading-style-display">Accounts that hold up.</h1>

            <p className="home-hero_lede text-size-large">
              We keep the books, file the returns and sign the audits for growing companies in the
              UAE and the UK.{' '}
              <span className="text-color-secondary">
                Fixed fees, and every month closed by the tenth.
              </span>
            </p>

            <div className="home-hero_actions">
              <VikaButton
                label="Book a call"
                hoverLabel="with a partner"
                variant="dark"
                onClick={() => openBooking()}
              />
              <a href="#fees" className="text-style-link">
                See our fees
              </a>
            </div>

            <div className="home-hero_media">
              <div className="home-hero_image-wrap">
                <img
                  src="/assets/images/hero/6ad74e4e92e4f373e134a80f_vika-meeting-room.webp"
                  alt="Quiet meeting room with an oak table and burgundy chairs in morning light"
                  loading="eager"
                  className="home-hero_image"
                />
              </div>

              {nextDeadline && (
                <div className="home-hero_chip-list">
                  <a href="#calendar" className="home-hero_chip w-inline-block">
                    <span className="offices_dot" aria-hidden="true" />
                    <div className="home-hero_chip-text">
                      <p className="text-style-label">Next deadline</p>
                      <p className="text-size-small text-weight-medium">{nextDeadline.title}</p>
                    </div>
                    <div className="home-hero_chip-date">
                      <p className="text-size-small text-weight-medium">{nextDeadline.date}</p>
                      <p className="text-style-label">{nextDeadline.jurisdiction}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Client Wordmark Strip */}
      <section className="section-home-clients">
        <div className="padding-global">
          <div className="grid-global">
            <p className="home-clients_label text-style-label">
              Trusted by 340 companies, from first hire to first audit
            </p>
          </div>
        </div>
        <div className="home-clients_marquee" aria-label="Selected client wordmarks">
          <div className="home-clients_track">
            {[...CLIENT_MARKS, ...CLIENT_MARKS].map((m, idx) => (
              <p key={`${m.name}-${idx}`} className={`home-clients_mark ${m.variant}`}>
                {m.name}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Studio Statement & Four Figures */}
      <section className="section-home-studio">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <p className="home-studio_label text-style-label">(01) The studio</p>
            <h2 className="home-studio_statement">
              Vika is an accounting studio of 26 people in Dubai and London. We keep the books,
              run the tax calendar and sign the audits for 340 companies, most of them founder led
              and all of them growing. Our clients get the same numbers, earlier, and someone who
              explains what they mean.
            </h2>

            <ul className="home-studio_figures">
              {SITE_CONFIG.studioStats.map((stat) => (
                <li key={stat.label} className="home-studio_figure">
                  <p className="home-studio_figure-number">{stat.value}</p>
                  <p className="text-size-regular text-color-secondary">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Three Practices Overview */}
      <section className="section-home-services">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(02) Services</p>
              <h2 className="section-head_heading heading-style-h2">
                Three practices. <span className="text-color-tertiary">One set of numbers.</span>
              </h2>
            </div>

            <div className="home-services_component">
              <div className="practices_list">
                {SERVICES.map((svc) => (
                  <div key={svc.id} className="practices_item">
                    <Link to={`/services/${svc.slug}`} className="practices_row w-inline-block">
                      <p className="practices_number text-style-label">{svc.number}</p>
                      <h3 className="practices_name">{svc.name}</h3>
                      <p className="practices_short text-size-medium">{svc.shortSummary}</p>
                      <div className="practices_fee">
                        <p className="text-style-label">From</p>
                        <p className="text-size-regular text-weight-medium">
                          {formatMoney(svc.startingPrice.AED, svc.startingPrice.GBP)}
                        </p>
                        <p className="text-size-small text-color-secondary">{svc.priceUnit}</p>
                      </div>
                      <span className="practices_icon" aria-hidden="true">
                        <span className="button_arrow">
                          <span className="button_arrow-line" />
                          <span className="button_arrow-head" />
                        </span>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Tax Deadline Calendar */}
      <DeadlineCalendar />

      {/* 6. Full-width Editorial Photography Band */}
      <section className="section-home-band">
        <div className="padding-global">
          <div className="grid-global">
            <div className="home-band_media" style={{ gridColumn: '1 / -1' }}>
              <img
                src="/assets/images/insights/6ad74ed70180ecbacfafd39a_hf_20261020_105653_0814399d-5b22-4e1a-8262-78717b01a012_min.webp"
                alt="Printed financial statements, a burgundy notebook and a black coffee cup on an oak table"
                loading="lazy"
                className="home-band_image"
              />
            </div>
            <div className="home-band_caption" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', marginTop: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <p className="text-style-label">Monthly review, Business Bay</p>
              <p className="text-style-label">Every client, every month, by the tenth</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Working Process (4 Steps) */}
      <section className="section-home-steps">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(04) How we start</p>
              <h2 className="section-head_heading heading-style-h2">
                From a first call <span className="text-color-tertiary">to a closed month.</span>
              </h2>
            </div>

            <ul className="steps_list">
              {WORKING_STEPS.map((step) => (
                <li key={step.number} className="steps_item">
                  <div className="steps_line" />
                  <p className="steps_number text-style-label">{step.number}</p>
                  <h3 className="steps_title heading-style-h3">{step.title}</h3>
                  <p className="text-size-regular text-color-secondary">{step.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Pricing Preview */}
      <PricingCardsSection mode="tabbed" />

      {/* 9. Client Testimonials */}
      <QuoteSlider />

      {/* 10. Recent Case Studies */}
      <section className="section-home-cases">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(07) Case studies</p>
              <h2 className="section-head_heading heading-style-h2">
                Recent work, <span className="text-color-tertiary">in numbers.</span>
              </h2>
              <Link to="/case-studies" className="section-head_link text-style-link">
                All case studies
              </Link>
            </div>

            <div className="case-cards_list" style={{ gridColumn: '1 / -1' }}>
              {featuredCases.map((cs) => (
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

      {/* 11. Latest Insights */}
      <section className="section-home-insights">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(08) Insights</p>
              <h2 className="section-head_heading heading-style-h2">
                Notes from <span className="text-color-tertiary">the studio.</span>
              </h2>
              <Link to="/insights" className="section-head_link text-style-link">
                All insights
              </Link>
            </div>

            <div className="insight-cards_list" style={{ gridColumn: '1 / -1' }}>
              {latestInsights.map((ins) => (
                <Link
                  key={ins.id}
                  to={`/insights/${ins.slug}`}
                  className="insight-cards_card w-inline-block"
                >
                  <div className="insight-cards_image-wrapper">
                    <img
                      src={ins.coverImage}
                      alt={ins.coverAlt}
                      loading="lazy"
                      className="insight-cards_image"
                    />
                  </div>
                  <div className="insight-cards_meta">
                    <p className="text-style-label">{ins.category}</p>
                    <p className="text-style-label">{ins.publicationDate}</p>
                  </div>
                  <h3 className="insight-cards_title heading-style-h3">{ins.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <FAQSection context="home" />

      {/* 13. Partner Close Card */}
      <PartnerCloseCard />
    </SiteLayout>
  );
}
