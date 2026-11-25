import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEADLINES } from '@/data/deadlines';
import type { Jurisdiction } from '@/data/types';

interface DeadlineCalendarProps {
  sectionLabel?: string;
  headingPrimary?: string;
  headingMuted?: string;
}

export function DeadlineCalendar({
  sectionLabel = '(03) The calendar',
  headingPrimary = 'Every deadline,',
  headingMuted = 'kept for you.',
}: DeadlineCalendarProps) {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('UAE');

  const items = DEADLINES.filter((d) => d.jurisdiction === jurisdiction);
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <section id="calendar" className="section-home-calendar">
      <div className="padding-global padding-section-large">
        <div className="grid-global">
          <div className="section-head">
            <p className="section-head_label text-style-label">{sectionLabel}</p>
            <h2 className="section-head_heading heading-style-h2">
              {headingPrimary} <span className="text-color-tertiary">{headingMuted}</span>
            </h2>
          </div>

          <div className="home-calendar_tabs">
            <div className="tabs_menu" role="tablist" aria-label="Tax calendar jurisdiction">
              <button
                type="button"
                role="tab"
                aria-selected={jurisdiction === 'UAE'}
                className={`tabs_link w-inline-block w-tab-link ${jurisdiction === 'UAE' ? 'w--current' : ''}`}
                onClick={() => setJurisdiction('UAE')}
              >
                UAE
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={jurisdiction === 'UK'}
                className={`tabs_link w-inline-block w-tab-link ${jurisdiction === 'UK' ? 'w--current' : ''}`}
                onClick={() => setJurisdiction('UK')}
              >
                UK
              </button>
            </div>

            <div className="home-calendar_grid">
              {featured && (
                <Link to={`/deadlines/${featured.slug}`} className="home-calendar_card w-inline-block">
                  <p className="home-calendar_card-label text-style-label">Next deadline</p>
                  <p className="home-calendar_card-date">{featured.date}</p>
                  <h3 className="home-calendar_card-title heading-style-h3">{featured.title}</h3>
                  <p className="home-calendar_card-detail text-size-regular">{featured.summary}</p>
                  <p className="home-calendar_card-kind text-style-label">{featured.practice}</p>
                </Link>
              )}

              <div className="home-calendar_list">
                {rest.map((item) => (
                  <Link
                    key={item.id}
                    to={`/deadlines/${item.slug}`}
                    className="home-calendar_row w-inline-block"
                  >
                    <div className="home-calendar_row-head">
                      <p className="text-size-regular text-weight-medium">{item.date}</p>
                      <p className="text-style-label">{item.practice}</p>
                    </div>
                    <p className="text-size-regular">{item.title}</p>
                    <p className="text-size-small text-color-secondary">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>

            <p className="home-calendar_note text-size-small text-color-secondary">
              Sample calendar for a company with calendar quarters and a 31 December year end.
              Statutory dates, before any weekend or holiday adjustment. General demonstration
              information, not advice for your company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
