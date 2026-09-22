// Powered by OnSpace.AI
import { StyleSheet } from 'react-native';
import { Colors, Radius, Shadow, Spacing, Font } from './theme';

export const CommonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    ...Shadow.card,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Font.size.lg,
    fontWeight: Font.weight.bold,
    color: Colors.textPrimary,
    includeFontPadding: false,
  },
  link: {
    fontSize: Font.size.sm,
    fontWeight: Font.weight.semibold,
    color: Colors.blue,
    includeFontPadding: false,
  },
  screenPad: {
    paddingHorizontal: Spacing.md,
  },
});
