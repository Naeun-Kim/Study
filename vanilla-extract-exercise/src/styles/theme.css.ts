import { createGlobalTheme, createVar } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    brand: '#5B6CFF',
    brandHover: '#4C5AE0',
    danger: '#E5484D',
    neutral0: '#fff',
    neutral50: '#FAFAFB',
    neutral200: '#E6E8EC',
    neutral600: '#6B7280',
    neutral900: '#111827',
  },
  radius: { sm: '8px', md: '12px', pill: '9999px' },
  space: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px' },
  font: {
    body: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
  },
  text: { xs: '12px', sm: '14px', md: '16px' },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,.06)',
    md: '0 4px 10px rgba(0,0,0,.08)',
  },
});

export const controlPaddingX = createVar();
export const controlHeight = createVar();
