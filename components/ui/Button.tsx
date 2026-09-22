// Powered by OnSpace.AI
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
}: Props) {
  const isSolid = variant === 'primary' || variant === 'secondary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        (disabled || loading) && styles.disabled,
        pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isSolid ? Colors.white : Colors.blue} />
      ) : (
        <Text
          style={[
            styles.label,
            isSolid ? styles.labelLight : styles.labelDark,
            variant === 'ghost' && { color: Colors.blue },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  fullWidth: { alignSelf: 'stretch' },
  primary: { backgroundColor: Colors.blue },
  secondary: { backgroundColor: Colors.navy },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.border },
  ghost: { backgroundColor: 'transparent', height: 40 },
  disabled: { opacity: 0.5 },
  label: { fontSize: Font.size.md, fontWeight: Font.weight.semibold, includeFontPadding: false },
  labelLight: { color: Colors.white },
  labelDark: { color: Colors.textPrimary },
});
