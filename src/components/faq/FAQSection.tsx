import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuestionsForContext } from '@/data/cmsRelations';

import type { Question } from '@/data/types';

interface FAQSectionProps {
  context?: 'home' | 'services' | 'pricing';
  questions?: Question[];
  sectionLabel?: string;
  headingPrimary?: string;
  headingMuted?: string;
  subtext?: string;
  ctaHref?: string;
  ctaLabel?: string;
  sectionClassName?: string;
}

export function FAQSection({
  context = 'services',
  questions: customQuestions,
  sectionLabel = '(09) Questions',
  headingPrimary = 'Good questions.',
  headingMuted = 'Straight answers.',
  subtext = 'Something else on your mind?',
  ctaHref = '/contact',
  ctaLabel = 'Ask us directly',
  sectionClassName = 'section-home-questions',
}: FAQSectionProps) {
  const items = customQuestions ?? getQuestionsForContext(context);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id="questions" className={sectionClassName}>
      <div className="padding-global padding-section-large">
        <div className="grid-global">
          <div className="questions_head">
            <p className="text-style-label">{sectionLabel}</p>
            <h2 className="questions_heading heading-style-h2">
              {headingPrimary} <span className="text-color-tertiary">{headingMuted}</span>
            </h2>
            <p className="text-size-regular text-color-secondary">
              {subtext}{' '}
              {ctaHref.startsWith('#') ? (
                <a href={ctaHref} className="text-style-link">
                  {ctaLabel}
                </a>
              ) : (
                <Link to={ctaHref} className="text-style-link">
                  {ctaLabel}
                </Link>
              )}
            </p>
          </div>

          <div className="questions_list">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className={`questions_item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="questions_question"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <h3 className="questions_question-text heading-style-h4">{item.question}</h3>
                    <span className="questions_icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className="questions_answer">
                    <div className="questions_answer-inner">
                      <p className="questions_answer-text text-size-regular text-color-secondary">
                        {item.answer}{' '}
                        <Link to={`/questions/${item.slug}`} className="text-style-link text-size-small">
                          Read full note
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
