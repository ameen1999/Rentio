// Powered by OnSpace.AI
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';
import { CURRENCY, Product, getCategoryById } from '@/services/mockData';
import { useApp } from '@/hooks/useApp';
import { Rating } from '@/components/ui/Rating';

export function ProductListItem({ product }: { product: Product }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const category = getCategoryById(product.categoryId);
  const fav = isFavorite(product.id);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Image source={{ uri: product.images[0] }} style={styles.thumb} contentFit="cover" transition={200} />
      <View style={styles.body}>
        <Text style={styles.category}>{category?.name ?? 'Item'}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="map-marker" size={13} color={Colors.textSubtle} />
          <Text style={styles.meta}>{product.location} · {product.distanceKm} km</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{CURRENCY}{product.dailyPrice}<Text style={styles.unit}> /day</Text></Text>
          {product.reviewCount > 0 ? <Rating value={product.rating} count={product.reviewCount} size={12} /> : null}
        </View>
      </View>
      <Pressable onPress={() => toggleFavorite(product.id)} hitSlop={10} style={styles.favBtn}>
        <MaterialCommunityIcons name={fav ? 'heart' : 'heart-outline'} size={20} color={fav ? Colors.danger : Colors.textSubtle} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    gap: Spacing.sm + 2,
    ...Shadow.soft,
  },
  pressed: { opacity: 0.92 },
  thumb: { width: 96, height: 96, borderRadius: Radius.md, backgroundColor: Colors.blueSoft },
  body: { flex: 1, justifyContent: 'center', gap: 2 },
  category: { fontSize: Font.size.xs, color: Colors.blue, fontWeight: Font.weight.semibold },
  name: { fontSize: Font.size.sm, fontWeight: Font.weight.semibold, color: Colors.textPrimary, lineHeight: 19 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  meta: { fontSize: Font.size.xs, color: Colors.textSubtle },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  price: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.navy },
  unit: { fontSize: Font.size.xs, fontWeight: Font.weight.regular, color: Colors.textSubtle },
  favBtn: { padding: 4, alignSelf: 'flex-start' },
});
