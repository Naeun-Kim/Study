import React, { useId, useState } from 'react';
import * as styles from './TextField.css';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  id?: string;
  label?: string;
  size?: Size;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onChange?: (v: string) => void;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  autoComplete?: string;
};

export function TextField({
  id,
  label,
  size = 'md',
  value,
  placeholder,
  disabled,
  error,
  helperText,
  leadingIcon,
  trailingIcon,
  onChange,
  type = 'text',
  name,
  autoComplete,
}: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [focused, setFocused] = useState(false);
  const state: 'default' | 'focused' | 'error' | 'disabled' = disabled
    ? 'disabled'
    : error
    ? 'error'
    : focused
    ? 'focused'
    : 'default';

  return (
    <div className={styles.fieldRoot}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={styles.control({
          size,
          state,
          hasLeading: !!leadingIcon,
          hasTrailing: !!trailingIcon,
        })}
        data-state={state}
        data-invalid={!!error || undefined}
        data-disabled={disabled || undefined}
      >
        {leadingIcon && (
          <span className={styles.iconSlot} aria-hidden>
            {leadingIcon}
          </span>
        )}
        <input
          id={inputId}
          className={styles.input}
          type={type}
          name={name}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-help`
              : undefined
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange?.(e.currentTarget.value)}
        />
        {trailingIcon && (
          <span className={styles.iconSlot} aria-hidden>
            {trailingIcon}
          </span>
        )}
      </div>
      {error ? (
        <p
          id={`${inputId}-error`}
          className={styles.helperVariants.error}
          role="alert"
        >
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-help`} className={styles.helperVariants.default}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
