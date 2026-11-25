import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PEOPLE } from '@/data/people';
import { OFFICES } from '@/data/offices';
import { SITE_CONFIG } from '@/data/siteConfig';
import { VikaButton } from '@/components/common/VikaButton';

export function CinematicStudio() {
  return (
    <SiteLayout
      title="Studio | Vika accounting and tax, Cinematic layout"
      description="26 people, two offices, one rule. Close every client's month by the tenth working day."
    >
      {/* 1. Cinematic Studio Hero */}
      <section className="section-studio-cinematic-hero">
        <div className="padding-global">
          <div className="grid-global">
            <p className="cinematic-hero_meta-start text-style-label">(03) Studio</p>
            <p className="cinematic-hero_meta-center text-style-label">Dubai and London</p>
            <p className="cinematic-hero_meta-end text-style-label">Since 2016</p>

            <h1 className="cinematic-hero_heading">
              26 people, two offices, <span className="text-color-tertiary">one rule.</span>
            </h1>
            <p className="cinematic-hero_lede text-size-large">
              Close every client’s month by the tenth working day. Everything else at Vika follows
              from that.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Full-bleed Team Media Frame */}
      <section className="section-studio-cinematic-media">
        <div className="cinematic-media_frame">
          <img
            src="/assets/images/hero/6ad74e5a41d4039b1f3cd5b2_vika-team-session.webp"
            alt="Four Vika team members reviewing documents around a wooden table"
            loading="eager"
            className="cinematic-media_image"
          />
          <div className="cinematic-media_overlay" />
          <div className="cinematic-media_content">
            <div className="cinematic-media_text">
              <p className="cinematic-media_label text-style-label">Monthly review, Business Bay</p>
              <p className="cinematic-media_title">
                Every client, every month, read by a partner before it leaves the studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story */}
      <section className="section-studio-cinematic-story">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <p className="home-studio_label text-style-label">(01) Our story</p>
            <h2 className="home-studio_statement">
              Vika opened in 2016 with four clients and a shared office in Dubai. Ten years later we
              keep the books, run the calendar and sign the audits for 340 companies, and the rule
              has not changed: numbers are only useful while they are recent.
            </h2>
          </div>
        </div>
      </section>

      {/* 4. Horizontal Record Gallery */}
      <section className="section-studio-cinematic-record">
        <div className="padding-global">
          <div className="grid-global">
            <div className="gallery_header">
              <div className="gallery_heading">
                <p className="text-style-label">(02) The record</p>
                <h2 className="heading-style-h2">
                  Ten years, <span className="text-color-tertiary">five moments.</span>
                </h2>
              </div>
              <p className="gallery_hint text-style-label">Scroll sideways</p>
            </div>
          </div>
        </div>

        <div className="gallery_track" style={{ overflowX: 'auto' }}>
          {SITE_CONFIG.timelineMoments.map((m, i) => (
            <div
              key={m.year}
              className={`record-gallery_card ${i === SITE_CONFIG.timelineMoments.length - 1 ? 'is-current' : ''}`}
            >
              <p className="record-gallery_year">{m.year}</p>
              <div className="record-gallery_body">
                <p className="record-gallery_count text-style-label">{m.clientsLabel}</p>
                <p className="record-gallery_text">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Cinematic Team Rows */}
      <section className="section-studio-cinematic-team">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(03) The team</p>
              <h2 className="section-head_heading heading-style-h2">
                The people <span className="text-color-tertiary">on your file.</span>
              </h2>
            </div>

            <div className="team-rows_component" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              {PEOPLE.map((person) => (
                <Link
                  key={person.id}
                  to={`/people/${person.slug}`}
                  className="team-rows_row w-inline-block"
                >
                  <h3 className="team-rows_name">{person.name}</h3>
                  <p className="team-rows_role text-size-regular">{person.role}</p>
                  <p className="team-rows_credential text-style-label">{person.credential}</p>
                  <p className="team-rows_office text-style-label">{person.office}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Offices */}
      <section className="section-studio-cinematic-offices">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="offices_list" style={{ gridColumn: '1 / -1' }}>
              {[OFFICES.dubai, OFFICES.london].map((office) => (
                <article key={office.id} className="offices_card">
                  <div className="offices_media">
                    <img
                      src={office.image}
                      alt={office.imageAlt}
                      loading="lazy"
                      className="offices_image"
                    />
                  </div>
                  <div className="offices_body">
                    <h3 className="offices_city heading-style-h2">{office.city}</h3>
                    <p className="offices_hours text-style-label">{office.hoursLabel}</p>
                    <p className="offices_address text-size-regular text-color-secondary">
                      {office.addressLines.join(', ')}
                    </p>
                    <a href={office.phoneHref} className="text-style-link">
                      {office.phone}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Careers */}
      <section className="section-studio-cinematic-careers">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="careers-band_actions" style={{ gridColumn: '1 / -1', borderRadius: '1rem', padding: '3rem' }}>
              <p className="text-style-label">(04) Careers</p>
              <h2 className="heading-style-h2" style={{ margin: '0.75rem 0 1rem' }}>
                Join the studio.
              </h2>
              <VikaButton
                label="Book a call"
                hoverLabel="or write to us"
                to="/cinematic/contact-cinematic"
                variant="light"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
