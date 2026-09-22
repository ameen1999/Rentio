// Powered by OnSpace.AI
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { useAlert } from '@/template';
import { categories } from '@/services/mockData';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { CategoryChip } from '@/components/feature/CategoryChip';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80',
];

export default function AddItem() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addListing } = useApp();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [daily, setDaily] = useState('');
  const [weekly, setWeekly] = useState('');
  const [deposit, setDeposit] = useState('');
  const [location, setLocation] = useState('Downtown');

  const submit = () => {
    if (!name.trim() || !categoryId || !daily) {
      showAlert('Missing details', 'Add a name, category and daily price to publish your item.');
      return;
    }
    const image = SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)];
    addListing({
      name: name.trim(),
      categoryId,
      description: description.trim() || 'No description provided.',
      dailyPrice: Number(daily) || 0,
      weeklyPrice: Number(weekly) || Number(daily) * 6,
      deposit: Number(deposit) || 0,
      location,
      images: [image],
    });
    showAlert('Item listed!', 'Your item is now live and ready to rent.', [
      { text: 'View my listings', onPress: () => router.replace('/my-listings') },
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="List an item" />
      <ScrollView contentContainerStyle={{ padding: Spacing.md, paddingBottom: insets.bottom + 100, gap: Spacing.md }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons name="image-plus" size={34} color={Colors.blue} />
          <Text style={styles.imageText}>A sample photo will be added automatically</Text>
        </View>

        <Field label="Item name" placeholder="e.g. Canon EOS R6 Camera" value={name} onChangeText={setName} />

        <View>
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {categories.map((c) => (
              <CategoryChip key={c.id} category={c} selected={categoryId === c.id} onPress={() => setCategoryId(c.id)} />
            ))}
          </ScrollView>
        </View>

        <Field label="Description" placeholder="Describe your item, condition and what is included" value={description} onChangeText={setDescription} multiline />

        <View style={styles.row}>
          <Field label="Daily price ($)" placeholder="20" value={daily} onChangeText={setDaily} keyboardType="numeric" flex />
          <Field label="Weekly price ($)" placeholder="100" value={weekly} onChangeText={setWeekly} keyboardType="numeric" flex />
        </View>
        <View style={styles.row}>
          <Field label="Deposit ($)" placeholder="50" value={deposit} onChangeText={setDeposit} keyboardType="numeric" flex />
          <Field label="Location" placeholder="Downtown" value={location} onChangeText={setLocation} flex />
        </View>

        <Button label="Publish listing" onPress={submit} style={{ marginTop: Spacing.sm }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label, placeholder, value, onChangeText, multiline, keyboardType, flex,
}: {
  label: string; placeholder: string; value: string; onChangeText: (t: string) => void;
  multiline?: boolean; keyboardType?: 'default' | 'numeric'; flex?: boolean;
}) {
  return (
    <View style={flex ? { flex: 1 } : undefined}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSubtle}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType ?? 'default'}
        accessibilityLabel={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imagePlaceholder: { height: 120, borderRadius: Radius.lg, borderWidth: 1.5, borderStyle: 'dashed', borderColor: Colors.blue, backgroundColor: Colors.blueSoft, alignItems: 'center', justifyContent: 'center', gap: 6 },
  imageText: { fontSize: Font.size.xs, color: Colors.textSecondary },
  label: { fontSize: Font.size.sm, fontWeight: Font.weight.semibold, color: Colors.textPrimary, marginBottom: 6 },
  input: { backgroundColor: Colors.white, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md, height: 52, fontSize: Font.size.md, color: Colors.textPrimary },
  inputMultiline: { height: 100, paddingTop: Spacing.sm, textAlignVertical: 'top' },
  chipRow: { gap: 8, paddingRight: Spacing.md, paddingVertical: 2 },
  row: { flexDirection: 'row', gap: Spacing.sm },
});
