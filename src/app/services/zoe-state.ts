import {Injectable, computed, signal} from '@angular/core';
import {
  BIKE_MODELS,
  BikeModelKey,
  COLOR_OPTIONS,
  ZOE_IMAGES,
} from '../data/zoebike-data';

export interface CartItem {
  id: string;
  modelKey: BikeModelKey;
  modelName: string;
  colorName: string;
  colorHex: string;
  size: 'S' | 'M' | 'L';
  batteryLabel: string;
  addons: string[];
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface TestRideBooking {
  id: string;
  salonCity: string;
  modelName: string;
  locationInput: string;
  email: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ZoeState {
  // Cart items (seeded with 1 curated item matching the indicator badge in Stitch)
  readonly cartItems = signal<CartItem[]>([
    {
      id: 'initial-flow-m',
      modelKey: 'flow',
      modelName: 'Zoe Flow Wave',
      colorName: 'Sea-Glass',
      colorHex: '#1C6E63',
      size: 'M',
      batteryLabel: 'Standard Urban Cruiser (50 km)',
      addons: ['Wicker Front Basket'],
      unitPrice: 2065,
      quantity: 1,
      image: ZOE_IMAGES.zoeFlowHome,
    },
  ]);

  readonly cartCount = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly cartSubtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  );

  readonly cartMonthly = computed(() => Math.round(this.cartSubtotal() / 24));

  // Favorites
  readonly favoriteModels = signal<BikeModelKey[]>(['flow']);

  // Pre-selected customizer model & color when navigating from Home
  readonly preferredModel = signal<BikeModelKey>('air');
  readonly preferredColor = signal<string>(COLOR_OPTIONS[0].name);

  // Event RSVPs
  readonly rsvpedEventIds = signal<string[]>([]);

  // Test Ride Bookings
  readonly testRideBookings = signal<TestRideBooking[]>([]);

  // Drawers & Modals
  readonly cartDrawerOpen = signal(false);
  readonly searchModalOpen = signal(false);
  readonly testRideModalOpen = signal(false);
  readonly accountDrawerOpen = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly testRidePreselectedModel = signal<BikeModelKey>('flow');

  // Toast feedback
  readonly toastMessage = signal<string | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  showToast(message: string): void {
    this.toastMessage.set(message);
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage.set(null);
    }, 3200);
  }

  toggleFavorite(modelKey: BikeModelKey): void {
    this.favoriteModels.update((list) => {
      const exists = list.includes(modelKey);
      const next = exists ? list.filter((m) => m !== modelKey) : [...list, modelKey];
      const modelName = BIKE_MODELS[modelKey].name;
      this.showToast(exists ? `Removed ${modelName} from saved builds` : `Saved ${modelName} to favorites`);
      return next;
    });
  }

  isFavorite(modelKey: BikeModelKey): boolean {
    return this.favoriteModels().includes(modelKey);
  }

  addToCart(item: Omit<CartItem, 'id' | 'quantity'>): void {
    const signature = `${item.modelKey}-${item.colorName}-${item.size}-${item.batteryLabel}-${item.addons.join(',')}`;
    this.cartItems.update((items) => {
      const existing = items.find((i) => i.id === signature);
      if (existing) {
        return items.map((i) =>
          i.id === signature ? {...i, quantity: i.quantity + 1} : i,
        );
      }
      return [...items, {...item, id: signature, quantity: 1}];
    });
    this.cartDrawerOpen.set(true);
    this.showToast(`${item.modelName} added to your bag`);
  }

  updateQuantity(id: string, delta: number): void {
    this.cartItems.update((items) =>
      items
        .map((i) => (i.id === id ? {...i, quantity: i.quantity + delta} : i))
        .filter((i) => i.quantity > 0),
    );
  }

  removeCartItem(id: string): void {
    this.cartItems.update((items) => items.filter((i) => i.id !== id));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  toggleEventRsvp(eventId: string, eventTitle: string): boolean {
    let added = false;
    this.rsvpedEventIds.update((ids) => {
      if (ids.includes(eventId)) {
        return ids.filter((id) => id !== eventId);
      }
      added = true;
      return [...ids, eventId];
    });
    this.showToast(added ? `RSVP confirmed for ${eventTitle}` : `Canceled RSVP for ${eventTitle}`);
    return added;
  }

  addTestRideBooking(booking: Omit<TestRideBooking, 'id' | 'createdAt'>): void {
    const entry: TestRideBooking = {
      ...booking,
      id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
    };
    this.testRideBookings.update((list) => [entry, ...list]);
    this.showToast(`VIP Test Ride reserved at ${booking.salonCity}`);
  }

  openTestRideModal(modelKey: BikeModelKey = 'flow'): void {
    this.testRidePreselectedModel.set(modelKey);
    this.testRideModalOpen.set(true);
  }

  closeAllOverlays(): void {
    this.cartDrawerOpen.set(false);
    this.searchModalOpen.set(false);
    this.testRideModalOpen.set(false);
    this.accountDrawerOpen.set(false);
    this.mobileMenuOpen.set(false);
  }
}
