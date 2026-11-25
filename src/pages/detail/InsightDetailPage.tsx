import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { getInsightBySlug, getPersonBySlug } from '@/data/cmsRelations';
import { INSIGHTS } from '@/data/insights';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function InsightDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return <NotFoundPage />;
  }

  const author = getPersonBySlug(insight.authorSlug);
  const related = INSIGHTS.filter((item) => insight.relatedInsights.includes(item.slug));

  return (
    <SiteLayout title={insight.seo.title} description={insight.seo.description}>
      <header className="section-insight-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/insights" className="page-header_crumb-link">
                Insights
              </Link>
            </p>
            <p className="page-header_number text-style-label">{insight.publicationDate}</p>

            <h1 className="page-header_heading insight-header_title heading-style-h1">
              {insight.title}
            </h1>

            <div className="insight-header_meta">
              {author && (
                <Link to={`/people/${author.slug}`} className="insights-author">
                  <div className="insights-author_image-wrapper">
                    <img
                      src={author.portrait}
                      alt={author.name}
                      loading="eager"
                      className="insights-author_image"
                    />
                  </div>
                  <div className="insights-author_text">
                    <p className="text-weight-medium">{author.name}</p>
                    <p className="text-size-small text-color-secondary">{author.role}</p>
                  </div>
                </Link>
              )}

              <div className="insight-header_facts">
                <span className="text-style-label text-color-secondary">{insight.category}</span>
                <span className="text-style-label text-color-secondary" aria-hidden="true">
                  ·
                </span>
                <span className="text-style-label text-color-secondary">
                  {insight.readingTime} min
                </span>
              </div>
            </div>

            <div className="page-header_media">
              <div className="page-header_image-wrapper">
                <img
                  src={insight.coverImage}
                  alt={insight.coverAlt}
                  loading="eager"
                  className="page-header_image"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="section-insight-article">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <aside className="insight-article_aside">
              <p className="text-style-label">In this note</p>
              <p className="insight-article_excerpt text-size-regular text-color-secondary">
                {insight.excerpt}
              </p>
            </aside>

            <div className="insight-article_content">
              <div className="insight-article_body text-rich-text w-richtext">
                <p className="text-size-large">{insight.leadParagraph}</p>

                {insight.sections.map((section) => (
                  <section key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {section.callouts &&
                      section.callouts.map((callout, i) => (
                        <blockquote key={i}>{callout}</blockquote>
                      ))}
                  </section>
                ))}

                {insight.closingNote && <p>{insight.closingNote}</p>}
              </div>

              <p className="insight-article_note text-size-small text-color-secondary">
                {insight.disclaimer}
              </p>

              {author && (
                <Link to={`/people/${author.slug}`} className="insight-article_author">
                  <div className="insight-article_author-image-wrapper">
                    <img
                      src={author.portrait}
                      alt={author.name}
                      loading="lazy"
                      className="insight-article_author-image"
                    />
                  </div>
                  <div className="insight-article_author-text">
                    <p className="text-weight-medium">{author.name}</p>
                    <p className="text-style-label text-color-secondary">{author.role}</p>
                    <p className="text-size-small text-color-secondary" style={{ marginTop: '0.4rem' }}>
                      {author.shortBiography}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-insight-related">
          <div className="padding-global padding-section-large">
            <div className="grid-global">
              <div className="section-head">
                <p className="section-head_label text-style-label">Keep reading</p>
                <h2 className="section-head_heading heading-style-h2">
                  More from <span className="text-color-tertiary">the studio.</span>
                </h2>
              </div>

              <div className="insight-related_component" style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
                <div className="insight-cards_list">
                  {related.map((item) => (
                    <div key={item.id} className="insight-cards_item">
                      <Link
                        to={`/insights/${item.slug}`}
                        className="insight-cards_card w-inline-block"
                      >
                        <div className="insight-card_component">
                          <div className="insight-cards_image-wrapper">
                            <img
                              src={item.coverImage}
                              alt={item.coverAlt}
                              loading="lazy"
                              className="insight-cards_image"
                            />
                          </div>
                          <div className="insight-cards_meta">
                            <span className="text-style-label text-color-secondary">
                              {item.category}
                            </span>
                            <span className="text-style-label text-color-secondary">
                              {item.publicationDate}
                            </span>
                          </div>
                          <h3 className="insight-cards_title heading-style-h3">{item.title}</h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <PracticeCTA
        headingPrimary="Want to talk this through?"
        headingMuted="Speak to the author."
      />
    </SiteLayout>
  );
}
