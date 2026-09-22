// Powered by OnSpace.AI
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { categories, products } from '@/services/mockData';
import { SearchBar } from '@/components/feature/SearchBar';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { FeaturedCard } from '@/components/feature/FeaturedCard';
import { ProductCard } from '@/components/feature/ProductCard';
import { ProductListItem } from '@/components/feature/ProductListItem';
import { CategoryChip } from '@/components/feature/CategoryChip';
import { Colors, Font, Radius, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');
const FEATURED_W = width * 0.74;
const RAIL_W = 168;

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, bookings } = useApp();

  const featured = products.filter((p) => p.featured);
  const recent = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  const nearby = [...products].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 4);
  const unread = 2;

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <View style={styles.brandRow}>
          <Image source={require('@/assets/images/brand-logo.png')} style={styles.logo} contentFit="contain" />
          <View>
            <Text style={styles.greeting}>Hi, {user?.name ?? 'there'} 👋</Text>
            <Text style={styles.brandName}>Rentio</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push('/notifications')} hitSlop={8} style={styles.bell}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.white} />
          {unread > 0 ? <View style={styles.badgeDot} /> : null}
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: Spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchWrap}>
          <SearchBar onPress={() => router.push('/search')} />
        </View>

        <LinearGradient
          colors={[Colors.blue, Colors.teal]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promo}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>Rent smarter, not harder</Text>
            <Text style={styles.promoText}>Save up to 60% versus buying. Thousands of items near you.</Text>
            <Pressable style={styles.promoBtn} onPress={() => router.push('/search')}>
              <Text style={styles.promoBtnText}>Explore now</Text>
            </Pressable>
          </View>
          <MaterialCommunityIcons name="tag-heart" size={68} color="rgba(255,255,255,0.35)" />
        </LinearGradient>

        <View style={styles.section}>
          <SectionHeader title="Popular categories" actionLabel="See all" onAction={() => router.push('/search')} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rail}
        >
          {categories.map((c) => (
            <CategoryChip key={c.id} category={c} onPress={() => router.push(`/search?category=${c.id}`)} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <SectionHeader title="Featured items" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
          {featured.map((p) => (
            <FeaturedCard key={p.id} product={p} width={FEATURED_W} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <SectionHeader title="Recently added" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} width={RAIL_W} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <SectionHeader title="Nearby rentals" actionLabel="See all" onAction={() => router.push('/search')} />
          <View style={{ gap: Spacing.sm }}>
            {nearby.map((p) => (
              <ProductListItem key={p.id} product={p} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    backgroundColor: Colors.navy,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg + 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  logo: { width: 42, height: 42, borderRadius: 12 },
  greeting: { fontSize: Font.size.xs, color: '#AFC0DA' },
  brandName: { fontSize: Font.size.xl, fontWeight: Font.weight.bold, color: Colors.white },
  bell: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  badgeDot: { position: 'absolute', top: 10, right: 11, width: 9, height: 9, borderRadius: 5, backgroundColor: Colors.danger, borderWidth: 1.5, borderColor: Colors.navy },
  scroll: { flex: 1 },
  searchWrap: { paddingHorizontal: Spacing.md, marginTop: -26 },
  promo: {
    marginHorizontal: Spacing.md, marginTop: Spacing.md,
    borderRadius: Radius.xl, padding: Spacing.md,
    flexDirection: 'row', alignItems: 'center',
  },
  promoTitle: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.white },
  promoText: { fontSize: Font.size.xs, color: 'rgba(255,255,255,0.9)', marginTop: 4, lineHeight: 18, maxWidth: '92%' },
  promoBtn: { backgroundColor: Colors.white, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.pill, marginTop: Spacing.sm },
  promoBtnText: { fontSize: Font.size.sm, fontWeight: Font.weight.bold, color: Colors.navy },
  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  rail: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingVertical: 2 },
});
