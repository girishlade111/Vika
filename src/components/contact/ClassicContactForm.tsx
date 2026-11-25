import React, { useState } from 'react';
import { z } from 'zod';
import { SITE_CONFIG } from '@/data/siteConfig';
import { VikaButton } from '@/components/common/VikaButton';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid work email.'),
  company: z.string().optional(),
  jurisdiction: z.enum(['UAE', 'UK', 'UAE and UK']),
  needs: z.array(z.string()).min(1, 'Choose at least one option.'),
  volume: z.enum(['Under 150', '150 to 500', 'Over 500']),
  message: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm consent to proceed.' }) }),
});

const JURISDICTIONS = ['UAE', 'UK', 'UAE and UK'] as const;
const NEEDS = ['Accounting', 'Tax', 'Audit', 'Not sure yet'] as const;
const VOLUMES = ['Under 150', '150 to 500', 'Over 500'] as const;

export function ClassicContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jurisdiction, setJurisdiction] = useState<(typeof JURISDICTIONS)[number]>('UAE');
  const [needs, setNeeds] = useState<string[]>(['Accounting']);
  const [volume, setVolume] = useState<(typeof VOLUMES)[number]>('Under 150');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleNeed = (item: string) => {
    setNeeds((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const parsed = contactSchema.safeParse({
      name,
      email,
      company,
      jurisdiction,
      needs,
      volume,
      message,
      consent,
    });

    if (!parsed.success) {
      setStatus('error');
      setErrorMsg(parsed.error.issues[0]?.message || 'Please check the required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      if (SITE_CONFIG.contactEndpoint) {
        const res = await fetch(SITE_CONFIG.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        });
        if (!res.ok) throw new Error('Submission failed');
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
    <div className="contact_form-card">
      <div className="form_component">
        {status === 'success' ? (
          <div className="form_message-success" role="status" style={{ display: 'block', borderRadius: '0.75rem' }}>
            <div className="contact_success">
              <p className="text-style-label">Message received</p>
              <p className="heading-style-h3">
                {SITE_CONFIG.demoMode
                  ? 'Demo enquiry recorded locally.'
                  : 'Thank you. Sara will reply within one working day.'}
              </p>
              <p className="text-size-regular">
                {SITE_CONFIG.demoMode
                  ? 'No external message was dispatched because VITE_CONTACT_ENDPOINT is not configured. If urgent, ring +971 4 000 0000.'
                  : 'If it is urgent, ring the Dubai office on +971 4 000 0000.'}
              </p>
              <div>
                <VikaButton
                  label="Send another message"
                  withIcon={false}
                  variant="secondary"
                  size="small"
                  onClick={() => setStatus('idle')}
                />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="form_form">
            <div className="contact_form-fields">
              <div className="contact_form-row">
                <div className="form_field-wrapper">
                  <label htmlFor="contact-name" className="form_label text-style-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form_input"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form_field-wrapper">
                  <label htmlFor="contact-email" className="form_label text-style-label">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form_input"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form_field-wrapper">
                <label htmlFor="contact-company" className="form_label text-style-label">
                  Company, optional
                </label>
                <input
                  id="contact-company"
                  type="text"
                  className="form_input"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <fieldset className="contact_form-fieldset" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="form_label text-style-label">Where are your companies?</legend>
                <div className="contact_form-options">
                  {JURISDICTIONS.map((item) => {
                    const active = jurisdiction === item;
                    return (
                      <label key={item} className={`form_radio is-pill ${active ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name="jurisdiction"
                          value={item}
                          checked={active}
                          onChange={() => setJurisdiction(item)}
                        />
                        <span className="form_radio-label">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="contact_form-fieldset" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="form_label text-style-label">What do you need? Choose any</legend>
                <div className="contact_form-options">
                  {NEEDS.map((item) => {
                    const active = needs.includes(item);
                    return (
                      <label key={item} className={`form_checkbox is-pill ${active ? 'is-active' : ''}`}>
                        <input
                          type="checkbox"
                          name="needs"
                          value={item}
                          checked={active}
                          onChange={() => toggleNeed(item)}
                        />
                        <span className="form_checkbox-label">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="contact_form-fieldset" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="form_label text-style-label">Transactions a month</legend>
                <div className="contact_form-options">
                  {VOLUMES.map((item) => {
                    const active = volume === item;
                    return (
                      <label key={item} className={`form_radio is-pill ${active ? 'is-active' : ''}`}>
                        <input
                          type="radio"
                          name="volume"
                          value={item}
                          checked={active}
                          onChange={() => setVolume(item)}
                        />
                        <span className="form_radio-label">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="form_field-wrapper">
                <label htmlFor="contact-message" className="form_label text-style-label">
                  Anything we should know
                </label>
                <textarea
                  id="contact-message"
                  className="form_input is-text-area"
                  placeholder="Year end, software and overdue matters."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <label className="form_checkbox is-consent" style={{ gap: '0.625rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ width: '1rem', height: '1rem', accentColor: '#4c2218', flexShrink: 0 }}
                />
                <span className="form_checkbox-label text-size-small text-color-secondary">
                  I agree to Vika keeping these details to reply to me. We never share them, and
                  you can ask us to delete them at any time.
                </span>
              </label>

              {status === 'error' && (
                <div role="alert" className="form_message-error" style={{ display: 'block' }}>
                  <p className="text-size-small">{errorMsg}</p>
                </div>
              )}

              <div className="contact_form-footer">
                <p className="contact_form-note text-style-label">
                  Sara replies to every message herself, usually the same working day.
                </p>
                <VikaButton
                  type="submit"
                  label={status === 'submitting' ? 'Sending' : 'Send to Sara'}
                  hoverLabel="same working day"
                  variant="dark"
                  disabled={status === 'submitting'}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
