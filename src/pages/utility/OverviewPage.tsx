import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';

interface OverviewItem {
  to: string;
  urlLabel: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}

const HOME_LAYOUT_CARDS: OverviewItem[] = [
  {
    to: '/',
    urlLabel: 'vika.example',
    title: 'Index',
    tag: '01 Classic',
    description:
      'Paper, ink and a burgundy accent. The calm, editorial version of the studio.',
    image: '/assets/images/shared/6ad869721f8ecd7e31e2232e_vika-overview-home-v2.webp',
  },
  {
    to: '/cinematic/home-cinematic',
    urlLabel: 'vika.example/home-cinematic',
    title: 'Index',
    tag: '02 Cinematic',
    description: 'Full bleed imagery, dark sections and a slow, filmic scroll.',
    image:
      '/assets/images/shared/6ad869722ff22c6be4899121_vika-overview-home-cinematic-v2.webp',
  },
  {
    to: '/statement/home-statement',
    urlLabel: 'vika.example/home-statement',
    title: 'Index',
    tag: '03 Statement',
    description: 'Giant type, ruled ledgers and the boldest first impression.',
    image:
      '/assets/images/shared/6ad86972758abe2d44e15706_vika-overview-home-statement-v2.webp',
  },
];

const MAIN_PAGES: { heading: string; sub: string; cards: OverviewItem[] }[] = [
  {
    heading: 'Studio',
    sub: 'People and offices',
    cards: [
      {
        to: '/studio',
        urlLabel: 'vika.example/studio',
        title: 'Studio Classic',
        tag: '01',
        description: 'The firm, its partners and its two offices.',
        image: '/assets/images/studio/6ad84e4494935c714ce22ff9_vika-overview-studio.webp',
      },
      {
        to: '/cinematic/studio-cinematic',
        urlLabel: 'vika.example/studio-cinematic',
        title: 'Studio Cinematic',
        tag: '02',
        description: 'Wide office imagery, growth figures and the team.',
        image:
          '/assets/images/studio/6ad84e442d080ae1dcd73f04_vika-overview-studio-cinematic.webp',
      },
      {
        to: '/statement/studio-statement',
        urlLabel: 'vika.example/studio-statement',
        title: 'Studio Statement',
        tag: '03',
        description: 'Values, growth bars and live office clocks.',
        image:
          '/assets/images/studio/6ad84e445865d33ce76eadbc_vika-overview-studio-statement.webp',
      },
    ],
  },
  {
    heading: 'Team, Services, Pricing & Insights',
    sub: 'Shared firm pages',
    cards: [
      {
        to: '/team',
        urlLabel: 'vika.example/team',
        title: 'Team',
        tag: 'Shared',
        description: 'Partner profiles, managers and how the firm works with you.',
        image: '/assets/images/shared/6ad9b7148a9a9d1b25c2f9bd_vika-overview-team.webp',
      },
      {
        to: '/services',
        urlLabel: 'vika.example/services',
        title: 'Services',
        tag: 'Shared',
        description: 'Practices, fees and the calendar in clean editorial rows.',
        image: '/assets/images/services/6ad84e199b907d4a3788ab09_vika-overview-services.webp',
      },
      {
        to: '/pricing',
        urlLabel: 'vika.example/pricing',
        title: 'Pricing',
        tag: 'Shared',
        description:
          'Monthly plans, a plan by plan comparison, priced extras and how billing works.',
        image: '/assets/images/shared/6ad9d74ec31cd8670c13f27c_vika-overview-pricing-v3.webp',
      },
      {
        to: '/insights',
        urlLabel: 'vika.example/insights',
        title: 'Insights',
        tag: 'Shared',
        description: 'A featured note and the full list of articles.',
        image: '/assets/images/insights/6ad84e441a9cb9cd04c85ced_vika-overview-insights.webp',
      },
    ],
  },
  {
    heading: 'Contact',
    sub: 'Calls and enquiries',
    cards: [
      {
        to: '/contact',
        urlLabel: 'vika.example/contact',
        title: 'Contact Classic',
        tag: '01',
        description: 'Book a call or write to either office.',
        image: '/assets/images/shared/6ad84e4597486c17fce17058_vika-overview-contact.webp',
      },
      {
        to: '/cinematic/contact-cinematic',
        urlLabel: 'vika.example/contact-cinematic',
        title: 'Contact Cinematic',
        tag: '02',
        description: 'Choose a partner, then a day and a time.',
        image:
          '/assets/images/shared/6ad84e463e9b6d3dd7f24da6_vika-overview-contact-cinematic.webp',
      },
      {
        to: '/statement/contact-statement',
        urlLabel: 'vika.example/contact-statement',
        title: 'Contact Statement',
        tag: '03',
        description: 'One question at a time, with a live summary.',
        image:
          '/assets/images/shared/6ad84e4794935c714ce231c4_vika-overview-contact-statement.webp',
      },
    ],
  },
];

const CMS_TEMPLATES: OverviewItem[] = [
  {
    to: '/services/accounting',
    urlLabel: 'vika.example/services/accounting',
    title: 'Service page',
    tag: 'Template',
    description: 'Steps, fees, the partner and related case studies.',
    image:
      '/assets/images/services/6ad84e47a17432406d67b6d1_vika-overview-tpl-service.webp',
  },
  {
    to: '/insights/uk-vat-for-gulf-companies',
    urlLabel: 'vika.example/insights/uk-vat-for-gulf-companies',
    title: 'Insight article',
    tag: 'Template',
    description: 'A long form note with its author and related reading.',
    image:
      '/assets/images/insights/6ad860f06673e37f1acb112b_vika-overview-tpl-insight-v2.webp',
  },
  {
    to: '/case-studies/trading-group-monthly-close',
    urlLabel: 'vika.example/case-studies/trading-group-monthly-close',
    title: 'Case study',
    tag: 'Template',
    description: 'The challenge, the work, three results and a quote.',
    image:
      '/assets/images/case-studies/6ad84e48a522350cc8c47f9e_vika-overview-tpl-case.webp',
  },
  {
    to: '/people/sara-lindqvist',
    urlLabel: 'vika.example/people/sara-lindqvist',
    title: 'Person',
    tag: 'Template',
    description: 'A partner profile with credentials and contact details.',
    image:
      '/assets/images/people/6ad9d74ec5490e98f90aef78_vika-overview-tpl-person-v3.webp',
  },
  {
    to: '/plans/statutory-audit',
    urlLabel: 'vika.example/plans/statutory-audit',
    title: 'Fee plan',
    tag: 'Template',
    description: 'Scope, team, turnaround, add ons and terms for one plan.',
    image: '/assets/images/shared/6ad84e68cff550a80a2fde95_vika-overview-tpl-plan.webp',
  },
  {
    to: '/deadlines/uk-ct600-2026',
    urlLabel: 'vika.example/deadlines/uk-ct600-2026',
    title: 'Deadline',
    tag: 'Template',
    description: 'One filing date explained, with penalties and the source.',
    image: '/assets/images/shared/6ad84e6afb4aa85e0a1e6f03_vika-overview-tpl-deadline.webp',
  },
  {
    to: '/questions/how-fees-work',
    urlLabel: 'vika.example/questions/how-fees-work',
    title: 'Question',
    tag: 'Template',
    description: 'A single answer from the questions list.',
    image: '/assets/images/shared/6ad84e6aa522350cc8c48774_vika-overview-tpl-question.webp',
  },
  {
    to: '/case-studies',
    urlLabel: 'vika.example/case-studies',
    title: 'Case studies',
    tag: 'Listing',
    description: 'Every client story in one grid, run from the CMS.',
    image:
      '/assets/images/case-studies/6ad860f06e365b69295785a7_vika-overview-case-studies-v2.webp',
  },
];

const UTILITY_PAGES: OverviewItem[] = [
  {
    to: '/style-guide',
    urlLabel: 'vika.example/style-guide',
    title: 'Style guide',
    tag: 'Utility',
    description: 'Type, colour, buttons and spacing classes.',
    image: '/assets/images/shared/6ad84e6b9a7530b37646a53b_vika-overview-style-guide.webp',
  },
  {
    to: '/instructions',
    urlLabel: 'vika.example/instructions',
    title: 'Instructions',
    tag: 'Utility',
    description: 'How to edit every part of the template.',
    image: '/assets/images/shared/6ada2d5b76c06d675290eb53_vika-overview-instructions-v3.webp',
  },
  {
    to: '/licenses',
    urlLabel: 'vika.example/licenses',
    title: 'Licenses',
    tag: 'Utility',
    description: 'The fonts, images and tools used in Vika.',
    image: '/assets/images/shared/6ad9d74e1957d6eae159187b_vika-overview-licenses-v3.webp',
  },
  {
    to: '/changelog',
    urlLabel: 'vika.example/changelog',
    title: 'Changelog',
    tag: 'Utility',
    description: 'Every version and what changed in it.',
    image: '/assets/images/shared/6ad9d74e5f0bad41636b3d87_vika-overview-changelog-v3.webp',
  },
  {
    to: '/privacy-policy',
    urlLabel: 'vika.example/privacy-policy',
    title: 'Privacy Policy',
    tag: 'Utility',
    description: 'A sample policy for the UAE and the UK.',
    image: '/assets/images/shared/6ad84e6b4e85f3eaaa298b54_vika-overview-privacy.webp',
  },
  {
    to: '/404',
    urlLabel: 'vika.example/404',
    title: '404',
    tag: 'Utility',
    description: 'The page visitors see when a link is out of date.',
    image: '/assets/images/shared/6ad84e6b4e1abfacb821f6f4_vika-overview-404.webp',
  },
  {
    to: '/401',
    urlLabel: 'vika.example/401',
    title: 'Password',
    tag: 'Utility',
    description: 'The page for password protected areas.',
    image: '/assets/images/shared/6ad84e6c4e1abfacb821f724_vika-overview-password.webp',
  },
];

function OverviewCard({ item }: { item: OverviewItem }) {
  return (
    <Link to={item.to} className="overview-card_component w-inline-block">
      <div className="overview-card_frame">
        <div className="overview-card_bar">
          <span className="overview-card_dot" aria-hidden="true" />
          <p className="overview-card_url text-style-label">{item.urlLabel}</p>
        </div>
        <div className="overview-card_media">
          <img
            src={item.image}
            alt={`${item.title} ${item.tag}`}
            loading="lazy"
            className="overview-card_image"
          />
        </div>
      </div>
      <div className="overview-card_meta">
        <p className="overview-card_title">{item.title}</p>
        <p className="overview-card_tag text-style-label">{item.tag}</p>
      </div>
      <p className="overview-card_text text-color-secondary">{item.description}</p>
    </Link>
  );
}

export function OverviewPage() {
  return (
    <SiteLayout
      title="Overview | Vika accounting, tax and audit website map"
      description="Three home layouts, UAE and UK pricing and seven CMS collections, mapped page by page across Classic, Cinematic and Statement."
    >
      <header className="section-sale-hero">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="sale-hero_content">
              <div className="sale-hero_badge">
                <span className="sale-hero_dot" aria-hidden="true" />
                <p className="sale-hero_badge-text text-style-label">
                  System map for accounting, tax and audit firms
                </p>
              </div>
              <h1 className="sale-hero_heading heading-style-h1">
                A website that holds up to scrutiny.
              </h1>
              <p className="sale-hero_lede text-size-medium text-color-secondary">
                Three home layouts, UAE and UK pricing switches and seven interconnected CMS
                collections, built for accounting, tax and audit firms.
              </p>
              <div className="sale-hero_actions">
                <VikaButton
                  label="Explore Classic"
                  hoverLabel="open index"
                  variant="brand"
                  to="/"
                />
                <a href="#pages" className="text-style-link">
                  Explore pages
                </a>
              </div>
              <p className="sale-hero_note text-size-small text-color-secondary">
                Official studio reference:{' '}
                <a
                  href="https://www.margined.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sale-hero_note-link text-style-link"
                >
                  margined.co
                </a>
                .
              </p>
            </div>

            <div className="sale-hero_device">
              <div className="sale-hero_laptop">
                <div className="sale-hero_screen">
                  <div className="sale-hero_display">
                    <img
                      src="/assets/images/hero/6ad93b1277d6a74feb16ba2f_vika-overview-hero-screen.webp"
                      alt="Vika website preview screen"
                      loading="eager"
                      className="sale-hero_image"
                    />
                    <video
                      className="sale-hero_video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/assets/images/shared/6ad70fa4dbb1938da989fd76_6adb27cfd75d93591180ceb5_vika-overview-laptop-loop_1_poster.0000000.jpg"
                    >
                      <source
                        src="/assets/videos/shared/6adb27cfd75d93591180ceb5_vika-overview-laptop-loop_1_mp4.mp4"
                        type="video/mp4"
                      />
                      <source
                        src="/assets/videos/shared/6adb27cfd75d93591180ceb5_vika-overview-laptop-loop_1_webm.webm"
                        type="video/webm"
                      />
                    </video>
                  </div>
                </div>
                <div className="sale-hero_base" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-sale-system">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="sale-system_head">
              <div className="sale-system_label">
                <span className="sale-hero_dot is-light" aria-hidden="true" />
                <p className="sale-system_label-text text-style-label">The Vika system</p>
              </div>
              <h2 className="sale-system_heading heading-style-h2">
                Every page, every figure,{' '}
                <span className="text-color-tertiary">built for firms that get audited.</span>
              </h2>
              <p className="sale-system_intro text-size-medium">
                Fee tables, filing calendars, partner profiles and case ledgers share the same
                design tokens and Client-First structure across every layout perspective.
              </p>
            </div>

            <div className="sale-system_grid">
              <article className="sale-system_card">
                <div className="sale-system_media">
                  <img
                    src="/assets/images/shared/6ad93b13ee224869f709159f_vika-overview-system-layouts.webp"
                    alt="Three Vika layout families"
                    loading="lazy"
                    className="sale-system_image"
                  />
                </div>
                <h3 className="sale-system_card-title">Three homes, one system</h3>
                <p className="sale-system_card-text text-color-secondary">
                  Classic, Cinematic and Statement homes, with Studio and Contact in three layouts
                  too. Parts move between layouts cleanly.
                </p>
              </article>

              <article className="sale-system_card">
                <div className="sale-system_media">
                  <img
                    src="/assets/images/shared/6ad93b13456da7145bbb9b05_vika-overview-system-pricing.webp"
                    alt="UAE and UK pricing switcher"
                    loading="lazy"
                    className="sale-system_image"
                  />
                </div>
                <h3 className="sale-system_card-title">UAE or UK pricing</h3>
                <p className="sale-system_card-text text-color-secondary">
                  Fees switch between AED and GBP, monthly and yearly, sharing a single source of
                  truth across retainer cards, project cards and comparison tables.
                </p>
              </article>

              <article className="sale-system_card">
                <div className="sale-system_media">
                  <img
                    src="/assets/images/shared/6adba0de7b30bb164ddb5762_vika-overview-system-cms-v2.webp"
                    alt="Seven CMS collections"
                    loading="lazy"
                    className="sale-system_image"
                  />
                </div>
                <h3 className="sale-system_card-title">Seven CMS collections</h3>
                <p className="sale-system_card-text text-color-secondary">
                  Services, people, insights, case studies, plans, deadlines and questions linked
                  bi-directionally with dedicated detail views.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="pages" className="section-overview">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="section-head">
              <p className="section-head_label text-style-label">01 Home layouts</p>
              <h2 className="section-head_heading heading-style-h2">
                Three ways in. <span className="text-color-tertiary">One system underneath.</span>
              </h2>
            </div>

            <div className="overview-list_component" style={{ gridColumn: '1 / -1' }}>
              <div className="overview-grid_list">
                {HOME_LAYOUT_CARDS.map((card) => (
                  <OverviewCard key={card.urlLabel} item={card} />
                ))}
              </div>
            </div>

            <div className="section-head" style={{ marginTop: '5rem' }}>
              <p className="section-head_label text-style-label">02 Main pages</p>
              <h2 className="section-head_heading heading-style-h2">
                Every main page,{' '}
                <span className="text-color-tertiary">Studio and Contact three ways.</span>
              </h2>
            </div>

            {MAIN_PAGES.map((group) => (
              <div
                key={group.heading}
                className="overview-group_component"
                style={{ gridColumn: '1 / -1' }}
              >
                <div className="overview-group_head">
                  <h3 className="overview-group_title">{group.heading}</h3>
                  <p className="text-style-label text-color-secondary">{group.sub}</p>
                </div>
                <div className="overview-grid_list">
                  {group.cards.map((card) => (
                    <OverviewCard key={card.urlLabel} item={card} />
                  ))}
                </div>
              </div>
            ))}

            <div className="section-head" style={{ marginTop: '5rem' }}>
              <p className="section-head_label text-style-label">03 CMS templates</p>
              <h2 className="section-head_heading heading-style-h2">
                Seven collections, <span className="text-color-tertiary">one page each.</span>
              </h2>
            </div>

            <div className="overview-list_component" style={{ gridColumn: '1 / -1' }}>
              <div className="overview-grid_list">
                {CMS_TEMPLATES.map((card) => (
                  <OverviewCard key={card.urlLabel} item={card} />
                ))}
              </div>
            </div>

            <div className="section-head" style={{ marginTop: '5rem' }}>
              <p className="section-head_label text-style-label">04 Utility pages</p>
              <h2 className="section-head_heading heading-style-h2">
                The pages <span className="text-color-tertiary">behind the site.</span>
              </h2>
            </div>

            <div className="overview-list_component" style={{ gridColumn: '1 / -1' }}>
              <div className="overview-grid_list">
                {UTILITY_PAGES.map((card) => (
                  <OverviewCard key={card.urlLabel} item={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
