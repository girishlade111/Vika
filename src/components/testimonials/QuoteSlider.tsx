import { useState } from 'react';
import { TESTIMONIALS } from '@/data/testimonials';

interface QuoteSliderProps {
  sectionLabel?: string;
  sectionClassName?: string;
}

export function QuoteSlider({
  sectionLabel = '(06) What clients say',
  sectionClassName = 'section-home-quotes',
}: QuoteSliderProps) {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className={sectionClassName}>
      <div className="padding-global padding-section-large">
        <div className="grid-global">
          <div className="home-quotes_head">
            <p className="text-style-label">{sectionLabel}</p>
            <p className="text-style-label">Four of 340 clients</p>
          </div>

          <div className="home-quotes_slider">
            <div className="home-quotes_main">
              <blockquote className="home-quotes_quote">{current.quote}</blockquote>
              <div className="home-quotes_author">
                <p className="text-size-regular text-weight-medium">{current.author}</p>
                <p className="text-size-regular text-color-secondary">{current.role}</p>
              </div>
              <div className="home-quotes_controls">
                <button
                  type="button"
                  aria-label="Previous client quote"
                  className="home-quotes_arrow"
                  onClick={prev}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <span className="text-style-label">
                  0{index + 1} / 0{TESTIMONIALS.length}
                </span>
                <button
                  type="button"
                  aria-label="Next client quote"
                  className="home-quotes_arrow"
                  onClick={next}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div className="home-quotes_aside">
              <p className={`home-clients_mark ${current.markVariant}`}>{current.company}</p>
              <div className="home-quotes_meta">
                <div className="home-quotes_meta-row">
                  <p className="text-style-label">Client since</p>
                  <p className="text-size-regular">{current.clientSince}</p>
                </div>
                <div className="home-quotes_meta-row">
                  <p className="text-style-label">Works with us on</p>
                  <p className="text-size-regular">{current.scope}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
