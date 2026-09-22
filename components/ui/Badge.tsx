// Powered by OnSpace.AI
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

type Props = {
  label: string;
  color?: string;
  bg?: string;
};

export function Badge({ label, color = Colors.blue, bg = Colors.blueSoft }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  text: { fontSize: Font.size.xs, fontWeight: Font.weight.semibold, includeFontPadding: false },
});
