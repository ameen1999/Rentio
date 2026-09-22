// Powered by OnSpace.AI
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';
import { CURRENCY, Product, getCategoryById } from '@/services/mockData';
import { Rating } from '@/components/ui/Rating';

export function FeaturedCard({ product, width }: { product: Product; width: number }) {
  const router = useRouter();
  const category = getCategoryById(product.categoryId);
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      style={({ pressed }) => [styles.card, { width }, pressed && { opacity: 0.94 }]}
    >
      <Image source={{ uri: product.images[0] }} style={styles.image} contentFit="cover" transition={200} />
      <View style={styles.overlay} />
      <View style={styles.badge}>
        <MaterialCommunityIcons name="star-four-points" size={12} color={Colors.navy} />
        <Text style={styles.badgeText}>Featured</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{category?.name}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{CURRENCY}{product.dailyPrice}<Text style={styles.unit}> /day</Text></Text>
          <Rating value={product.rating} size={13} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { height: 220, borderRadius: Radius.xl, overflow: 'hidden', backgroundColor: Colors.navy, ...Shadow.card },
  image: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(11,31,58,0.35)' },
  badge: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.white, paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.pill,
  },
  badgeText: { fontSize: Font.size.xs, fontWeight: Font.weight.bold, color: Colors.navy },
  content: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: Spacing.md, gap: 2 },
  category: { fontSize: Font.size.xs, fontWeight: Font.weight.semibold, color: Colors.teal },
  name: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.white, lineHeight: 24 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  price: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.white },
  unit: { fontSize: Font.size.sm, fontWeight: Font.weight.regular, color: '#D7E0EE' },
});
