// Powered by OnSpace.AI
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Font, Spacing } from '@/constants/theme';

type Props = {
  title: string;
  right?: React.ReactNode;
  onBack?: () => void;
  light?: boolean;
};

export function ScreenHeader({ title, right, onBack, light = false }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tint = light ? Colors.white : Colors.textPrimary;
  return (
    <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        hitSlop={10}
        style={styles.iconBtn}
        accessibilityLabel="Go back"
      >
        <MaterialCommunityIcons name="chevron-left" size={28} color={tint} />
      </Pressable>
      <Text style={[styles.title, { color: tint }]} numberOfLines={1}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: Font.size.lg, fontWeight: Font.weight.bold, includeFontPadding: false },
  right: { minWidth: 40, alignItems: 'flex-end' },
});
