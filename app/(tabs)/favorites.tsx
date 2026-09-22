// Powered by OnSpace.AI
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { products } from '@/services/mockData';
import { ProductCard } from '@/components/feature/ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Spacing } from '@/constants/theme';

export default function Favorites() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites } = useApp();
  const items = products.filter((p) => favorites.includes(p.id));

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>{items.length} saved item{items.length === 1 ? '' : 's'}</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <EmptyState
            icon="heart-outline"
            title="No favorites yet"
            subtitle="Tap the heart on any item to save it here for quick access later."
          />
          <Button label="Browse rentals" onPress={() => router.push('/search')} fullWidth={false} style={{ marginTop: Spacing.sm }} />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(p) => p.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.cell}>
              <ProductCard product={item} />
            </View>
          )}
          columnWrapperStyle={{ gap: Spacing.sm }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: Font.size.xxl, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  subtitle: { fontSize: Font.size.sm, color: Colors.textSubtle, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },
  cell: { flex: 1 },
});
