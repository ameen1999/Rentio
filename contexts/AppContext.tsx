// Powered by OnSpace.AI
// Global app state: mock auth, favorites, bookings, user listings. Persisted locally.

import React, { createContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { Booking, BookingStatus, Product, products as seedProducts } from '@/services/mockData';
import { getItem, setItem, removeItem, StorageKeys } from '@/services/storage';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
};

export type NewListing = {
  name: string;
  categoryId: string;
  description: string;
  dailyPrice: number;
  weeklyPrice: number;
  deposit: number;
  location: string;
  images: string[];
};

type AppContextType = {
  ready: boolean;
  onboarded: boolean;
  user: AuthUser | null;
  favorites: string[];
  bookings: Booking[];
  listings: Product[];
  completeOnboarding: () => Promise<void>;
  login: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addBooking: (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  addListing: (l: NewListing) => Product;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_AVATAR = 'https://i.pravatar.cc/150?img=68';

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [listings, setListings] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const [ob, u, fav, bk, ls] = await Promise.all([
        getItem<boolean>(StorageKeys.onboarded, false),
        getItem<AuthUser | null>(StorageKeys.user, null),
        getItem<string[]>(StorageKeys.favorites, []),
        getItem<Booking[]>(StorageKeys.bookings, []),
        getItem<Product[]>(StorageKeys.listings, []),
      ]);
      setOnboarded(ob);
      setUser(u);
      setFavorites(fav);
      setBookings(bk);
      setListings(ls);
      setReady(true);
    })();
  }, []);

  const completeOnboarding = useCallback(async () => {
    setOnboarded(true);
    await setItem(StorageKeys.onboarded, true);
  }, []);

  const login = useCallback(async (email: string, name?: string) => {
    const newUser: AuthUser = {
      id: 'me',
      name: name && name.trim().length > 0 ? name.trim() : email.split('@')[0],
      email,
      avatar: MOCK_AVATAR,
      location: 'Downtown',
    };
    setUser(newUser);
    await setItem(StorageKeys.user, newUser);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await removeItem(StorageKeys.user);
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      setItem(StorageKeys.favorites, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  const addBooking = useCallback((b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const booking: Booking = {
      ...b,
      id: `bk_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => {
      const next = [booking, ...prev];
      setItem(StorageKeys.bookings, next);
      return next;
    });
    return booking;
  }, []);

  const updateBookingStatus = useCallback((id: string, status: BookingStatus) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, status } : b));
      setItem(StorageKeys.bookings, next);
      return next;
    });
  }, []);

  const addListing = useCallback((l: NewListing) => {
    const product: Product = {
      id: `my_${Date.now()}`,
      name: l.name,
      categoryId: l.categoryId,
      description: l.description,
      images: l.images.length > 0 ? l.images : seedProducts[0].images,
      dailyPrice: l.dailyPrice,
      weeklyPrice: l.weeklyPrice,
      deposit: l.deposit,
      available: true,
      location: l.location,
      distanceKm: 0,
      ownerId: 'me',
      rating: 0,
      reviewCount: 0,
      terms: ['Valid ID required', 'Return in original condition'],
      createdAt: new Date().toISOString(),
    };
    setListings((prev) => {
      const next = [product, ...prev];
      setItem(StorageKeys.listings, next);
      return next;
    });
    return product;
  }, []);

  const value: AppContextType = {
    ready,
    onboarded,
    user,
    favorites,
    bookings,
    listings,
    completeOnboarding,
    login,
    logout,
    toggleFavorite,
    isFavorite,
    addBooking,
    updateBookingStatus,
    addListing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
