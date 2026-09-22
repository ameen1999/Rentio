// Powered by OnSpace.AI
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '@/hooks/useApp';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { ProductListItem } from '@/components/feature/ProductListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Spacing } from '@/constants/theme';

export default function MyListings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { listings } = useApp();

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="My Listings"
        right={
          <MaterialCommunityIcons name="plus" size={26} color={Colors.blue} onPress={() => router.push('/add-item')} />
        }
      />
      <FlatList
        data={listings}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <ProductListItem product={item} />}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        contentContainerStyle={{ paddingHorizontal: Spacing.md, paddingBottom: insets.bottom + Spacing.xl, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <EmptyState
              icon="clipboard-text-outline"
              title="No listings yet"
              subtitle="List your idle equipment and start earning by renting it out to people nearby."
            />
            <Button label="Add your first item" onPress={() => router.push('/add-item')} fullWidth={false} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: Spacing.xl },
});
