import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { getDeadlineBySlug, getPersonBySlug, getServiceBySlug } from '@/data/cmsRelations';
import { DEADLINES } from '@/data/deadlines';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function DeadlineDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const deadline = getDeadlineBySlug(slug);

  if (!deadline) {
    return <NotFoundPage />;
  }

  const relatedService = getServiceBySlug(deadline.relatedServiceSlug);
  const leadPerson = getPersonBySlug(deadline.leadPersonSlug);
  const otherDeadlines = DEADLINES.filter(
    (d) => d.jurisdiction === deadline.jurisdiction && d.slug !== deadline.slug,
  ).slice(0, 3);

  return (
    <SiteLayout title={deadline.seo.title} description={deadline.seo.description}>
      <header className="section-deadline-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/services#calendar" className="page-header_crumb-link">
                Calendar
              </Link>
            </p>
            <p className="page-header_number text-style-label">{deadline.jurisdiction}</p>

            <h1 className="page-header_heading heading-style-h1">{deadline.title}</h1>

            <p className="page-header_lede text-size-medium text-color-secondary">
              {deadline.summary}
            </p>
          </div>
        </div>
      </header>

      <section className="section-deadline-detail">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">Due</p>
                <div className="detail_content">
                  <h2 className="deadline-detail_date heading-style-h2">{deadline.date}</h2>
                  <p className="detail_lead" style={{ marginTop: '0.75rem' }}>
                    {deadline.practice}
                  </p>
                  <p className="text-size-small text-color-secondary" style={{ marginTop: '0.75rem' }}>
                    Worked out for calendar quarters and a 31 December year end. General
                    information, not advice for your company. Check your own dates with us before
                    you rely on them.
                  </p>

                  <div className="detail_facts" style={{ marginTop: '2rem' }}>
                    <p className="detail_fact-label text-style-label">Released by</p>
                    <p className="detail_fact-value">{deadline.releasedBy}</p>

                    <p className="detail_fact-label text-style-label">Period</p>
                    <p className="detail_fact-value">{deadline.period}</p>

                    <p className="detail_fact-label text-style-label">Send records by</p>
                    <p className="detail_fact-value">{deadline.sendRecordsBy}</p>

                    <p className="detail_fact-label text-style-label">Last checked</p>
                    <p className="detail_fact-value">{deadline.lastChecked}</p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">What it is</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>{deadline.whatItIs}</p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">What is new</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>{deadline.whatIsNew}</p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">Who it applies to</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>{deadline.whoItAppliesTo}</p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">What we do</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      {deadline.whatWeDo.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">What we need from you</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <ul>
                      {deadline.clientRequirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">If missed</p>
                <div className="detail_content">
                  <div className="detail_rich w-richtext">
                    <p>{deadline.consequences}</p>
                  </div>
                </div>
              </div>

              <div className="detail_component">
                <p className="detail_label text-style-label">Reference & team</p>
                <div className="detail_content">
                  <div className="detail_facts">
                    <p className="detail_fact-label text-style-label">Official guidance</p>
                    <p className="detail_fact-value">
                      <a
                        href={deadline.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-style-link"
                      >
                        {deadline.officialSourceLabel}
                      </a>
                    </p>

                    {relatedService && (
                      <>
                        <p className="detail_fact-label text-style-label">Service</p>
                        <p className="detail_fact-value">
                          <Link
                            to={`/services/${relatedService.slug}`}
                            className="text-style-link"
                          >
                            {relatedService.name}
                          </Link>
                        </p>
                      </>
                    )}

                    {leadPerson && (
                      <>
                        <p className="detail_fact-label text-style-label">Partner</p>
                        <p className="detail_fact-value">
                          <Link to={`/people/${leadPerson.slug}`} className="text-style-link">
                            {leadPerson.name} · {leadPerson.role}
                          </Link>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {otherDeadlines.length > 0 && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">More {deadline.jurisdiction} dates</p>
                  <div className="detail_content">
                    <div className="detail_facts">
                      {otherDeadlines.map((other) => (
                        <div key={other.id} style={{ display: 'contents' }}>
                          <p className="detail_fact-label text-style-label">{other.date}</p>
                          <p className="detail_fact-value">
                            <Link to={`/deadlines/${other.slug}`} className="text-style-link">
                              {other.title}
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

      <PracticeCTA headingPrimary="Want this date managed?" headingMuted="Book a quick check." />
    </SiteLayout>
  );
}
