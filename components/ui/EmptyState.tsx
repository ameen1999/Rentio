// Powered by OnSpace.AI
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Font, Spacing } from '@/constants/theme';

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
};

export function EmptyState({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.circle}>
        <MaterialCommunityIcons name={icon as any} size={40} color={Colors.blue} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.xxl, paddingHorizontal: Spacing.lg },
  circle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: Colors.blueSoft,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.textPrimary, textAlign: 'center', includeFontPadding: false },
  subtitle: { fontSize: Font.size.sm, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs, lineHeight: 20 },
});
