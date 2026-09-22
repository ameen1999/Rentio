// Powered by OnSpace.AI
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories, products } from '@/services/mockData';
import { SearchBar } from '@/components/feature/SearchBar';
import { ProductListItem } from '@/components/feature/ProductListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

const PRICE_FILTERS = [
  { key: 'all', label: 'Any price', max: Infinity },
  { key: 'lt20', label: 'Under $20', max: 20 },
  { key: 'lt35', label: 'Under $35', max: 35 },
  { key: 'lt50', label: 'Under $50', max: 50 },
];

const LOCATIONS = ['All', 'Downtown', 'Riverside', 'Hillcrest', 'Old Town'];

export default function Search() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(params.category ?? null);
  const [price, setPrice] = useState('all');
  const [location, setLocation] = useState('All');

  const priceMax = PRICE_FILTERS.find((p) => p.key === price)?.max ?? Infinity;

  const results = useMemo(() => {
    return products.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchQuery = q.length === 0 || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchCat = !category || p.categoryId === category;
      const matchPrice = p.dailyPrice <= priceMax;
      const matchLoc = location === 'All' || p.location === location;
      return matchQuery && matchCat && matchPrice && matchLoc;
    });
  }, [query, category, priceMax, location]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore rentals</Text>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <FlatList
        data={results}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        ListHeaderComponent={
          <View style={styles.filters}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              <FilterChip label="All" active={!category} onPress={() => setCategory(null)} />
              {categories.map((c) => (
                <FilterChip key={c.id} label={c.name} active={category === c.id} onPress={() => setCategory(c.id)} />
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {PRICE_FILTERS.map((p) => (
                <FilterChip key={p.key} label={p.label} active={price === p.key} onPress={() => setPrice(p.key)} icon="cash" />
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {LOCATIONS.map((l) => (
                <FilterChip key={l} label={l} active={location === l} onPress={() => setLocation(l)} icon="map-marker" />
              ))}
            </ScrollView>
            <Text style={styles.count}>{results.length} items available</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState icon="magnify-close" title="No matches found" subtitle="Try adjusting your search or filters to see more results." />
        }
      />
    </View>
  );
}

function FilterChip({ label, active, onPress, icon }: { label: string; active: boolean; onPress: () => void; icon?: string }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      {icon ? (
        <MaterialCommunityIcons name={icon as any} size={14} color={active ? Colors.white : Colors.textSecondary} />
      ) : null}
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: Spacing.sm },
  title: { fontSize: Font.size.xxl, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  filters: { gap: Spacing.sm, marginBottom: Spacing.sm },
  chipRow: { gap: 8, paddingRight: Spacing.md },
  chip: {
    height: 36, flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, borderRadius: Radius.pill,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  chipText: { fontSize: Font.size.sm, color: Colors.textSecondary, fontWeight: Font.weight.medium },
  chipTextActive: { color: Colors.white, fontWeight: Font.weight.semibold },
  count: { fontSize: Font.size.sm, color: Colors.textSubtle, fontWeight: Font.weight.semibold, marginTop: 2 },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
});
