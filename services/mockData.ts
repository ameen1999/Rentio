// Powered by OnSpace.AI
// Admin-ready mock data structures for Rentio

export type Category = {
  id: string;
  name: string;
  icon: string; // MaterialCommunityIcons name
  color: string;
};

export type Owner = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  memberSince: string;
  location: string;
  responseTime: string;
};

export type Review = {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  images: string[];
  dailyPrice: number;
  weeklyPrice: number;
  deposit: number;
  available: boolean;
  location: string;
  distanceKm: number;
  ownerId: string;
  rating: number;
  reviewCount: number;
  terms: string[];
  createdAt: string;
  featured?: boolean;
};

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'active' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  productId: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
  deposit: number;
  status: BookingStatus;
  createdAt: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  date: string;
  icon: string;
  read: boolean;
};

export const CURRENCY = '$';

export const categories: Category[] = [
  { id: 'photography', name: 'Photography', icon: 'camera', color: '#1E6FFF' },
  { id: 'construction', name: 'Construction', icon: 'hammer-wrench', color: '#F5A623' },
  { id: 'electronics', name: 'Electronics', icon: 'laptop', color: '#7C5CFF' },
  { id: 'party', name: 'Party & Event', icon: 'party-popper', color: '#E5487D' },
  { id: 'generators', name: 'Generators', icon: 'engine', color: '#14B8A6' },
  { id: 'maintenance', name: 'Maintenance', icon: 'tools', color: '#E5484D' },
  { id: 'camping', name: 'Camping', icon: 'tent', color: '#2FA84F' },
  { id: 'medical', name: 'Medical', icon: 'medical-bag', color: '#0FB5C6' },
  { id: 'furniture', name: 'Furniture', icon: 'sofa', color: '#8A6D3B' },
];

export const owners: Owner[] = [
  { id: 'u1', name: 'Ava Mitchell', avatar: 'https://i.pravatar.cc/150?img=47', rating: 4.9, reviewCount: 128, memberSince: '2022', location: 'Downtown', responseTime: 'within 1 hour' },
  { id: 'u2', name: 'Liam Carter', avatar: 'https://i.pravatar.cc/150?img=12', rating: 4.7, reviewCount: 86, memberSince: '2021', location: 'Riverside', responseTime: 'within 2 hours' },
  { id: 'u3', name: 'Noah Bennett', avatar: 'https://i.pravatar.cc/150?img=33', rating: 4.8, reviewCount: 204, memberSince: '2020', location: 'Hillcrest', responseTime: 'within 30 min' },
  { id: 'u4', name: 'Sofia Reyes', avatar: 'https://i.pravatar.cc/150?img=45', rating: 5.0, reviewCount: 57, memberSince: '2023', location: 'Old Town', responseTime: 'within 1 hour' },
];

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Sony A7 IV Mirrorless Camera',
    categoryId: 'photography',
    description: 'Full-frame 33MP mirrorless camera with 28-70mm kit lens. Perfect for events, portraits and 4K video. Includes two batteries, charger and a 64GB card.',
    images: [img('photo-1502920917128-1aa500764cbd'), img('photo-1516035069371-29a1b244cc32'), img('photo-1519183071298-a2962feb14f4')],
    dailyPrice: 45, weeklyPrice: 240, deposit: 300, available: true,
    location: 'Downtown', distanceKm: 1.2, ownerId: 'u1', rating: 4.9, reviewCount: 42,
    terms: ['Valid ID required', 'Return in original condition', 'No international travel'],
    createdAt: '2026-09-18', featured: true,
  },
  {
    id: 'p2',
    name: 'Bosch Professional Hammer Drill',
    categoryId: 'construction',
    description: 'Heavy-duty corded hammer drill for concrete and masonry. Comes with a full bit set and carrying case. Ideal for renovation projects.',
    images: [img('photo-1504148455328-c376907d081c'), img('photo-1572981779307-38b8cabb2407')],
    dailyPrice: 18, weeklyPrice: 90, deposit: 60, available: true,
    location: 'Riverside', distanceKm: 3.4, ownerId: 'u2', rating: 4.7, reviewCount: 30,
    terms: ['Safety goggles included', 'Report damage immediately'],
    createdAt: '2026-09-17', featured: true,
  },
  {
    id: 'p3',
    name: 'MacBook Pro 16" M3 Max',
    categoryId: 'electronics',
    description: 'Powerful laptop for video editing and rendering. 36GB RAM, 1TB SSD. Great for short-term production work or travel.',
    images: [img('photo-1517336714731-489689fd1ca8'), img('photo-1496181133206-80ce9b88a853')],
    dailyPrice: 40, weeklyPrice: 220, deposit: 400, available: true,
    location: 'Hillcrest', distanceKm: 2.1, ownerId: 'u3', rating: 4.8, reviewCount: 61,
    terms: ['Sign in with your own Apple ID', 'Insurance recommended'],
    createdAt: '2026-09-19', featured: true,
  },
  {
    id: 'p4',
    name: 'Party Sound System + Speakers',
    categoryId: 'party',
    description: 'Complete PA system with two 15" speakers, mixer, and wireless microphones. Perfect for weddings and outdoor events up to 200 guests.',
    images: [img('photo-1493225457124-a3eb161ffa5f'), img('photo-1470229722913-7c0e2dbbafd3')],
    dailyPrice: 55, weeklyPrice: 300, deposit: 200, available: true,
    location: 'Old Town', distanceKm: 5.0, ownerId: 'u4', rating: 5.0, reviewCount: 19,
    terms: ['Setup guidance available', 'Keep away from rain'],
    createdAt: '2026-09-16',
  },
  {
    id: 'p5',
    name: 'Portable Inverter Generator 3200W',
    categoryId: 'generators',
    description: 'Quiet inverter generator ideal for job sites, camping and backup power. Fuel efficient with clean power for sensitive electronics.',
    images: [img('photo-1621905251189-08b45d6a269e'), img('photo-1581092160607-ee22621dd758')],
    dailyPrice: 35, weeklyPrice: 180, deposit: 150, available: true,
    location: 'Riverside', distanceKm: 4.2, ownerId: 'u2', rating: 4.6, reviewCount: 24,
    terms: ['Return with full tank', 'Outdoor use only'],
    createdAt: '2026-09-15', featured: true,
  },
  {
    id: 'p6',
    name: 'Pressure Washer 2000 PSI',
    categoryId: 'maintenance',
    description: 'Electric pressure washer for driveways, patios and vehicles. Includes multiple nozzle tips and detergent tank.',
    images: [img('photo-1607472586893-edb57bdc0e39'), img('photo-1558618666-fcd25c85cd64')],
    dailyPrice: 22, weeklyPrice: 110, deposit: 70, available: false,
    location: 'Downtown', distanceKm: 1.8, ownerId: 'u1', rating: 4.5, reviewCount: 15,
    terms: ['Use with standard hose', 'Drain before return'],
    createdAt: '2026-09-14',
  },
  {
    id: 'p7',
    name: '4-Person Camping Tent Kit',
    categoryId: 'camping',
    description: 'Waterproof family tent with sleeping bags, lantern and portable stove. Everything you need for a weekend getaway.',
    images: [img('photo-1504280390367-361c6d9f38f4'), img('photo-1478131143081-80f7f84ca84d')],
    dailyPrice: 20, weeklyPrice: 100, deposit: 50, available: true,
    location: 'Hillcrest', distanceKm: 6.3, ownerId: 'u3', rating: 4.8, reviewCount: 38,
    terms: ['Clean before return', 'Report tears'],
    createdAt: '2026-09-20', featured: true,
  },
  {
    id: 'p8',
    name: 'Foldable Wheelchair (Lightweight)',
    categoryId: 'medical',
    description: 'Comfortable, lightweight foldable wheelchair for temporary mobility needs. Sanitized before each rental.',
    images: [img('photo-1587854692152-cbe660dbde88'), img('photo-1631549916768-4119b2e5f926')],
    dailyPrice: 15, weeklyPrice: 75, deposit: 40, available: true,
    location: 'Old Town', distanceKm: 2.9, ownerId: 'u4', rating: 4.9, reviewCount: 22,
    terms: ['Sanitized on return', 'Indoor and outdoor use'],
    createdAt: '2026-09-13',
  },
  {
    id: 'p9',
    name: 'Folding Banquet Tables & Chairs Set',
    categoryId: 'furniture',
    description: 'Set of 4 folding tables and 20 chairs for events and gatherings. Easy to transport and set up.',
    images: [img('photo-1519710164239-da123dc03ef4'), img('photo-1567016432779-094069958ea5')],
    dailyPrice: 30, weeklyPrice: 150, deposit: 80, available: true,
    location: 'Downtown', distanceKm: 1.5, ownerId: 'u1', rating: 4.7, reviewCount: 12,
    terms: ['Wipe down before return', 'Stack neatly'],
    createdAt: '2026-09-12',
  },
  {
    id: 'p10',
    name: 'DJI Ronin Gimbal Stabilizer',
    categoryId: 'photography',
    description: '3-axis gimbal stabilizer for cinematic footage. Compatible with most mirrorless cameras. Includes carrying case.',
    images: [img('photo-1606986628253-05620e9b0b13'), img('photo-1533228100845-08145b01de14')],
    dailyPrice: 28, weeklyPrice: 140, deposit: 120, available: true,
    location: 'Riverside', distanceKm: 3.0, ownerId: 'u2', rating: 4.8, reviewCount: 27,
    terms: ['Balance before use', 'Handle with care'],
    createdAt: '2026-09-11',
  },
  {
    id: 'p11',
    name: 'Circular Saw & Workbench',
    categoryId: 'construction',
    description: 'Professional circular saw with portable workbench and clamps. Great for woodworking and framing.',
    images: [img('photo-1530124566582-a618bc2615dc'), img('photo-1581147036324-c1c9b79b95dd')],
    dailyPrice: 24, weeklyPrice: 120, deposit: 90, available: true,
    location: 'Hillcrest', distanceKm: 4.8, ownerId: 'u3', rating: 4.6, reviewCount: 18,
    terms: ['Blade guard required', 'Experienced users only'],
    createdAt: '2026-09-10',
  },
  {
    id: 'p12',
    name: 'Projector 4K + 100" Screen',
    categoryId: 'electronics',
    description: 'Bright 4K projector with pull-up screen for movie nights and presentations. HDMI and wireless casting supported.',
    images: [img('photo-1478720568477-152d9b164e26'), img('photo-1517604931442-7e0c8ed2963c')],
    dailyPrice: 32, weeklyPrice: 160, deposit: 130, available: true,
    location: 'Old Town', distanceKm: 2.4, ownerId: 'u4', rating: 4.9, reviewCount: 33,
    terms: ['Indoor use', 'Return remote and cables'],
    createdAt: '2026-09-09',
  },
];

export const reviewsByProduct: Record<string, Review[]> = {
  p1: [
    { id: 'r1', productId: 'p1', userName: 'Emma L.', userAvatar: 'https://i.pravatar.cc/150?img=5', rating: 5, comment: 'Camera was in perfect condition. Ava was super responsive!', date: '2026-08-30' },
    { id: 'r2', productId: 'p1', userName: 'Jack P.', userAvatar: 'https://i.pravatar.cc/150?img=8', rating: 5, comment: 'Great for my weekend shoot. Highly recommend.', date: '2026-08-12' },
  ],
  p3: [
    { id: 'r3', productId: 'p3', userName: 'Mia R.', userAvatar: 'https://i.pravatar.cc/150?img=9', rating: 5, comment: 'Fast machine, rendered my project in no time.', date: '2026-09-01' },
  ],
  p7: [
    { id: 'r4', productId: 'p7', userName: 'Owen T.', userAvatar: 'https://i.pravatar.cc/150?img=15', rating: 4, comment: 'Everything we needed for camping. Clean and complete.', date: '2026-08-22' },
  ],
};

export const notifications: Notification[] = [
  { id: 'n1', title: 'Booking accepted', body: 'Ava accepted your request for Sony A7 IV.', date: '2h ago', icon: 'check-circle', read: false },
  { id: 'n2', title: 'New message', body: 'Liam sent you a message about the hammer drill.', date: '5h ago', icon: 'message-text', read: false },
  { id: 'n3', title: 'Price drop nearby', body: 'A projector near you dropped to $28/day.', date: '1d ago', icon: 'tag', read: true },
  { id: 'n4', title: 'Welcome to Rentio', body: 'Discover thousands of items to rent near you.', date: '3d ago', icon: 'hand-wave', read: true },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
export function getOwnerById(id: string): Owner | undefined {
  return owners.find((o) => o.id === id);
}
export function getReviews(productId: string): Review[] {
  return reviewsByProduct[productId] ?? [];
}
