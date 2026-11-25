import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PEOPLE } from '@/data/people';
import { OFFICES } from '@/data/offices';
import { SITE_CONFIG } from '@/data/siteConfig';
import { OfficeClock } from '@/components/common/OfficeClock';

const STUDIO_FACTS = [
  { label: 'Founded', value: '2016' },
  { label: 'Offices', value: 'Dubai and London' },
  { label: 'People', value: '26' },
  { label: 'Companies', value: '340' },
  { label: 'Returns filed last year', value: '2,100' },
  { label: 'Close deadline', value: 'Tenth working day', accent: true },
];

export function StatementStudio() {
  return (
    <SiteLayout
      title="Studio | Vika accounting and tax, Statement layout"
      description="Ten years, five moments, three rules, and a register of the partners and managers on your file."
    >
      {/* 1. Statement Studio Header & Facts */}
      <header className="section-studio-statement-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/statement/home-statement" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Studio</span>
            </p>
            <p className="page-header_number text-style-label">(03) Studio</p>

            <div className="studio-statement_intro">
              <h1 className="heading-style-h1">
                A small firm, <span className="text-color-tertiary">on purpose.</span>
              </h1>
              <p className="studio-statement_lede text-size-large">
                Vika opened in 2016 with four clients and one rule: close every month by the tenth
                working day.
              </p>
            </div>

            <div className="facts-list_component">
              {STUDIO_FACTS.map((f) => (
                <div key={f.label} className="facts-list_row">
                  <div className="text-style-label">{f.label}</div>
                  <div className={`facts-list_value ${f.accent ? 'is-accent' : ''}`}>
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Stacked Rules Cards */}
      <section className="section-studio-statement-rules">
        <div className="padding-global padding-section-medium">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(01) How we work</p>
              <h2 className="section-head_heading heading-style-h2">
                Three rules. <span className="text-color-tertiary">No exceptions.</span>
              </h2>
            </div>

            <div className="rule-stack_component">
              {SITE_CONFIG.coreRules.map((rule, idx) => (
                <article
                  key={rule.number}
                  className={`rule-stack_card ${idx === 1 ? 'is-second' : idx === 2 ? 'is-third' : ''}`}
                >
                  <div className="rule-stack_number">{rule.number}</div>
                  <div className="rule-stack_body">
                    <div className="text-style-label">Rule {rule.number}</div>
                    <h3 className="rule-stack_title">{rule.title}</h3>
                    <p className="rule-stack_text">{rule.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Growth Bar Record */}
      <section className="section-studio-statement-record">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(02) The record</p>
              <h2 className="section-head_heading heading-style-h2">
                Clients on the books, <span className="text-color-tertiary">year by year.</span>
              </h2>
            </div>

            <ul className="growth_list" style={{ gridColumn: '1 / -1', listStyle: 'none', padding: 0, margin: '2.5rem 0 0' }}>
              {SITE_CONFIG.timelineMoments.map((m) => (
                <li key={m.year} className="growth_row">
                  <p className="growth_year">{m.year}</p>
                  <div className="growth_bar-wrap">
                    <div className="growth_bar">
                      <div
                        className={`growth_fill is-${m.year}`}
                        data-width={`${m.barWidthPercent}%`}
                        style={{ width: `${m.barWidthPercent}%` }}
                      />
                    </div>
                    <p className="growth_count">{m.clientsCount}</p>
                  </div>
                  <p className="growth_text">{m.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Register Table */}
      <section className="section-studio-statement-team">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(03) The register</p>
              <h2 className="section-head_heading heading-style-h2">
                Partners <span className="text-color-tertiary">and managers.</span>
              </h2>
            </div>

            <div className="register_wrap" style={{ gridColumn: '1 / -1', overflowX: 'auto', marginTop: '2.5rem' }}>
              <table className="register_table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color--border-primary)', textAlign: 'left' }}>
                    <th className="text-style-label" style={{ padding: '0.75rem 0' }}>Name</th>
                    <th className="text-style-label" style={{ padding: '0.75rem 0' }}>Role</th>
                    <th className="text-style-label" style={{ padding: '0.75rem 0' }}>Credential</th>
                    <th className="text-style-label" style={{ padding: '0.75rem 0' }}>Office</th>
                    <th className="text-style-label" style={{ padding: '0.75rem 0' }}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {PEOPLE.map((p) => (
                    <tr
                      key={p.id}
                      style={{ borderBottom: '1px solid var(--border-color--border-primary)' }}
                    >
                      <td style={{ padding: '1rem 0' }}>
                        <Link to={`/people/${p.slug}`} className="text-style-link">
                          {p.name}
                        </Link>
                      </td>
                      <td className="text-size-regular text-color-secondary" style={{ padding: '1rem 0' }}>
                        {p.role}
                      </td>
                      <td className="text-style-label" style={{ padding: '1rem 0' }}>
                        {p.credential}
                      </td>
                      <td className="text-style-label" style={{ padding: '1rem 0' }}>
                        {p.office}
                      </td>
                      <td style={{ padding: '1rem 0' }}>
                        <a href={`mailto:${p.email}`} className="text-style-link text-size-small">
                          {p.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Offices with Live Analog Clocks */}
      <section className="section-studio-statement-offices">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">(04) Offices</p>
              <h2 className="section-head_heading heading-style-h2">
                Two offices, <span className="text-color-tertiary">one calendar.</span>
              </h2>
            </div>

            <div className="offices_clocks" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
              {[OFFICES.dubai, OFFICES.london].map((office) => (
                <article
                  key={office.id}
                  style={{
                    padding: '2rem',
                    border: '1px solid var(--border-color--border-primary)',
                    borderRadius: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 className="heading-style-h3">{office.city}</h3>
                      <p className="text-style-label">{office.tzLabel}</p>
                    </div>
                    <OfficeClock timezone={office.timezone} size="large" />
                  </div>
                  <p className="text-style-label">{office.hoursLabel}</p>
                  <p className="text-size-regular text-color-secondary">
                    {office.addressLines.join(', ')}
                  </p>
                  <a href={office.phoneHref} className="text-style-link" style={{ alignSelf: 'flex-start' }}>
                    {office.phone}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
