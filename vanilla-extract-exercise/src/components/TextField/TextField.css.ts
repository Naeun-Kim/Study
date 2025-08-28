import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars, controlPaddingX, controlHeight } from '@/styles/theme.css';

export const fieldRoot = style({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  rowGap: vars.space[1],
});
export const label = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.sm,
  color: vars.color.neutral600,
});

export const control = recipe({
  base: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    borderRadius: vars.radius.sm,
    border: `1px solid ${vars.color.neutral200}`,
    background: vars.color.neutral0,
    boxShadow: vars.shadow.sm,
    vars: { [controlPaddingX]: vars.space[4], [controlHeight]: '40px' },
    height: controlHeight,
    columnGap: vars.space[2],
    paddingLeft: controlPaddingX,
    paddingRight: controlPaddingX,
    transition: 'border-color .15s, box-shadow .15s',
  },
  variants: {
    size: {
      sm: {
        vars: {
          [controlHeight]: '36px',
        },
      },
      md: {},
      lg: { vars: { [controlHeight]: '48px' } },
    },
    state: {
      default: {},
      focused: {
        borderColor: vars.color.brand,
        boxShadow: '0 0 0 3px rgba(91,108,255,.15)',
      },
      error: {
        borderColor: vars.color.danger,
        boxShadow: '0 0 0 3px rgba(229,72,77,.15)',
      },
      disabled: {
        opacity: 0.6,
        pointerEvents: 'none',
        background: vars.color.neutral50,
      },
    },
    hasLeading: { true: {}, false: {} },
    hasTrailing: { true: {}, false: {} },
  },
  compoundVariants: [
    { variants: { hasLeading: false }, style: { paddingLeft: vars.space[4] } },
    {
      variants: { hasTrailing: false },
      style: { paddingRight: vars.space[4] },
    },
  ],
  defaultVariants: {
    size: 'md',
    state: 'default',
    hasLeading: false,
    hasTrailing: false,
  },
});

export const iconSlot = style({
  width: 20,
  height: 20,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.neutral600,
});
export const input = style({
  width: '100%',
  height: '100%',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontFamily: vars.font.body,
  fontSize: vars.text.md,
  color: vars.color.neutral900,
  selectors: { '&::placeholder': { color: vars.color.neutral600 } },
});

export const helper = style({
  fontSize: vars.text.xs,
  lineHeight: 1.4,
  marginTop: vars.space[1],
  color: vars.color.neutral600,
});
export const helperVariants = styleVariants({
  default: [helper],
  error: [helper, { color: vars.color.danger }],
});
