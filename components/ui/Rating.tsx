// Powered by OnSpace.AI
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Font } from '@/constants/theme';

export function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name="star" size={size} color={Colors.star} />
      <Text style={[styles.value, { fontSize: size }]}>{value.toFixed(1)}</Text>
      {count != null ? <Text style={[styles.count, { fontSize: size - 1 }]}>({count})</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  value: { fontWeight: Font.weight.bold, color: Colors.textPrimary, includeFontPadding: false },
  count: { color: Colors.textSubtle, includeFontPadding: false },
});
