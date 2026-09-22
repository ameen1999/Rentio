// Powered by OnSpace.AI
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import {
  CURRENCY,
  getCategoryById,
  getOwnerById,
  getProductById,
  getReviews,
} from '@/services/mockData';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite, listings } = useApp();
  const [imgIndex, setImgIndex] = useState(0);

  const product = getProductById(id) ?? listings.find((l) => l.id === id);
  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Item not found</Text>
        <Button label="Go back" onPress={() => router.back()} fullWidth={false} />
      </View>
    );
  }

  const category = getCategoryById(product.categoryId);
  const owner = getOwnerById(product.ownerId);
  const reviews = getReviews(product.id);
  const fav = isFavorite(product.id);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.gallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => setImgIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
          >
            {product.images.map((uri, i) => (
              <Image key={i} source={{ uri }} style={{ width, height: 320 }} contentFit="cover" transition={200} />
            ))}
          </ScrollView>
          <View style={[styles.galleryTop, { top: insets.top + 6 }]}>
            <Pressable onPress={() => router.back()} style={styles.circleBtn}>
              <MaterialCommunityIcons name="chevron-left" size={26} color={Colors.textPrimary} />
            </Pressable>
            <Pressable onPress={() => toggleFavorite(product.id)} style={styles.circleBtn}>
              <MaterialCommunityIcons name={fav ? 'heart' : 'heart-outline'} size={22} color={fav ? Colors.danger : Colors.textPrimary} />
            </Pressable>
          </View>
          <View style={styles.dots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === imgIndex && styles.dotActive]} />
            ))}
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.rowBetween}>
            <Badge label={category?.name ?? 'Item'} />
            <Badge
              label={product.available ? 'Available' : 'Currently rented'}
              color={product.available ? Colors.teal : Colors.danger}
              bg={product.available ? Colors.tealSoft : '#FDECEC'}
            />
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.metaRow}>
            {product.reviewCount > 0 ? <Rating value={product.rating} count={product.reviewCount} /> : null}
            <View style={styles.metaDot} />
            <MaterialCommunityIcons name="map-marker" size={14} color={Colors.textSubtle} />
            <Text style={styles.metaText}>{product.location} · {product.distanceKm} km away</Text>
          </View>

          <View style={styles.priceRow}>
            <PriceCard label="Per day" value={`${CURRENCY}${product.dailyPrice}`} highlight />
            <PriceCard label="Per week" value={`${CURRENCY}${product.weeklyPrice}`} />
            <PriceCard label="Deposit" value={`${CURRENCY}${product.deposit}`} />
          </View>

          <Section title="Description">
            <Text style={styles.paragraph}>{product.description}</Text>
          </Section>

          <Section title="Rental terms">
            {product.terms.map((t, i) => (
              <View key={i} style={styles.termRow}>
                <MaterialCommunityIcons name="check-circle" size={16} color={Colors.teal} />
                <Text style={styles.termText}>{t}</Text>
              </View>
            ))}
          </Section>

          {owner ? (
            <Section title="Owner">
              <View style={styles.owner}>
                <Image source={{ uri: owner.avatar }} style={styles.ownerAvatar} contentFit="cover" transition={200} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.ownerName}>{owner.name}</Text>
                  <Text style={styles.ownerMeta}>Member since {owner.memberSince} · Replies {owner.responseTime}</Text>
                  <Rating value={owner.rating} count={owner.reviewCount} size={12} />
                </View>
                <Pressable style={styles.msgBtn} onPress={() => router.push('/messages')}>
                  <MaterialCommunityIcons name="message-text-outline" size={20} color={Colors.blue} />
                </Pressable>
              </View>
            </Section>
          ) : null}

          {reviews.length > 0 ? (
            <Section title={`Reviews (${reviews.length})`}>
              {reviews.map((r) => (
                <View key={r.id} style={styles.review}>
                  <Image source={{ uri: r.userAvatar }} style={styles.reviewAvatar} contentFit="cover" />
                  <View style={{ flex: 1 }}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.reviewName}>{r.userName}</Text>
                      <Rating value={r.rating} size={12} />
                    </View>
                    <Text style={styles.reviewComment}>{r.comment}</Text>
                    <Text style={styles.reviewDate}>{r.date}</Text>
                  </View>
                </View>
              ))}
            </Section>
          ) : null}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <View>
          <Text style={styles.bottomPrice}>{CURRENCY}{product.dailyPrice}<Text style={styles.bottomUnit}> /day</Text></Text>
          <Text style={styles.bottomDeposit}>+{CURRENCY}{product.deposit} deposit</Text>
        </View>
        <Button
          label={product.available ? 'Request to Rent' : 'Unavailable'}
          onPress={() => router.push(`/booking/${product.id}`)}
          disabled={!product.available}
          fullWidth={false}
          style={{ flex: 1, marginLeft: Spacing.md }}
        />
      </View>
    </View>
  );
}

function PriceCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={[styles.priceCard, highlight && styles.priceCardHighlight]}>
      <Text style={[styles.priceLabel, highlight && { color: 'rgba(255,255,255,0.85)' }]}>{label}</Text>
      <Text style={[styles.priceValue, highlight && { color: Colors.white }]}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  notFoundText: { fontSize: Font.size.lg, color: Colors.textSecondary },
  gallery: { height: 320, backgroundColor: Colors.blueSoft },
  galleryTop: { position: 'absolute', left: Spacing.md, right: Spacing.md, flexDirection: 'row', justifyContent: 'space-between' },
  circleBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  dots: { position: 'absolute', bottom: 12, alignSelf: 'center', flexDirection: 'row', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)' },
  dotActive: { width: 18, backgroundColor: Colors.white },
  body: { padding: Spacing.md, gap: Spacing.sm },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: Font.size.xl, fontWeight: Font.weight.bold, color: Colors.textPrimary, lineHeight: 28 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  metaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: Colors.textSubtle },
  metaText: { fontSize: Font.size.sm, color: Colors.textSecondary },
  priceRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  priceCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  priceCardHighlight: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  priceLabel: { fontSize: Font.size.xs, color: Colors.textSubtle },
  priceValue: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.navy, marginTop: 2 },
  section: { marginTop: Spacing.md, gap: Spacing.sm },
  sectionTitle: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  paragraph: { fontSize: Font.size.md, color: Colors.textSecondary, lineHeight: 24 },
  termRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  termText: { fontSize: Font.size.sm, color: Colors.textSecondary, flex: 1 },
  owner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.sm, ...Shadow.soft },
  ownerAvatar: { width: 54, height: 54, borderRadius: 27 },
  ownerName: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  ownerMeta: { fontSize: Font.size.xs, color: Colors.textSubtle, marginVertical: 2 },
  msgBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  review: { flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.sm },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewName: { fontSize: Font.size.sm, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  reviewComment: { fontSize: Font.size.sm, color: Colors.textSecondary, lineHeight: 20, marginTop: 2 },
  reviewDate: { fontSize: Font.size.xs, color: Colors.textSubtle, marginTop: 4 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingTop: Spacing.sm,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  bottomPrice: { fontSize: Font.size.xl, fontWeight: Font.weight.bold, color: Colors.navy },
  bottomUnit: { fontSize: Font.size.sm, fontWeight: Font.weight.regular, color: Colors.textSubtle },
  bottomDeposit: { fontSize: Font.size.xs, color: Colors.textSubtle },
});
