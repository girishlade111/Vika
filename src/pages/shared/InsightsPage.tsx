import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { INSIGHTS } from '@/data/insights';
import { PEOPLE } from '@/data/people';

export function InsightsPage() {
  const featured = INSIGHTS[0];
  const featuredAuthor = PEOPLE.find((p) => p.slug === featured.authorSlug);

  return (
    <SiteLayout
      title="Insights | Notes on UAE and UK tax"
      description="Notes from the Vika studio on UAE corporate tax, monthly close, statutory audits and cross-border VAT."
    >
      {/* 1. Insights Header + Featured Split Card */}
      <header className="section-insights-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Insights</span>
            </p>
            <p className="page-header_number text-style-label">(04) Insights</p>

            <h1 className="page-header_heading heading-style-display">
              Notes from <span className="text-color-tertiary">the studio.</span>
            </h1>

            <p className="page-header_lede text-size-large">
              Plain notes on UAE corporate tax, UK VAT, month end closes and free zone audits,
              written by the partners who sign the returns.
            </p>

            <p className="page-header_status text-style-label">
              {INSIGHTS.length} notes · Updated October 2026
            </p>

            {featured && (
              <div className="insights-featured_component">
                <Link
                  to={`/insights/${featured.slug}`}
                  className="insights-featured_card w-inline-block"
                >
                  <div className="insights-featured_image-wrapper">
                    <img
                      src={featured.coverImage}
                      alt={featured.coverAlt}
                      loading="eager"
                      className="insights-featured_image"
                    />
                  </div>
                  <div className="insights-featured_content">
                    <div className="insights-featured_meta">
                      <p className="text-style-label">Featured</p>
                      <p className="text-style-label">{featured.category}</p>
                      <p className="text-style-label">{featured.publicationDate}</p>
                      <p className="text-style-label">{featured.readingTime} min</p>
                    </div>
                    <h2 className="insights-featured_title">{featured.title}</h2>
                    <p className="insights-featured_excerpt text-size-regular text-color-secondary">
                      {featured.excerpt}
                    </p>

                    {featuredAuthor && (
                      <div className="insights-author">
                        <div className="insights-author_image-wrapper">
                          <img
                            src={featuredAuthor.portrait}
                            alt={featuredAuthor.name}
                            loading="eager"
                            className="insights-author_image"
                          />
                        </div>
                        <div className="insights-author_text">
                          <p className="text-size-small text-weight-medium">
                            {featuredAuthor.name}
                          </p>
                          <p className="text-size-small text-color-secondary">
                            {featuredAuthor.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Browse by Practice Editorial List */}
      <section className="section-insights-list">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">All notes</p>
              <h2 className="section-head_heading heading-style-h2">
                Browse <span className="text-color-tertiary">by practice.</span>
              </h2>
            </div>

            <div className="insights-list_component">
              <div className="insights-list_list">
                {INSIGHTS.map((ins) => (
                  <div key={ins.id} className="insights-list_item">
                    <Link
                      to={`/insights/${ins.slug}`}
                      className="insights-list_row w-inline-block"
                    >
                      <div className="insight-row_component">
                        <p className="insights-list_date text-style-label">{ins.publicationDate}</p>
                        <h3 className="insights-list_title heading-style-h3">{ins.title}</h3>
                        <p className="insights-list_category text-style-label">{ins.category}</p>
                        <p className="insights-list_time text-style-label">{ins.readingTime} min</p>
                        <span className="insights-list_icon" aria-hidden="true">
                          <span className="button_arrow">
                            <span className="button_arrow-line" />
                            <span className="button_arrow-head" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
