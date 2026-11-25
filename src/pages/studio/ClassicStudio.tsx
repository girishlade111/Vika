import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PEOPLE } from '@/data/people';
import { OFFICES } from '@/data/offices';
import { SITE_CONFIG } from '@/data/siteConfig';
import { VikaButton } from '@/components/common/VikaButton';

export function ClassicStudio() {
  return (
    <SiteLayout
      title="Studio | Vika accounting, tax and audit"
      description="Vika opened in 2016 with four clients, a shared office in Dubai and one rule: every client's month is closed by the tenth working day."
    >
      {/* 1. Studio Header + Team Meeting Photo */}
      <header className="section-studio-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Studio</span>
            </p>
            <p className="page-header_number text-style-label">(03) Studio</p>

            <h1 className="page-header_heading heading-style-display">
              A small firm, <span className="text-color-tertiary">on purpose.</span>
            </h1>

            <p className="page-header_lede text-size-large">
              26 people across Dubai and London, organised into three practices on one calendar.
            </p>

            <div className="page-header_chips">
              <a href="#team" className="chip">
                The team
              </a>
              <a href="#offices" className="chip">
                Two offices
              </a>
            </div>

            <div className="page-header_media">
              <div className="page-header_image-wrapper">
                <img
                  src="/assets/images/hero/6ad74e5a41d4039b1f3cd5b2_vika-team-session.webp"
                  alt="Four Vika professionals reviewing financial statements around a wooden desk"
                  loading="eager"
                  className="page-header_image"
                />
              </div>
              <div className="page-header_caption">
                <p className="text-style-label">Monthly close review, Dubai</p>
                <p className="text-style-label">Accounting, tax and audit</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Company Story */}
      <section className="section-studio-story">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <p className="story_label text-style-label">(01) Our story</p>
            <p className="story_statement">
              Vika opened in 2016 with four clients, a shared office in Dubai and one rule: every
              client’s month is closed by the tenth working day.
            </p>
            <div className="story_columns">
              <p className="story_paragraph text-size-regular text-color-secondary">
                Ten years later the rule has not changed, and neither has the reason for it. Numbers
                are only useful while they are recent, and a business that sees last month by the
                tenth makes better decisions than one that sees it in the spring.
              </p>
              <p className="story_paragraph text-size-regular text-color-secondary">
                Today our accounting, tax and audit practices run as separate teams on one calendar,
                so a group with companies in both countries sees every deadline in one place. Our
                audit team never audits a company whose books we keep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Rules */}
      <section className="section-studio-values">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(02) How we work</p>
              <h2 className="section-head_heading heading-style-h2">
                Three rules. <span className="text-color-tertiary">No exceptions.</span>
              </h2>
            </div>

            <div className="values_list">
              {SITE_CONFIG.coreRules.map((rule) => (
                <div key={rule.number} className="values_item">
                  <p className="values_number">{rule.number}</p>
                  <h3 className="values_title heading-style-h3">{rule.title}</h3>
                  <p className="values_text text-size-regular text-color-secondary">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Five Moments Timeline */}
      <section className="section-studio-record">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(03) The record</p>
              <h2 className="section-head_heading heading-style-h2">
                Ten years, <span className="text-color-tertiary">five moments.</span>
              </h2>
            </div>

            <ul className="record_list" style={{ gridColumn: '1 / -1', listStyle: 'none', padding: 0, margin: '2.5rem 0 0' }}>
              {SITE_CONFIG.timelineMoments.map((m) => (
                <li key={m.year} className="record_item">
                  <p className="record_year">{m.year}</p>
                  <p className="record_text text-size-large">{m.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Team Grid */}
      <section id="team" className="section-studio-team">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(04) The team</p>
              <h2 className="section-head_heading heading-style-h2">
                The people <span className="text-color-tertiary">on your file.</span>
              </h2>
              <Link to="/team" className="section-head_link text-style-link">
                Meet the full team
              </Link>
            </div>

            <div className="team_component">
              <div className="team_list">
                {PEOPLE.map((person) => (
                  <div key={person.id} className="team_item">
                    <Link to={`/people/${person.slug}`} className="team_card w-inline-block">
                      <div className="team-card_component">
                        <div className="team_image-wrapper">
                          <img
                            src={person.portrait}
                            alt={person.name}
                            loading="lazy"
                            className="team_image"
                          />
                        </div>
                        <p className="team_quote text-size-small">{person.quote}</p>
                        <div className="team_meta">
                          <h3 className="team_name heading-style-h4">{person.name}</h3>
                          <p className="text-style-label">{person.credential}</p>
                        </div>
                        <div className="team_details">
                          <p className="team_role text-size-regular text-color-secondary">
                            {person.role}
                          </p>
                          <p className="text-style-label">{person.office}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Two Offices */}
      <section id="offices" className="section-studio-offices">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(05) Offices</p>
              <h2 className="section-head_heading heading-style-h2">
                Two offices, <span className="text-color-tertiary">one calendar.</span>
              </h2>
            </div>

            <div className="offices_list" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
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
                    <p className="text-style-label">
                      {office.id === 'dubai' ? 'Since 2016' : 'Since 2019'}
                    </p>
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

      {/* 7. Careers Band */}
      <section className="section-studio-careers">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="careers-band_actions" style={{ gridColumn: '1 / -1', borderRadius: '1rem', padding: '3rem' }}>
              <p className="text-style-label">(06) Careers</p>
              <h2 className="heading-style-h2" style={{ margin: '0.75rem 0 1rem' }}>
                Trainees and qualified accountants.
              </h2>
              <p className="text-size-regular text-color-secondary" style={{ maxWidth: '48ch', marginBottom: '1.5rem' }}>
                We hire four people a year across Dubai and London. If you like closing on time and
                writing plain notes, send your CV to {SITE_CONFIG.email}.
              </p>
              <VikaButton
                label="Write to us"
                hoverLabel={SITE_CONFIG.email}
                href={`mailto:${SITE_CONFIG.email}`}
                variant="light"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
