import { Link, useParams } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PracticeCTA } from '@/components/cta/PracticeCTA';
import { getQuestionBySlug, getServiceBySlug, getPlanBySlug } from '@/data/cmsRelations';
import { QUESTIONS } from '@/data/questions';
import { NotFoundPage } from '@/pages/utility/NotFoundPage';

export function QuestionDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const question = getQuestionBySlug(slug);

  if (!question) {
    return <NotFoundPage />;
  }

  const relatedServices = question.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedPlans = question.relatedPlans
    .map((p) => getPlanBySlug(p))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const otherQuestions = QUESTIONS.filter((q) => q.slug !== question.slug).slice(0, 4);

  return (
    <SiteLayout title={question.seo.title} description={question.seo.description}>
      <header className="section-question-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/pricing#faq" className="page-header_crumb-link">
                Questions
              </Link>
            </p>
            <p className="page-header_number text-style-label">FAQ</p>

            <h1 className="page-header_heading heading-style-h2">{question.question}</h1>
          </div>
        </div>
      </header>

      <section className="section-question-detail">
        <div className="padding-global padding-section-large">
          <div className="grid-global">
            <div className="detail_list">
              <div className="detail_component">
                <p className="detail_label text-style-label">The short answer</p>
                <div className="detail_content">
                  <p className="detail_lead">{question.answer}</p>
                  <p className="text-size-small text-color-secondary" style={{ marginTop: '1.5rem' }}>
                    General information, not advice for your company. Ask us before you act on it.
                  </p>
                </div>
              </div>

              {(relatedServices.length > 0 || relatedPlans.length > 0) && (
                <div className="detail_component">
                  <p className="detail_label text-style-label">Related pages</p>
                  <div className="detail_content">
                    <div className="detail_facts">
                      {relatedServices.length > 0 && (
                        <>
                          <p className="detail_fact-label text-style-label">Services</p>
                          <p className="detail_fact-value">
                            {relatedServices.map((s, i) => (
                              <span key={s.id}>
                                {i > 0 && ' · '}
                                <Link to={`/services/${s.slug}`} className="text-style-link">
                                  {s.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        </>
                      )}
                      {relatedPlans.length > 0 && (
                        <>
                          <p className="detail_fact-label text-style-label">Fee plans</p>
                          <p className="detail_fact-value">
                            {relatedPlans.map((p, i) => (
                              <span key={p.id}>
                                {i > 0 && ' · '}
                                <Link to={`/plans/${p.slug}`} className="text-style-link">
                                  {p.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="detail_component">
                <p className="detail_label text-style-label">More questions</p>
                <div className="detail_content">
                  <div className="detail_facts">
                    {otherQuestions.map((oq) => (
                      <div key={oq.id} style={{ display: 'contents' }}>
                        <p className="detail_fact-label text-style-label">FAQ</p>
                        <p className="detail_fact-value">
                          <Link to={`/questions/${oq.slug}`} className="text-style-link">
                            {oq.question}
                          </Link>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PracticeCTA headingPrimary="Still not sure?" headingMuted="Ask a partner." />
    </SiteLayout>
  );
}
