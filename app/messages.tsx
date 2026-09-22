// Powered by OnSpace.AI
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { owners } from '@/services/mockData';
import { useAlert } from '@/template';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Colors, Font, Radius, Shadow, Spacing } from '@/constants/theme';

const previews = [
  'Sure, the camera is available this weekend!',
  'Deposit will be refunded after return.',
  'You can pick it up anytime after 5pm.',
  'Thanks for renting, please leave a review!',
];

export default function Messages() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Messages" />
      <FlatList
        data={owners}
        keyExtractor={(o) => o.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: insets.bottom + Spacing.xl, gap: Spacing.sm }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
            onPress={() => showAlert('Chat with ' + item.name, 'Full in-app messaging threads arrive in the next update.')}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} contentFit="cover" transition={200} />
            <View style={{ flex: 1 }}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{index + 1}h</Text>
              </View>
              <Text style={styles.preview} numberOfLines={1}>{previews[index % previews.length]}</Text>
            </View>
            {index < 2 ? <View style={styles.dot} /> : null}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.sm, ...Shadow.soft },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: Font.size.md, fontWeight: Font.weight.bold, color: Colors.textPrimary },
  time: { fontSize: Font.size.xs, color: Colors.textSubtle },
  preview: { fontSize: Font.size.sm, color: Colors.textSecondary, marginTop: 2 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.blue },
});
