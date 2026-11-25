import React from 'react';
import { Link } from 'react-router-dom';

export interface VikaButtonProps {
  label: string;
  hoverLabel?: string;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'dark' | 'brand' | 'light' | 'secondary' | 'text';
  size?: 'default' | 'small' | 'large';
  withIcon?: boolean;
  iconAlternate?: boolean;
  iconBrand?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
  target?: string;
}

export function VikaButton({
  label,
  hoverLabel,
  to,
  href,
  onClick,
  variant = 'dark',
  size = 'default',
  withIcon = true,
  iconAlternate = false,
  iconBrand = false,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
  target,
}: VikaButtonProps) {
  const variantCls =
    variant === 'brand'
      ? 'is-brand'
      : variant === 'secondary'
        ? 'is-secondary'
        : variant === 'text'
          ? 'is-text'
          : '';
  const sizeCls = size === 'small' ? 'is-small' : size === 'large' ? 'is-large' : '';
  const iconCls = withIcon ? 'is-icon' : '';
  const lightStyle =
    variant === 'light'
      ? { backgroundColor: 'var(--background-color--background-primary)', color: 'var(--text-color--text-primary)' }
      : undefined;

  const classes = ['button', sizeCls, variantCls, iconCls, className].filter(Boolean).join(' ');

  const inner = withIcon ? (
    <>
      <div className="button_label-wrap">
        <div className="button_label">{label}</div>
        <div aria-hidden="true" className="button_label-hover">
          {hoverLabel || label}
        </div>
      </div>
      <div aria-hidden="true" className="button_rail">
        <div className="button_slider">
          <div
            className={[
              'button_icon',
              size === 'small' ? 'is-small' : '',
              iconAlternate || variant === 'light' ? 'is-alternate' : '',
              iconBrand || variant === 'brand' ? 'is-brand' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="button_arrow">
              <div className="button_arrow-line" />
              <div className="button_arrow-head" />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <span>{label}</span>
  );

  if (to) {
    return (
      <Link to={to} className={classes} style={lightStyle} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={lightStyle}
        aria-label={ariaLabel}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      style={lightStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
