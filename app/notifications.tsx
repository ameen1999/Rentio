// Powered by OnSpace.AI
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { notifications } from '@/services/mockData';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <ScreenHeader title="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: insets.bottom + Spacing.xl, gap: Spacing.sm }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, !item.read && styles.unread]}>
            <View style={[styles.icon, !item.read && { backgroundColor: Colors.blue }]}>
              <MaterialCommunityIcons name={item.icon as any} size={20} color={item.read ? Colors.blue : Colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  card: { flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, ...Shadow.soft },
  unread: { borderLeftWidth: 3, borderLeftColor: Colors.blue },
  icon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.blueSoft, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  date: { fontSize: Font.size.xs, color: Colors.textSubtle },
  body: { fontSize: Font.size.sm, color: Colors.textSecondary, marginTop: 2, lineHeight: 20 },
});
