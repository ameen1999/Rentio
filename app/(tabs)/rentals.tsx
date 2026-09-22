// Powered by OnSpace.AI
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { useAlert } from '@/template';
import { Booking, BookingStatus, CURRENCY, getProductById, Product } from '@/services/mockData';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';

const STATUS_META: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: Colors.warning, bg: '#FFF6E6' },
  accepted: { label: 'Accepted', color: Colors.teal, bg: Colors.tealSoft },
  active: { label: 'Active', color: Colors.blue, bg: Colors.blueSoft },
  completed: { label: 'Completed', color: Colors.textSecondary, bg: '#EEF1F5' },
  rejected: { label: 'Rejected', color: Colors.danger, bg: '#FDECEC' },
  cancelled: { label: 'Cancelled', color: Colors.textSubtle, bg: '#EEF1F5' },
};

const TABS: { key: 'active' | 'past'; label: string }[] = [
  { key: 'active', label: 'Active' },
  { key: 'past', label: 'History' },
];

export default function Rentals() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { bookings, listings, updateBookingStatus } = useApp();
  const { showAlert } = useAlert();
  const [tab, setTab] = useState<'active' | 'past'>('active');

  const resolve = (id: string): Product | undefined =>
    getProductById(id) ?? listings.find((l) => l.id === id);

  const activeStatuses: BookingStatus[] = ['pending', 'accepted', 'active'];
  const filtered = bookings.filter((b) =>
    tab === 'active' ? activeStatuses.includes(b.status) : !activeStatuses.includes(b.status)
  );

  const simulate = (b: Booking) => {
    const accepted = Math.random() > 0.35;
    updateBookingStatus(b.id, accepted ? 'accepted' : 'rejected');
    showAlert(
      accepted ? 'Request accepted' : 'Request declined',
      accepted ? 'The owner accepted your rental request.' : 'The owner is not available for these dates.'
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rentals</Text>
        <View style={styles.tabs}>
          {TABS.map((t) => (
            <Pressable key={t.key} onPress={() => setTab(t.key)} style={[styles.tab, tab === t.key && styles.tabActive]}>
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(b) => b.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        renderItem={({ item }) => {
          const product = resolve(item.productId);
          if (!product) return null;
          const meta = STATUS_META[item.status];
          return (
            <View style={styles.card}>
              <Pressable style={styles.cardTop} onPress={() => router.push(`/product/${product.id}`)}>
                <Image source={{ uri: product.images[0] }} style={styles.thumb} contentFit="cover" transition={200} />
                <View style={{ flex: 1, gap: 3 }}>
                  <View style={[styles.statusBadge, { backgroundColor: meta.bg }]}>
                    <Text style={[styles.statusText, { color: meta.color }]}>{meta.label}</Text>
                  </View>
                  <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.dates}>{item.startDate} · {item.days} day{item.days > 1 ? 's' : ''}</Text>
                  <Text style={styles.total}>{CURRENCY}{item.totalPrice} <Text style={styles.deposit}>+ {CURRENCY}{item.deposit} deposit</Text></Text>
                </View>
              </Pressable>
              {item.status === 'pending' ? (
                <View style={styles.actions}>
                  <Button label="Simulate owner reply" variant="outline" onPress={() => simulate(item)} style={{ flex: 1, height: 42 }} />
                  <Button label="Cancel" variant="ghost" fullWidth={false} onPress={() => updateBookingStatus(item.id, 'cancelled')} />
                </View>
              ) : null}
              {item.status === 'accepted' ? (
                <View style={styles.actions}>
                  <Button label="Mark as completed" onPress={() => updateBookingStatus(item.id, 'completed')} style={{ flex: 1, height: 42 }} />
                </View>
              ) : null}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <EmptyState
              icon="calendar-blank-outline"
              title={tab === 'active' ? 'No active rentals' : 'No rental history'}
              subtitle="When you request to rent an item, it will show up here with its status."
            />
            <Button label="Find something to rent" onPress={() => router.push('/search')} fullWidth={false} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, gap: Spacing.md, paddingBottom: Spacing.sm },
  title: { fontSize: Font.size.xxl, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  tabs: { flexDirection: 'row', backgroundColor: '#E8ECF3', borderRadius: Radius.pill, padding: 4 },
  tab: { flex: 1, height: 38, borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: Colors.white, ...Shadow.soft },
  tabText: { fontSize: Font.size.sm, color: Colors.textSecondary, fontWeight: Font.weight.medium },
  tabTextActive: { color: Colors.navy, fontWeight: Font.weight.bold },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl, flexGrow: 1 },
  card: { backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.sm, ...Shadow.soft },
  cardTop: { flexDirection: 'row', gap: Spacing.sm },
  thumb: { width: 84, height: 84, borderRadius: Radius.md, backgroundColor: Colors.blueSoft },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.pill },
  statusText: { fontSize: Font.size.xs, fontWeight: Font.weight.bold },
  name: { fontSize: Font.size.md, fontWeight: Font.weight.semibold, color: Colors.textPrimary },
  dates: { fontSize: Font.size.xs, color: Colors.textSubtle },
  total: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.navy },
  deposit: { fontSize: Font.size.xs, fontWeight: Font.weight.regular, color: Colors.textSubtle },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: Spacing.xl },
});
