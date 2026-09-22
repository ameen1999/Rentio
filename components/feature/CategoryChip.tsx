// Powered by OnSpace.AI
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';
import { Category } from '@/services/mockData';

type Props = {
  category: Category;
  selected?: boolean;
  onPress: () => void;
};

export function CategoryChip({ category, selected = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && { opacity: 0.85 }]}
    >
      <MaterialCommunityIcons
        name={category.icon as any}
        size={16}
        color={selected ? Colors.white : category.color}
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>{category.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  label: { fontSize: Font.size.sm, fontWeight: Font.weight.medium, color: Colors.textPrimary, includeFontPadding: false },
  labelSelected: { color: Colors.white, fontWeight: Font.weight.semibold },
});
