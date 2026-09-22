// Powered by OnSpace.AI
// Rentio design tokens — deep navy, electric blue, modern teal, white, charcoal

export const Colors = {
  // Brand
  navy: '#0B1F3A',
  navyDeep: '#081627',
  blue: '#1E6FFF',
  blueSoft: '#EAF1FF',
  teal: '#14B8A6',
  tealSoft: '#E4F7F4',

  // Neutrals
  white: '#FFFFFF',
  charcoal: '#1F2733',
  surface: '#FFFFFF',
  background: '#F5F7FB',
  card: '#FFFFFF',

  // Text
  textPrimary: '#141B26',
  textSecondary: '#5A6473',
  textSubtle: '#9AA3B2',
  textOnDark: '#FFFFFF',

  // Semantic
  success: '#14B8A6',
  warning: '#F5A623',
  danger: '#E5484D',
  border: '#E7EBF1',
  overlay: 'rgba(11,31,58,0.55)',

  // States
  star: '#FFB020',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
  pill: 999,
} as const;

export const Font = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 34,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const Shadow = {
  card: {
    shadowColor: '#0B1F3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  soft: {
    shadowColor: '#0B1F3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
