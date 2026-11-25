import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { VikaButton } from '@/components/common/VikaButton';

export function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Enter the password you were given to continue.');
      return;
    }
    setError('Incorrect password. Please try again.');
  };

  return (
    <SiteLayout
      title="Password required | Vika accounting, tax and audit studio"
      description="This page of the Vika site is private. Enter the password you were given to continue, or head back to the index to read about the studio, its services and fees."
      hideChrome
    >
      <div className="utility-page_wrapper">
        <div
          className="padding-global padding-section-large"
          style={{ width: '100%', maxWidth: '34rem', margin: '0 auto' }}
        >
          <p className="text-style-label text-color-secondary">Vika · Client area</p>
          <h1 className="heading-style-h2" style={{ marginTop: '1rem' }}>
            This page is private.
          </h1>
          <p className="text-color-secondary" style={{ marginTop: '0.75rem' }}>
            Enter the password you were given to continue.
          </p>

          <form onSubmit={handleSubmit} noValidate style={{ marginTop: '2rem' }}>
            <div className="form_field-wrapper">
              <label htmlFor="client-area-password" className="form_label text-style-label">
                Password
              </label>
              <input
                id="client-area-password"
                type="password"
                className="form_input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>

            {error && (
              <div
                className="form_message-error"
                role="alert"
                style={{ display: 'block', marginTop: '1rem' }}
              >
                {error}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <VikaButton type="submit" label="Enter client area" variant="dark" />
              <Link to="/" className="text-style-link text-size-small">
                Back to index
              </Link>
            </div>
          </form>

          <p className="text-size-small text-color-secondary" style={{ marginTop: '2.5rem' }}>
            Client areas hold the monthly packs, signed returns and audit files we prepare for each
            company. If you have not received a password yet, ask your account manager or write to
            the Dubai or London office, and a partner will send access within one working day.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
