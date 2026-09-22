// Powered by OnSpace.AI
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { useAlert } from '@/template';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';

type MenuItem = { icon: string; label: string; onPress: () => void; danger?: boolean };

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout, favorites, bookings, listings } = useApp();
  const { showAlert } = useAlert();

  const confirmLogout = () => {
    showAlert('Log out?', 'You can sign back in anytime.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const menu: MenuItem[] = [
    { icon: 'plus-box', label: 'Add a new item', onPress: () => router.push('/add-item') },
    { icon: 'clipboard-list-outline', label: 'My listings', onPress: () => router.push('/my-listings') },
    { icon: 'message-text-outline', label: 'Messages', onPress: () => router.push('/messages') },
    { icon: 'bell-outline', label: 'Notifications', onPress: () => router.push('/notifications') },
    { icon: 'heart-outline', label: 'Favorites', onPress: () => router.push('/favorites') },
    { icon: 'shield-check-outline', label: 'Account verification', onPress: () => showAlert('Coming soon', 'ID verification will arrive in a future update.') },
    { icon: 'help-circle-outline', label: 'Help & support', onPress: () => showAlert('Support', 'Reach us at support@rentio.app') },
  ];

  const stats = [
    { label: 'Rentals', value: bookings.length },
    { label: 'Listings', value: listings.length },
    { label: 'Favorites', value: favorites.length },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Spacing.xl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.headerCard, { paddingTop: insets.top + Spacing.lg }]}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} contentFit="cover" transition={200} />
        <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
        <View style={styles.stats}>
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 ? <View style={styles.divider} /> : null}
              <View style={styles.stat}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>

      <View style={styles.menu}>
        {menu.map((m) => (
          <Pressable key={m.label} onPress={m.onPress} style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: '#F0F3F8' }]}>
            <View style={styles.menuIcon}>
              <MaterialCommunityIcons name={m.icon as any} size={20} color={Colors.blue} />
            </View>
            <Text style={styles.menuLabel}>{m.label}</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.textSubtle} />
          </Pressable>
        ))}
      </View>

      <Pressable onPress={confirmLogout} style={styles.logout}>
        <MaterialCommunityIcons name="logout" size={20} color={Colors.danger} />
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
      <Text style={styles.version}>Rentio v1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerCard: {
    backgroundColor: Colors.navy,
    alignItems: 'center',
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: Colors.teal },
  name: { fontSize: Font.size.xl, fontWeight: Font.weight.bold, color: Colors.white, marginTop: Spacing.sm },
  email: { fontSize: Font.size.sm, color: '#AFC0DA', marginTop: 2 },
  stats: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: Radius.lg,
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, marginTop: Spacing.md, gap: Spacing.lg,
  },
  stat: { alignItems: 'center', minWidth: 56 },
  statValue: { fontSize: Font.size.xl, fontWeight: Font.weight.bold, color: Colors.white },
  statLabel: { fontSize: Font.size.xs, color: '#AFC0DA', marginTop: 2 },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  menu: {
    marginTop: Spacing.md, marginHorizontal: Spacing.md,
    backgroundColor: Colors.card, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.soft,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 14, paddingHorizontal: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: Font.size.md, color: Colors.textPrimary, fontWeight: Font.weight.medium },
  logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: Spacing.lg, marginHorizontal: Spacing.md, paddingVertical: 14, borderRadius: Radius.md, borderWidth: 1, borderColor: '#F3D2D3' },
  logoutText: { fontSize: Font.size.md, color: Colors.danger, fontWeight: Font.weight.semibold },
  version: { textAlign: 'center', color: Colors.textSubtle, fontSize: Font.size.xs, marginTop: Spacing.md },
});
