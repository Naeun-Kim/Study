import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css';

const spin = keyframes({
  '0%': { transform: 'rotate(0)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[2],
    border: '1px solid transparent',
    borderRadius: vars.radius.sm,
    fontFamily: vars.font.body,
    fontSize: vars.text.md,
    lineHeight: 1,
    cursor: 'pointer',
    userSelect: 'none',
    transition:
      'background-color .2s, color .2s, border-color .2s, box-shadow .2s',
  },
  variants: {
    variant: {
      solid: {
        background: vars.color.brand,
        color: vars.color.neutral0,
        ':hover': { background: vars.color.brandHover },
      },
      ghost: {
        background: 'transparent',
        borderColor: vars.color.neutral200,
        color: vars.color.neutral900,
        ':hover': { background: vars.color.neutral50 },
      },
      outline: {
        background: vars.color.neutral0,
        borderColor: vars.color.brand,
        color: vars.color.brand,
        ':hover': { background: vars.color.neutral50 },
      },
      danger: {
        background: vars.color.danger,
        color: vars.color.neutral0,
        ':hover': { filter: 'brightness(.95)' },
      },
    },
    size: {
      sm: { height: 32, padding: `0 ${vars.space[3]}` },
      md: { height: 40, padding: `0 ${vars.space[4]}` },
      lg: { height: 48, padding: `0 ${vars.space[6]}` },
    },
    fullWidth: { true: { width: '100%' }, false: {} },
    loading: { true: { pointerEvents: 'none', opacity: 0.8 }, false: {} },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    fullWidth: false,
    loading: false,
  },
});

export const spinner = style({
  width: 16,
  height: 16,
  borderRadius: '50%',
  border: `2px solid ${vars.color.neutral0}`,
  borderRightColor: 'transparent',
  animation: `${spin} .7s linear infinite`,
});
