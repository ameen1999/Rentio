// Powered by OnSpace.AI
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  editable?: boolean;
  onPress?: () => void;
  autoFocus?: boolean;
};

export function SearchBar({
  placeholder = 'What do you need to rent?',
  value,
  onChangeText,
  editable = true,
  onPress,
  autoFocus = false,
}: Props) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.bar}>
        <MaterialCommunityIcons name="magnify" size={22} color={Colors.textSubtle} />
        <Text style={styles.placeholder}>{placeholder}</Text>
      </Pressable>
    );
  }
  return (
    <View style={styles.bar}>
      <MaterialCommunityIcons name="magnify" size={22} color={Colors.textSubtle} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSubtle}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        autoFocus={autoFocus}
        returnKeyType="search"
        accessibilityLabel="Search"
      />
      {value && value.length > 0 && onChangeText ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <MaterialCommunityIcons name="close-circle" size={18} color={Colors.textSubtle} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    height: 52,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  placeholder: { fontSize: Font.size.md, color: Colors.textSubtle },
  input: { flex: 1, fontSize: Font.size.md, color: Colors.textPrimary, includeFontPadding: false, padding: 0 },
});
