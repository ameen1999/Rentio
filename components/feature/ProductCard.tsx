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

type Props = {
  product: Product;
  width?: number;
};

export function ProductCard({ product, width }: Props) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const category = getCategoryById(product.categoryId);
  const fav = isFavorite(product.id);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [styles.card, width ? { width } : { flex: 1 }, pressed && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.images[0] }} style={styles.image} contentFit="cover" transition={200} />
        <Pressable
          onPress={() => toggleFavorite(product.id)}
          hitSlop={10}
          style={styles.favBtn}
          accessibilityLabel="Toggle favorite"
        >
          <MaterialCommunityIcons
            name={fav ? 'heart' : 'heart-outline'}
            size={18}
            color={fav ? Colors.danger : Colors.charcoal}
          />
        </Pressable>
        {!product.available ? (
          <View style={styles.unavailable}>
            <Text style={styles.unavailableText}>Rented</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={styles.category}>{category?.name ?? 'Item'}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="map-marker" size={13} color={Colors.textSubtle} />
          <Text style={styles.meta} numberOfLines={1}>{product.location}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {CURRENCY}{product.dailyPrice}
            <Text style={styles.priceUnit}> /day</Text>
          </Text>
          {product.reviewCount > 0 ? <Rating value={product.rating} size={13} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.soft,
  },
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  imageWrap: { width: '100%', aspectRatio: 4 / 3, backgroundColor: Colors.blueSoft },
  image: { width: '100%', height: '100%' },
  favBtn: {
    position: 'absolute', top: 8, right: 8,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
  },
  unavailable: {
    position: 'absolute', bottom: 8, left: 8,
    backgroundColor: Colors.navy, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.sm,
  },
  unavailableText: { color: Colors.white, fontSize: Font.size.xs, fontWeight: Font.weight.semibold },
  body: { padding: Spacing.sm + 2, gap: 3 },
  category: { fontSize: Font.size.xs, color: Colors.blue, fontWeight: Font.weight.semibold, includeFontPadding: false },
  name: { fontSize: Font.size.sm, fontWeight: Font.weight.semibold, color: Colors.textPrimary, lineHeight: 19, includeFontPadding: false },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  meta: { fontSize: Font.size.xs, color: Colors.textSubtle, flex: 1, includeFontPadding: false },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  price: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.navy, includeFontPadding: false },
  priceUnit: { fontSize: Font.size.xs, fontWeight: Font.weight.regular, color: Colors.textSubtle },
});
