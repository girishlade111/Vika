import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import {
  getPersonBySlug,
  getInsightsByAuthor,
  getCaseStudiesByPerson,
  getServiceBySlug,
} from '@/data/cmsRelations';
import { PEOPLE } from '@/data/people';
import { useBooking } from '@/context/BookingContext';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function PersonDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const person = getPersonBySlug(slug);
  const { openBooking } = useBooking();

  if (!person) {
    return <NotFoundPage />;
  }

  const others = PEOPLE.filter((p) => p.slug !== person.slug);
  const authoredInsights = getInsightsByAuthor(person.slug);
  const caseStudies = getCaseStudiesByPerson(person.slug);
  const services = person.relatedServices
    .map((sSlug) => getServiceBySlug(sSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <SiteLayout title={person.seo.title} description={person.seo.description}>
      <header className="section-person-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/team" className="page-header_crumb-link">
                Team
              </Link>
              <span aria-hidden="true">/</span>
              <span>{person.office}</span>
            </p>
            <p className="page-header_number text-style-label">
              {person.role} · {person.credential}
            </p>

            <h1 className="page-header_heading heading-style-display">{person.name}</h1>

            <div className="person-hero_grid" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              <div className="person-hero_media">
                <div className="person-hero_image-wrapper">
                  <img
                    src={person.portrait}
                    alt={person.name}
                    loading="eager"
                    className="person-hero_image"
                  />
                </div>
              </div>

              <div className="person-hero_content">
                <blockquote className="heading-style-h3">
                  &ldquo;{person.quote}&rdquo;
                </blockquote>

                <div className="person-hero_bio" style={{ marginTop: '1.75rem' }}>
                  {person.biography.map((para, i) => (
                    <p key={i} className="text-color-secondary" style={{ marginTop: i ? '1rem' : 0 }}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="person-hero_actions" style={{ marginTop: '2rem' }}>
                  <VikaButton
                    label="Book a call"
                    hoverLabel="talk it through"
                    variant="brand"
                    onClick={() => openBooking({ partnerSlug: person.slug })}
                  />
                  <div className="person-hero_contact-links">
                    <a
                      href={`tel:${person.phone.replace(/\s+/g, '')}`}
                      className="text-style-link"
                    >
                      {person.phone}
                    </a>
                    <a href={`mailto:${person.email}`} className="text-style-link">
                      {person.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-person-detail">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">(01) At a glance</p>
                <div className="detail_content">
                  <h2 className="heading-style-h3">Statement of practice</h2>
                  <div className="detail_facts" style={{ marginTop: '1.5rem' }}>
                    <p className="detail_fact-label text-style-label">01 Practice areas</p>
                    <p className="detail_fact-value">{person.practiceAreas}</p>

                    <p className="detail_fact-label text-style-label">02 Sectors</p>
                    <p className="detail_fact-value">{person.sectors}</p>

                    <p className="detail_fact-label text-style-label">03 Languages</p>
                    <p className="detail_fact-value">{person.languages}</p>

                    <p className="detail_fact-label text-style-label">04 Qualifications</p>
                    <p className="detail_fact-value">{person.qualifications}</p>

                    <p className="detail_fact-label text-style-label">
                      05 Memberships and registrations
                    </p>
                    <p className="detail_fact-value">{person.memberships}</p>

                    <p className="detail_fact-label text-style-label">06 Joined</p>
                    <p className="detail_fact-value">{person.joinedYear}</p>

                    <p className="detail_fact-label text-style-label">Total Years in practice</p>
                    <p className="detail_fact-value">{person.yearsInPractice}</p>
                  </div>
                </div>
              </div>

              {services.length > 0 && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">Practices</p>
                  <div className="detail_content">
                    <div className="detail_facts">
                      {services.map((srv) => (
                        <div key={srv.id} style={{ display: 'contents' }}>
                          <p className="detail_fact-label text-style-label">{srv.number}</p>
                          <p className="detail_fact-value">
                            <Link to={`/services/${srv.slug}`} className="text-style-link">
                              {srv.name}
                            </Link>{' '}
                            · {srv.shortSummary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {authoredInsights.length > 0 && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">Written by {person.name}</p>
                  <div className="detail_content">
                    <div className="detail_facts">
                      {authoredInsights.map((note) => (
                        <div key={note.id} style={{ display: 'contents' }}>
                          <p className="detail_fact-label text-style-label">
                            {note.publicationDate}
                          </p>
                          <p className="detail_fact-value">
                            <Link to={`/insights/${note.slug}`} className="text-style-link">
                              {note.title}
                            </Link>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {caseStudies.length > 0 && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">Engagements</p>
                  <div className="detail_content">
                    <div className="detail_facts">
                      {caseStudies.map((cs) => (
                        <div key={cs.id} style={{ display: 'contents' }}>
                          <p className="detail_fact-label text-style-label">
                            {cs.primaryMetric.value}
                          </p>
                          <p className="detail_fact-value">
                            <Link to={`/case-studies/${cs.slug}`} className="text-style-link">
                              {cs.title}
                            </Link>
                          </p>
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

      <section className="section-person-team">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(02) The team</p>
              <h2 className="section-head_heading heading-style-h2">
                The rest of the team, <span className="text-color-tertiary">one call away.</span>
              </h2>
            </div>

            <div className="team-strip_component" style={{ marginTop: '2.5rem' }}>
              <div className="team-strip_list">
                {others.map((colleague) => (
                  <div key={colleague.id} className="team-strip_item">
                    <Link
                      to={`/people/${colleague.slug}`}
                      className="person-team_card w-inline-block"
                    >
                      <div className="person-card_component">
                        <div className="team-strip_media">
                          <img
                            src={colleague.portrait}
                            alt={colleague.name}
                            loading="lazy"
                            className="team-strip_image"
                          />
                        </div>
                        <p className="team-strip_name">{colleague.name}</p>
                        <p className="team-strip_role text-color-secondary">{colleague.role}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA headingPrimary="Talk to a partner," headingMuted="not a sales team." />
    </SiteLayout>
  );
}
