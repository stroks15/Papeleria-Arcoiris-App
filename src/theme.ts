import { Platform } from 'react-native';

export const colors = {
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  background: '#FFFDF8',
  surface: '#FFFFFF',
  text: '#1F2937',
  muted: '#6B7280',
  success: '#15803D',
  danger: '#B91C1C',
  rainbow: ['#EF4444', '#F59E0B', '#EAB308', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6'],
};

export const typography = {
  title: 28,
  section: 23,
  body: 18,
  button: 18,
  small: 16,
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export const nativeElevation = Platform.select({
  android: { elevation: 3 },
  default: {},
});
