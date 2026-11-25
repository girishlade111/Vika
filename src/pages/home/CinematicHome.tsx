import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { SERVICES } from '@/data/services';
import { DEADLINES } from '@/data/deadlines';
import { TESTIMONIALS } from '@/data/testimonials';
import { CASE_STUDIES } from '@/data/caseStudies';
import { INSIGHTS } from '@/data/insights';
import { PLANS } from '@/data/plans';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useBooking } from '@/context/BookingContext';
import { usePricing } from '@/context/PricingContext';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsapSetup';

export function CinematicHome() {
  const { openBooking } = useBooking();
  const { currency } = usePricing();
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const casesSectionRef = useRef<HTMLElement>(null);
  const casesTrackRef = useRef<HTMLDivElement>(null);

  const nextDeadline = DEADLINES[0];
  const cinematicInsights = INSIGHTS.slice(0, 4);
  const retainers = PLANS.filter((p) => p.kind === 'retainer');

  const formatMoney = (aed: number, gbp: number) => {
    const val = currency === 'GBP' ? gbp : aed;
    return currency === 'GBP'
      ? `£${new Intl.NumberFormat('en-GB').format(val)}`
      : `AED ${new Intl.NumberFormat('en-GB').format(val)}`;
  };

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setVideoPlaying(true);
    } else {
      v.pause();
      setVideoPlaying(false);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      if (servicesSectionRef.current && servicesTrackRef.current) {
        const track = servicesTrackRef.current;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
        if (dist() > 40) {
          gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: 'top top',
              end: () => `+=${dist()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      if (casesSectionRef.current && casesTrackRef.current) {
        const track = casesTrackRef.current;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
        if (dist() > 40) {
          gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: casesSectionRef.current,
              start: 'top top',
              end: () => `+=${dist()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <SiteLayout
      title="Vika | Accounting and tax studio, Cinematic layout"
      description="Books closed by the tenth, returns filed early and audits planned in January, for 340 growing companies in the UAE and the UK."
    >
      {/* 1. Cinematic Hero */}
      <section className="section-home-cinematic-hero">
        <div className="padding-global">
          <div className="grid-global">
            <p className="cinematic-hero_meta-start text-style-label">(Accounting · Tax · Audit)</p>
            <p className="cinematic-hero_meta-center text-style-label">Dubai and London</p>
            <p className="cinematic-hero_meta-end text-style-label">Since 2016</p>

            <h1 className="cinematic-hero_heading">Numbers you can stand behind.</h1>
            <p className="cinematic-hero_lede text-size-large">
              Books closed by the tenth, returns filed early and audits planned in January, for 340
              growing companies in the UAE and the UK.
            </p>
            <div className="cinematic-hero_actions">
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
          </div>
        </div>
      </section>

      {/* 2. Full-bleed Video Media Frame */}
      <section className="section-home-cinematic-media">
        <div className="cinematic-media_frame">
          <img
            src="/assets/images/hero/6ad74e4e92e4f373e134a80f_vika-meeting-room.webp"
            alt="Quiet meeting room with an oak table and burgundy chairs in morning light"
            className="cinematic-media_image"
          />
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/shared/6ad70fa4dbb1938da989fd76_6ad880b358f73cbbb9142e09_vika-cinematic-hero-meeting_1_poster.0000000.jpg"
            className="cinematic-media_video"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          >
            <source
              src="/assets/videos/shared/6ad880b358f73cbbb9142e09_vika-cinematic-hero-meeting_1_mp4.mp4"
              type="video/mp4"
            />
            <source
              src="/assets/videos/shared/6ad880b358f73cbbb9142e09_vika-cinematic-hero-meeting_1_webm.webm"
              type="video/webm"
            />
          </video>
          <div className="cinematic-media_overlay" />

          <div className="cinematic-media_content">
            <div className="cinematic-media_text">
              <p className="cinematic-media_label text-style-label">The studio, Business Bay</p>
              <p className="cinematic-media_title">
                Two offices, one calendar, and a partner one call away.
              </p>
            </div>
            <div className="cinematic-media_chip" style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
              {nextDeadline && (
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
              )}
              <button
                type="button"
                aria-label={videoPlaying ? 'Pause background video' : 'Play background video'}
                onClick={toggleVideo}
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.35)',
                  background: 'rgba(18,18,17,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <img
                  src={
                    videoPlaying
                      ? '/assets/brand/628299f8aa233b83918e24fd_Pause.svg'
                      : '/assets/brand/628298b20ae0236682d4b87f_Play-24.svg'
                  }
                  alt={videoPlaying ? 'Pause' : 'Play'}
                  style={{ width: '1rem', height: '1rem' }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Studio Statement & Figures */}
      <section className="section-home-cinematic-studio">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <p className="home-studio_label text-style-label">(01) The studio</p>
            <h2 className="home-studio_statement">
              Vika is an accounting studio of 26 people. We keep the books, run the tax calendar and
              sign the audits for companies that would rather spend their time growing.
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

      {/* 4. Horizontal Scroll Services Gallery */}
      <section ref={servicesSectionRef} className="section-home-cinematic-services is-film">
        <div className="gallery_sticky">
          <div className="padding-global">
            <div className="grid-global">
              <div className="gallery_header">
                <div className="gallery_heading">
                  <p className="text-style-label">(02) Services</p>
                  <h2 className="heading-style-h2">
                    Three practices. <span className="text-color-tertiary">One set of numbers.</span>
                  </h2>
                </div>
                <p className="gallery_hint text-style-label is-touch">Scroll sideways</p>
                <p className="gallery_hint text-style-label is-desk">
                  Keep scrolling to move through the services
                </p>
              </div>
            </div>
          </div>

          <div ref={servicesTrackRef} className="gallery_track is-film">
            <div className="gallery_list is-film">
              {SERVICES.map((svc) => (
                <div key={svc.id} className="gallery_item is-film">
                  <Link to={`/services/${svc.slug}`} className="gallery_card w-inline-block">
                    <div className="gallery_image-wrapper is-film">
                      <img
                        src={svc.image}
                        alt={svc.name}
                        loading="lazy"
                        className="gallery_image"
                      />
                    </div>
                    <div className="gallery_top">
                      <p className="gallery_name">{svc.name}</p>
                      <p className="gallery_number text-style-label">{svc.number}</p>
                    </div>
                    <p className="gallery_summary text-size-regular text-color-secondary">
                      {svc.shortSummary}
                    </p>
                    <div className="gallery_footer">
                      <div className="gallery_price">
                        <p className="gallery_price-label text-style-label">From</p>
                        <p className="gallery_price-amount text-size-regular">
                          {formatMoney(svc.startingPrice.AED, svc.startingPrice.GBP)}
                        </p>
                        <p className="gallery_price-unit text-size-regular">{svc.priceUnit}</p>
                      </div>
                      <span className="gallery_go" aria-hidden="true">
                        <span className="button_arrow">
                          <span className="button_arrow-line" />
                          <span className="button_arrow-head" />
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}

              <div className="gallery_cta is-film">
                <p className="gallery_cta-label text-style-label">Not sure yet?</p>
                <h3 className="gallery_cta-heading">Start with thirty minutes.</h3>
                <Link to="/cinematic/contact-cinematic" className="gallery_cta-button">
                  <span>Book a call</span>
                  <span className="button_arrow" aria-hidden="true">
                    <span className="button_arrow-line" />
                    <span className="button_arrow-head" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Cinematic Burgundy Calendar Band */}
      <section id="calendar" className="section-home-cinematic-calendar">
        <div className="band_component">
          <div className="padding-global">
            <div className="grid-global">
              <div className="section-head">
                <p className="section-head_label text-style-label">(03) The calendar</p>
                <h2 className="section-head_heading heading-style-h2">
                  Every deadline, <span className="text-color-tertiary">kept for you.</span>
                </h2>
              </div>

              <div className="home-calendar_list" style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
                {DEADLINES.slice(0, 6).map((dl) => (
                  <Link
                    key={dl.id}
                    to={`/deadlines/${dl.slug}`}
                    className="home-calendar_row w-inline-block"
                  >
                    <div className="home-calendar_row-head">
                      <p className="text-size-regular text-weight-medium">{dl.date}</p>
                      <p className="text-style-label">
                        {dl.jurisdiction} · {dl.practice}
                      </p>
                    </div>
                    <p className="text-size-regular">{dl.title}</p>
                    <p className="text-size-small text-color-secondary">{dl.summary}</p>
                  </Link>
                ))}
              </div>

              <p className="band_note text-size-small text-color-secondary" style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}>
                Dates shown for a 31 December year end. Your own calendar is built in week one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cinematic Quotes Marquee */}
      <section className="section-home-cinematic-quotes">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(04) Clients</p>
              <h2 className="section-head_heading heading-style-h2">
                In their words, <span className="text-color-tertiary">not ours.</span>
              </h2>
            </div>

            <div className="cinematic-quotes_grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
              {TESTIMONIALS.map((t) => (
                <article
                  key={t.id}
                  style={{
                    padding: '1.75rem',
                    border: '1px solid var(--border-color--border-primary)',
                    borderRadius: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                  }}
                >
                  <p className="text-size-medium">{t.quote}</p>
                  <div>
                    <p className="text-size-regular text-weight-medium">{t.author}</p>
                    <p className="text-size-small text-color-secondary">{t.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cinematic Film Strip Case Studies */}
      <section ref={casesSectionRef} className="section-home-cinematic-cases is-film">
        <div className="film-strip_sticky">
          <div className="padding-global">
            <div className="grid-global">
              <div className="section-head">
                <p className="section-head_label text-style-label">(05) Case studies</p>
                <h2 className="section-head_heading heading-style-h2">
                  Proof, <span className="text-color-tertiary">not promises.</span>
                </h2>
              </div>
            </div>
          </div>

          <div ref={casesTrackRef} className="film-strip_track">
            <div className="film-strip_list">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="film-strip_item">
                  <Link
                    to={`/case-studies/${cs.slug}`}
                    className="case-split_card is-film w-inline-block"
                  >
                    <img
                      src={cs.coverImage}
                      alt={cs.title}
                      loading="lazy"
                      className="case-split_image"
                    />
                    <div className="case-split_meta is-film" style={{ display: 'flex', gap: '1rem', zIndex: 1 }}>
                      <p className="case-split_meta-text text-style-label is-film">{cs.sector}</p>
                      <p className="case-split_meta-text text-style-label is-film">{cs.location}</p>
                    </div>
                    <h3 className="case-split_title is-film">{cs.title}</h3>
                    <p className="case-split_result is-film">{cs.summary}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="film-strip_footer">
            <p className="film-strip_hint text-style-label">
              Keep scrolling to move through the work
            </p>
            <Link to="/case-studies" className="case-split_all text-style-link">
              All case studies
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Cinematic Fees */}
      <section id="fees" className="section-home-cinematic-fees">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(06) Fees</p>
              <h2 className="section-head_heading heading-style-h2">
                Fixed fees. <span className="text-color-tertiary">Said early.</span>
              </h2>
            </div>

            <div className="fees_grid" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {retainers.map((plan) => (
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
                      <p className="fees_card-amount">
                        {formatMoney(plan.prices.AED.monthly ?? 0, plan.prices.GBP.monthly ?? 0)}
                      </p>
                      <p
                        className="fees_card-label text-style-label"
                        style={plan.highlighted ? { color: 'rgba(236, 235, 230, 0.7)' } : undefined}
                      >
                        per month, plus VAT
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
              ))}
            </div>

            <p className="cinematic-fees_note text-size-small text-color-secondary" style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}>
              Monthly plans shown, all plus VAT. Audits, registrations and due diligence are quoted
              as projects on the{' '}
              <Link to="/services#fees" className="text-style-link">
                Services page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 9. Cinematic Insights Split */}
      <section className="section-home-cinematic-insights">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(07) Insights</p>
              <h2 className="section-head_heading heading-style-h2">
                Notes from <span className="text-color-tertiary">the studio.</span>
              </h2>
              <Link to="/insights" className="insights-split_all text-style-link">
                All insights
              </Link>
            </div>

            <div className="insights-split_grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
              {cinematicInsights[0] && (
                <Link
                  to={`/insights/${cinematicInsights[0].slug}`}
                  className="insights-split_card w-inline-block"
                >
                  <div className="insight-cards_image-wrapper" style={{ marginBottom: '1rem' }}>
                    <img
                      src={cinematicInsights[0].coverImage}
                      alt={cinematicInsights[0].title}
                      loading="lazy"
                      className="insight-cards_image"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <p className="text-style-label">{cinematicInsights[0].category}</p>
                    <p className="text-style-label">{cinematicInsights[0].publicationDate}</p>
                  </div>
                  <h3 className="insights-split_title heading-style-h3">
                    {cinematicInsights[0].title}
                  </h3>
                </Link>
              )}

              <div className="insights-split_rows" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cinematicInsights.slice(1).map((ins) => (
                  <Link
                    key={ins.id}
                    to={`/insights/${ins.slug}`}
                    className="insights-split_row w-inline-block"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '5.5rem 1fr',
                      gap: '1rem',
                      alignItems: 'center',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid var(--border-color--border-primary)',
                    }}
                  >
                    <img
                      src={ins.coverImage}
                      alt={ins.title}
                      loading="lazy"
                      className="insight-cards_image"
                      style={{ width: '5.5rem', height: '4rem', objectFit: 'cover', borderRadius: '0.5rem' }}
                    />
                    <div>
                      <p className="text-style-label" style={{ marginBottom: '0.25rem' }}>
                        {ins.category}
                      </p>
                      <p className="insights-split_row-title text-size-medium text-weight-medium">
                        {ins.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Full-bleed Partner Close Band */}
      <section className="section-home-cinematic-close">
        <div className="close-band_component">
          <img
            src="/assets/images/insights/6ad74ed70180ecbacfafd39d_hf_20261020_105655_0524c85e-01bc-443b-b4b9-f24330481881_min.webp"
            alt="Two hands passing a burgundy document folder across an oak table"
            loading="lazy"
            className="close-band_image"
          />
          <div className="close-band_content">
            <p className="close-band_label text-style-label">Dubai and London · Monday to Friday</p>
            <h2 className="close-band_heading heading-style-h2">Thirty minutes with a partner.</h2>
            <VikaButton
              label="Book a call"
              hoverLabel="with a partner"
              to="/cinematic/contact-cinematic"
              variant="light"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
