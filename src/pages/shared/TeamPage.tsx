import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { PEOPLE } from '@/data/people';
import { useBooking } from '@/context/BookingContext';

const TEAM_PROMISES = [
  {
    number: '01',
    title: 'A partner signs',
    description:
      'Every return, set of accounts and audit opinion goes out under a named partner. You meet them in your first week, not at year end.',
  },
  {
    number: '02',
    title: 'A manager runs the month',
    description:
      'Your manager closes the books by the tenth working day and is the first person you message when something changes.',
  },
  {
    number: '03',
    title: 'Replies in one working day',
    description:
      'Questions are answered within one working day by someone who already knows your ledger and your calendar.',
  },
];

export function TeamPage() {
  const { openBooking } = useBooking();
  const partners = PEOPLE.filter((p) => p.tier === 'partner');
  const managers = PEOPLE.filter((p) => p.tier === 'manager');

  return (
    <SiteLayout
      title="Team | The people who sign your accounts | Vika"
      description="Three partners sign every return and audit opinion. Their managers run the work week to week across Dubai and London."
    >
      {/* 1. Team Hero + 6 Portrait Strip */}
      <header className="section-studio-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Team</span>
            </p>
            <p className="page-header_number text-style-label">The people</p>

            <h1 className="page-header_heading heading-style-display">
              The people <span className="text-color-tertiary">who sign your accounts.</span>
            </h1>

            <p className="page-header_lede text-size-large">
              Three partners sign every return and audit opinion. Their managers run the work week
              to week. You will know each of them by name before your first close.
            </p>

            <div className="page-header_chips">
              <a href="#partners" className="chip">
                Partners
              </a>
              <a href="#managers" className="chip">
                Managers
              </a>
            </div>

            <div className="team-strip_component">
              <div className="team-strip_list">
                {PEOPLE.map((person) => (
                  <div key={person.id} className="team-strip_item">
                    <Link
                      to={`/people/${person.slug}`}
                      className="person-team_card w-inline-block"
                    >
                      <div className="person-card_component">
                        <div className="team-strip_media">
                          <img
                            src={person.portrait}
                            alt={person.name}
                            loading="eager"
                            className="team-strip_image"
                          />
                        </div>
                        <p className="team-strip_name">{person.name}</p>
                        <p className="team-strip_role text-color-secondary">{person.role}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Partners Feature */}
      <section id="partners" className="section-team-partners">
        <div className="padding-global padding-section-medium">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(01) Partners</p>
              <h2 className="section-head_heading heading-style-h2">
                Three signatures, <span className="text-color-tertiary">on every file.</span>
              </h2>
            </div>

            <div className="team-feature_component">
              <div className="team-feature_list">
                {partners.map((partner) => (
                  <article key={partner.id} className="team-feature_item">
                    <Link to={`/people/${partner.slug}`} className="team-feature_media">
                      <img
                        src={partner.portrait}
                        alt={partner.name}
                        loading="lazy"
                        className="team-feature_image"
                      />
                    </Link>

                    <div className="team-feature_content">
                      <div className="team-feature_meta">
                        <p className="team-feature_tag text-style-label">{partner.credential}</p>
                        <p className="team-feature_tag text-style-label">{partner.office}</p>
                      </div>

                      <h3 className="team-feature_name heading-style-h2">
                        <Link to={`/people/${partner.slug}`}>{partner.name}</Link>
                      </h3>
                      <p className="team-feature_role text-size-medium text-color-secondary">
                        {partner.role}
                      </p>
                      <p className="team-feature_quote">{partner.quote}</p>
                      <p className="team-feature_bio text-size-regular text-color-secondary">
                        {partner.shortBiography}
                      </p>

                      <div className="team-feature_actions">
                        <VikaButton
                          label="Book a call"
                          hoverLabel="with this partner"
                          size="small"
                          variant="dark"
                          onClick={() => openBooking({ partnerSlug: partner.slug })}
                        />
                        <a
                          href={`mailto:${partner.email}`}
                          className="team-feature_email text-style-link"
                        >
                          {partner.email}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Managers Grid */}
      <section id="managers" className="section-team-managers">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(02) Managers</p>
              <h2 className="section-head_heading heading-style-h2">
                Who runs your file <span className="text-color-tertiary">week to week.</span>
              </h2>
            </div>

            <div className="team_component">
              <div className="team_list">
                {managers.map((m) => (
                  <div key={m.id} className="team_item">
                    <Link to={`/people/${m.slug}`} className="team_card w-inline-block">
                      <div className="team-card_component">
                        <div className="team_image-wrapper">
                          <img
                            src={m.portrait}
                            alt={m.name}
                            loading="lazy"
                            className="team_image"
                          />
                        </div>
                        <p className="team_quote text-size-small">{m.quote}</p>
                        <div className="team_meta">
                          <h3 className="team_name heading-style-h4">{m.name}</h3>
                          <p className="text-style-label">{m.credential}</p>
                        </div>
                        <div className="team_details">
                          <p className="team_role text-size-regular text-color-secondary">
                            {m.role}
                          </p>
                          <p className="text-style-label">{m.office}</p>
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

      {/* 4. How We Work Promises */}
      <section className="section-team-promises">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(03) How we work with you</p>
              <h2 className="section-head_heading heading-style-h2">
                One partner, one manager, <span className="text-color-tertiary">one inbox.</span>
              </h2>
            </div>

            <div className="team-promise_list" style={{ gridColumn: '1 / -1' }}>
              {TEAM_PROMISES.map((item) => (
                <div key={item.number} className="values_item">
                  <p className="values_number">{item.number}</p>
                  <h3 className="values_title heading-style-h3">{item.title}</h3>
                  <p className="values_text text-size-regular text-color-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA
        headingPrimary="Talk to a partner,"
        headingMuted="not a sales team."
      />
    </SiteLayout>
  );
}
