// Powered by OnSpace.AI
// Lightweight persistence layer (local storage). Swappable for OnSpace Cloud later.

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  onboarded: 'rentio.onboarded',
  user: 'rentio.user',
  favorites: 'rentio.favorites',
  bookings: 'rentio.bookings',
  listings: 'rentio.listings',
} as const;

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore write errors in mock layer
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const StorageKeys = KEYS;
