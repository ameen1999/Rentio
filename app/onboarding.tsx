// Powered by OnSpace.AI
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { Button } from '@/components/ui/Button';
import { Colors, Font, Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

type Slide = {
  key: string;
  image: any;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    key: '1',
    image: require('@/assets/images/onboard-browse.png'),
    title: 'Rent anything you need',
    subtitle: 'Discover thousands of items nearby — cameras, tools, gear and more, without buying.',
  },
  {
    key: '2',
    image: require('@/assets/images/onboard-book.png'),
    title: 'Book in a few taps',
    subtitle: 'Pick your dates, review the price and deposit, then send a rental request instantly.',
  },
  {
    key: '3',
    image: require('@/assets/images/onboarding-3.png'),
    title: 'List and earn',
    subtitle: 'Put your idle equipment to work and earn money by renting it to people near you.',
  },
];

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      completeOnboarding();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image source={item.image} style={styles.image} contentFit="cover" transition={250} />
            <LinearGradient
              colors={['transparent', 'rgba(11,31,58,0.2)', Colors.background]}
              style={styles.fade}
            />
          </View>
        )}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.lg }]}>
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.subtitle}>{slides[index].subtitle}</Text>

        <View style={styles.dots}>
          {slides.map((s, i) => (
            <View key={s.key} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>

        <Button label={index === slides.length - 1 ? 'Get Started' : 'Next'} onPress={next} />
        <Pressable onPress={completeOnboarding} hitSlop={8} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  slide: { flex: 1 },
  image: { flex: 1, width: '100%' },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 180 },
  footer: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, gap: Spacing.sm },
  title: { fontSize: Font.size.xxl, fontWeight: Font.weight.bold, color: Colors.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: Font.size.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginVertical: Spacing.md },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { width: 22, backgroundColor: Colors.blue },
  skip: { alignSelf: 'center', paddingVertical: 8 },
  skipText: { fontSize: Font.size.sm, color: Colors.textSubtle, fontWeight: Font.weight.semibold },
});
