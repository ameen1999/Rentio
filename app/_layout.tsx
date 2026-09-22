// Powered by OnSpace.AI
import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { AppProvider } from '@/contexts/AppContext';
import { useApp } from '@/hooks/useApp';
import { Colors, Font } from '@/constants/theme';

function AuthGate() {
  const { ready, onboarded, user } = useApp();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const seg = segments[0];
    if (!onboarded) {
      if (seg !== 'onboarding') router.replace('/onboarding');
    } else if (!user) {
      if (seg !== 'login') router.replace('/login');
    } else if (seg === 'onboarding' || seg === 'login') {
      router.replace('/');
    }
  }, [ready, onboarded, user, segments, router]);

  return null;
}

function SplashOverlay() {
  return (
    <View style={styles.splash}>
      <View style={styles.logoWrap}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} contentFit="contain" />
      </View>
      <Text style={styles.brand}>Rentio</Text>
      <Text style={styles.tagline}>Rent anything, anytime</Text>
    </View>
  );
}

function RootNavigator() {
  const { ready } = useApp();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <AuthGate />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="booking/[id]" />
        <Stack.Screen name="add-item" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="my-listings" />
        <Stack.Screen name="messages" />
      </Stack>
      {!ready ? <SplashOverlay /> : null}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AppProvider>
          <RootNavigator />
          <StatusBar style="dark" />
        </AppProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  logoWrap: { width: 110, height: 110, borderRadius: 28, overflow: 'hidden', marginBottom: 12 },
  logo: { width: '100%', height: '100%' },
  brand: { fontSize: Font.size.display, fontWeight: Font.weight.bold, color: Colors.white, letterSpacing: 0.5 },
  tagline: { fontSize: Font.size.md, color: '#AFC0DA' },
});
