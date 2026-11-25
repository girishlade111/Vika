import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { OFFICES } from '@/data/offices';
import { SITE_CONFIG } from '@/data/siteConfig';
import { VikaButton } from '@/components/common/VikaButton';

const JURISDICTIONS = ['UAE', 'UK', 'UAE and UK'] as const;
const NEEDS = ['Accounting', 'Tax', 'Audit', 'Not sure yet'] as const;

export function StatementContact() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jurisdiction, setJurisdiction] = useState<(typeof JURISDICTIONS)[number]>('UAE');
  const [needs, setNeeds] = useState<string[]>(['Accounting']);
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleNeed = (item: string) => {
    setNeeds((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  const nextStep = () => {
    setErrorMsg('');
    if (step === 1 && name.trim().length < 2) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid work email.');
      return;
    }
    if (step === 4 && needs.length === 0) {
      setErrorMsg('Please select at least one option.');
      return;
    }
    setStep((s) => Math.min(6, s + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please agree to keep your details so we can reply.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      if (SITE_CONFIG.contactEndpoint) {
        const res = await fetch(SITE_CONFIG.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, jurisdiction, needs, notes }),
        });
        if (!res.ok) throw new Error('Failed');
      } else {
        await new Promise((r) => setTimeout(r, 350));
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('We could not send that. Nothing was lost: try again, or email hello@vika.example.');
    }
  };

  return (
    <SiteLayout
      title="Contact | Five questions, Statement layout"
      description="Five questions. A reply the same working day."
    >
      <header className="section-contact-statement-header">
        <div className="padding-global">
          <div className="grid-global">
            <p className="page-header_crumb text-style-label">
              <Link to="/statement/home-statement" className="page-header_crumb-link">
                Index
              </Link>
              <span aria-hidden="true">/</span>
              <span>Contact</span>
            </p>
            <p className="page-header_number text-style-label">(05) Contact</p>
            <h1 className="page-header_heading heading-style-h2">
              Five questions.{' '}
              <span className="text-color-tertiary">A reply the same working day.</span>
            </h1>
          </div>
        </div>
      </header>

      <section className="section-contact-statement-form">
        <div className="padding-global padding-section-bottom">
          <div className="grid-global">
            <div className="questionnaire_main">
              {status === 'success' ? (
                <div className="form_message-success" role="status" style={{ display: 'block', borderRadius: '1rem', padding: '2rem' }}>
                  <div className="contact_success">
                    <p className="text-style-label">Message received</p>
                    <p className="heading-style-h3">
                      {SITE_CONFIG.demoMode
                        ? 'Demo answers recorded locally.'
                        : 'Sent. Thank you. Sara will reply the same working day.'}
                    </p>
                    <p className="text-size-regular">
                      If it is urgent, ring the Dubai office on +971 4 000 0000.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="form_form">
                  <div className="questionnaire_list">
                    <div className={`questionnaire_question ${step !== 1 ? 'is-pending' : ''}`}>
                      <p className="questionnaire_count text-style-label">
                        01 <span className="text-color-tertiary">/ 05</span>
                      </p>
                      <label htmlFor="q-name" className="questionnaire_heading">
                        Hello. <span className="text-color-tertiary">What should we call you?</span>
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        className="form_input"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <VikaButton
                        label="Next"
                        withIcon={false}
                        className="questionnaire_next"
                        onClick={nextStep}
                      />
                    </div>

                    <div className={`questionnaire_question ${step !== 2 ? 'is-pending' : ''}`}>
                      <p className="questionnaire_count text-style-label">
                        02 <span className="text-color-tertiary">/ 05</span>
                      </p>
                      <label htmlFor="q-email" className="questionnaire_heading">
                        Thanks{name ? `, ${name}` : ''}.{' '}
                        <span className="text-color-tertiary">Where can Sara reply?</span>
                      </label>
                      <input
                        id="q-email"
                        type="email"
                        className="form_input"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <VikaButton
                          label="Next"
                          withIcon={false}
                          className="questionnaire_next"
                          onClick={nextStep}
                        />
                        <button
                          type="button"
                          className="questionnaire_prev"
                          style={{ background: 'transparent', border: 0 }}
                          onClick={() => setStep(1)}
                        >
                          Previous question
                        </button>
                      </div>
                    </div>

                    <div className={`questionnaire_question ${step !== 3 ? 'is-pending' : ''}`}>
                      <p className="questionnaire_count text-style-label">
                        03 <span className="text-color-tertiary">/ 05</span>
                      </p>
                      <fieldset className="questionnaire_fieldset">
                        <legend className="questionnaire_heading">
                          Where are your <span className="text-color-tertiary">companies?</span>
                        </legend>
                        <div className="contact_form-options">
                          {JURISDICTIONS.map((item) => {
                            const active = jurisdiction === item;
                            return (
                              <label key={item} className={`form_radio is-pill ${active ? 'is-active' : ''}`}>
                                <input
                                  type="radio"
                                  name="q-jurisdiction"
                                  checked={active}
                                  onChange={() => setJurisdiction(item)}
                                />
                                <span className="form_radio-label">{item}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <VikaButton
                          label="Next"
                          withIcon={false}
                          className="questionnaire_next"
                          onClick={nextStep}
                        />
                        <button
                          type="button"
                          className="questionnaire_prev"
                          style={{ background: 'transparent', border: 0 }}
                          onClick={() => setStep(2)}
                        >
                          Previous question
                        </button>
                      </div>
                    </div>

                    <div className={`questionnaire_question ${step !== 4 ? 'is-pending' : ''}`}>
                      <p className="questionnaire_count text-style-label">
                        04 <span className="text-color-tertiary">/ 05</span>
                      </p>
                      <fieldset className="questionnaire_fieldset">
                        <legend className="questionnaire_heading">
                          What do you need? <span className="text-color-tertiary">Pick any.</span>
                        </legend>
                        <div className="contact_form-options">
                          {NEEDS.map((item) => {
                            const active = needs.includes(item);
                            return (
                              <label key={item} className={`form_checkbox is-pill ${active ? 'is-active' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={active}
                                  onChange={() => toggleNeed(item)}
                                />
                                <span className="form_checkbox-label">{item}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <VikaButton
                          label="Next"
                          withIcon={false}
                          className="questionnaire_next"
                          onClick={nextStep}
                        />
                        <button
                          type="button"
                          className="questionnaire_prev"
                          style={{ background: 'transparent', border: 0 }}
                          onClick={() => setStep(3)}
                        >
                          Previous question
                        </button>
                      </div>
                    </div>

                    <div className={`questionnaire_question ${step !== 5 ? 'is-pending' : ''}`}>
                      <p className="questionnaire_count text-style-label">
                        05 <span className="text-color-tertiary">/ 05</span>
                      </p>
                      <label htmlFor="q-notes" className="questionnaire_heading">
                        Anything we should <span className="text-color-tertiary">know first?</span>
                      </label>
                      <textarea
                        id="q-notes"
                        className="form_input is-text-area"
                        placeholder="Year end, software and overdue matters."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <VikaButton
                          label="Review and send"
                          withIcon={false}
                          className="questionnaire_next"
                          onClick={nextStep}
                        />
                        <button
                          type="button"
                          className="questionnaire_prev"
                          style={{ background: 'transparent', border: 0 }}
                          onClick={() => setStep(4)}
                        >
                          Previous question
                        </button>
                      </div>
                    </div>

                    <div className={`questionnaire_submit ${step !== 6 ? 'is-pending' : ''}`} style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color--border-primary)' }}>
                      <p className="text-style-label" style={{ marginBottom: '1rem' }}>
                        Summary: {name} · {email} · {jurisdiction} · {needs.join(', ')}
                      </p>
                      <label className="form_checkbox is-consent" style={{ gap: '0.625rem', cursor: 'pointer', marginBottom: '1.5rem' }}>
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          style={{ width: '1rem', height: '1rem', accentColor: '#4c2218', flexShrink: 0 }}
                        />
                        <span className="form_checkbox-label text-size-small text-color-secondary">
                          I agree to Vika keeping these details to reply to me. You can ask us to
                          delete them at any time.
                        </span>
                      </label>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <VikaButton
                          type="submit"
                          label={status === 'submitting' ? 'Sending' : 'Send to Sara'}
                          hoverLabel="same working day"
                          variant="dark"
                          disabled={status === 'submitting'}
                        />
                        <button
                          type="button"
                          className="questionnaire_prev"
                          style={{ background: 'transparent', border: 0 }}
                          onClick={() => setStep(5)}
                        >
                          Previous question
                        </button>
                      </div>
                    </div>

                    {errorMsg && (
                      <div role="alert" className="form_message-error" style={{ display: 'block', marginTop: '1rem' }}>
                        <p className="text-size-small">{errorMsg}</p>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>

            <aside className="questionnaire_side">
              <div className="questionnaire_side-block">
                <p className="text-style-label">Rather talk?</p>
                {[OFFICES.dubai, OFFICES.london].map((office) => (
                  <div key={office.id} className="questionnaire_office">
                    <div className="questionnaire_office-top">
                      <p className="questionnaire_office-city">{office.city}</p>
                      <span className="offices_dot" aria-hidden="true" />
                      <p className="text-style-label">{office.tzLabel}</p>
                    </div>
                    <p className="text-size-small text-color-secondary">{office.hoursLabel}</p>
                    <a href={office.phoneHref} className="text-style-link">
                      {office.phone}
                    </a>
                  </div>
                ))}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-style-link">
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div className="questionnaire_side-block">
                <p className="text-style-label">What happens next</p>
                <p className="text-size-small text-color-secondary">
                  Sara reads every message herself. You get a reply the same working day. The first
                  call is thirty minutes, with nothing to prepare.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
