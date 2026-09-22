// Powered by OnSpace.AI
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { useAlert } from '@/template';
import { CURRENCY, getProductById } from '@/services/mockData';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildDates(count: number) {
  const out: { date: Date; label: string; weekday: string }[] = [];
  const base = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({ date: d, label: `${d.getDate()}`, weekday: WEEKDAYS[d.getDay()] });
  }
  return out;
}

function fmt(d: Date) {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export default function Booking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addBooking } = useApp();
  const { showAlert } = useAlert();

  const product = getProductById(id);
  const dates = useMemo(() => buildDates(14), []);
  const [startIdx, setStartIdx] = useState(0);
  const [days, setDays] = useState(1);

  if (!product) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Booking" />
        <Text style={styles.notFound}>Item not found</Text>
      </View>
    );
  }

  const start = dates[startIdx].date;
  const end = new Date(start);
  end.setDate(start.getDate() + days);

  const weeks = Math.floor(days / 7);
  const remainder = days % 7;
  const rentalCost = weeks * product.weeklyPrice + remainder * product.dailyPrice;
  const total = rentalCost;

  const submit = () => {
    addBooking({
      productId: product.id,
      startDate: fmt(start),
      endDate: fmt(end),
      days,
      totalPrice: total,
      deposit: product.deposit,
    });
    showAlert('Request sent!', 'Your rental request was sent to the owner. You can track its status in My Rentals.', [
      { text: 'View My Rentals', onPress: () => router.replace('/rentals') },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Rental request" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.productRow}>
          <Image source={{ uri: product.images[0] }} style={styles.thumb} contentFit="cover" transition={200} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.location}>{product.location}</Text>
            <Text style={styles.price}>{CURRENCY}{product.dailyPrice}/day · {CURRENCY}{product.weeklyPrice}/week</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose start date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
          {dates.map((d, i) => (
            <Pressable key={i} onPress={() => setStartIdx(i)} style={[styles.dateChip, i === startIdx && styles.dateChipActive]}>
              <Text style={[styles.dateWeekday, i === startIdx && styles.dateTextActive]}>{d.weekday}</Text>
              <Text style={[styles.dateLabel, i === startIdx && styles.dateTextActive]}>{d.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Rental duration</Text>
        <View style={styles.stepper}>
          <Pressable onPress={() => setDays((d) => Math.max(1, d - 1))} style={styles.stepBtn}>
            <MaterialCommunityIcons name="minus" size={22} color={Colors.navy} />
          </Pressable>
          <View style={styles.stepValue}>
            <Text style={styles.stepNumber}>{days}</Text>
            <Text style={styles.stepUnit}>day{days > 1 ? 's' : ''}</Text>
          </View>
          <Pressable onPress={() => setDays((d) => Math.min(30, d + 1))} style={styles.stepBtn}>
            <MaterialCommunityIcons name="plus" size={22} color={Colors.navy} />
          </Pressable>
        </View>
        <Text style={styles.rangeText}>{fmt(start)}  →  {fmt(end)}</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Price summary</Text>
          <Row label={`Rental (${days} day${days > 1 ? 's' : ''})`} value={`${CURRENCY}${rentalCost}`} />
          {weeks > 0 ? <Row label={`Weekly rate applied (${weeks} week${weeks > 1 ? 's' : ''})`} value="✓" muted /> : null}
          <Row label="Refundable deposit" value={`${CURRENCY}${product.deposit}`} muted />
          <View style={styles.summaryDivider} />
          <Row label="Total due now" value={`${CURRENCY}${total + product.deposit}`} bold />
          <Text style={styles.depositNote}>Includes {CURRENCY}{product.deposit} refundable deposit returned after inspection.</Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <Button label="Send rental request" onPress={submit} />
      </View>
    </View>
  );
}

function Row({ label, value, bold, muted }: { label: string; value: string; bold?: boolean; muted?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, muted && { color: Colors.textSubtle }]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.rowValueBold, muted && { color: Colors.textSubtle, fontWeight: '400' }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { textAlign: 'center', marginTop: Spacing.xl, color: Colors.textSecondary },
  productRow: { flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.card, margin: Spacing.md, padding: Spacing.sm, borderRadius: Radius.lg, ...Shadow.soft },
  thumb: { width: 80, height: 80, borderRadius: Radius.md, backgroundColor: Colors.blueSoft },
  name: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  location: { fontSize: Font.size.xs, color: Colors.textSubtle, marginTop: 2 },
  price: { fontSize: Font.size.sm, color: Colors.blue, fontWeight: Font.weight.semibold, marginTop: 4 },
  sectionTitle: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.textPrimary, marginHorizontal: Spacing.md, marginTop: Spacing.md, marginBottom: Spacing.sm },
  dateRow: { gap: 8, paddingHorizontal: Spacing.md },
  dateChip: { width: 58, height: 68, borderRadius: Radius.md, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center', gap: 2 },
  dateChipActive: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  dateWeekday: { fontSize: Font.size.xs, color: Colors.textSubtle },
  dateLabel: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  dateTextActive: { color: Colors.white },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.sm, ...Shadow.soft },
  stepBtn: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: Colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  stepValue: { alignItems: 'center' },
  stepNumber: { fontSize: Font.size.xxl, fontWeight: Font.weight.bold, color: Colors.navy },
  stepUnit: { fontSize: Font.size.xs, color: Colors.textSubtle },
  rangeText: { textAlign: 'center', marginTop: Spacing.sm, color: Colors.textSecondary, fontWeight: Font.weight.medium },
  summary: { margin: Spacing.md, backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, ...Shadow.soft },
  summaryTitle: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  rowLabel: { fontSize: Font.size.sm, color: Colors.textSecondary },
  rowValue: { fontSize: Font.size.sm, color: Colors.textPrimary, fontWeight: Font.weight.semibold },
  rowValueBold: { fontSize: Font.size.lg, fontWeight: Font.weight.bold, color: Colors.navy },
  summaryDivider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm },
  depositNote: { fontSize: Font.size.xs, color: Colors.textSubtle, marginTop: 6, lineHeight: 16 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border },
});
