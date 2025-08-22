import * as React from 'react';
import { buttonRecipe, spinner } from './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'solid' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant,
  size,
  fullWidth,
  loading,
  disabled,
  ...rest
}: ButtonProps) {
  const className = buttonRecipe({ variant, size, fullWidth, loading });
  return (
    <button className={className} disabled={disabled || loading} {...rest}>
      {loading ? <span className={spinner} aria-hidden /> : null}
      <span>{children}</span>
    </button>
  );
}
