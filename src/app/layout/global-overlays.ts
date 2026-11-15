import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {
  BIKE_MODELS,
  BikeModelKey,
  CLUB_EVENTS,
  GALLERY_POSTS,
  RIDER_STORIES,
  SCENIC_ROUTES,
} from '../data/zoebike-data';
import {ZoeState} from '../services/zoe-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-global-overlays',
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <!-- CART & CHECKOUT DRAWER -->
    @if (state.cartDrawerOpen()) {
      <div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex justify-end">
        <button
          type="button"
          aria-label="Close shopping bag"
          (click)="state.cartDrawerOpen.set(false)"
          class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
        ></button>
        <aside
          aria-label="Shopping Bag"
          class="relative z-10 w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between p-6 md:p-8 overflow-y-auto"
        >
          <div>
            <div class="flex items-center justify-between pb-5 border-b border-surface-container">
              <div>
                <p class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Atelier Bag
                </p>
                <h2 class="text-headline-sm text-on-surface font-semibold">
                  Your Zoe Configuration ({{ state.cartCount() }})
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close shopping bag"
                (click)="state.cartDrawerOpen.set(false)"
                class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
              </button>
            </div>

            @if (orderConfirmed()) {
              <div class="mt-8 p-6 rounded-3xl bg-secondary-container/30 space-y-4 text-center">
                <div
                  class="w-14 h-14 rounded-full bg-secondary text-on-secondary mx-auto flex items-center justify-center"
                >
                  <mat-icon class="material-symbols-outlined text-[28px]">check</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">
                  Reservation #ZOE-{{ orderNumber() }} Confirmed
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Your bespoke Zoe build is queued at our Florence atelier. Assembled white-glove
                  delivery details have been sent to your inbox.
                </p>
                <button
                  type="button"
                  (click)="orderConfirmed.set(false); state.cartDrawerOpen.set(false)"
                  class="w-full py-3 rounded-full bg-primary text-on-primary text-label-lg cursor-pointer"
                >
                  Continue Exploring
                </button>
              </div>
            } @else if (state.cartItems().length === 0) {
              <div class="mt-12 text-center space-y-4">
                <div
                  class="w-16 h-16 rounded-full bg-surface-container-low mx-auto flex items-center justify-center text-on-surface-variant"
                >
                  <mat-icon class="material-symbols-outlined text-[28px]">shopping_bag</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">Your bag is empty</h3>
                <p class="text-body-sm text-on-surface-variant">
                  Sculpt your ideal electric commuter in our palette and sizing studio.
                </p>
                <button
                  type="button"
                  (click)="goTo('/bikes')"
                  class="px-7 py-3 rounded-full bg-primary text-on-primary text-label-lg cursor-pointer"
                >
                  Open Customizer
                </button>
              </div>
            } @else {
              <div class="mt-6 space-y-4">
                @for (item of state.cartItems(); track item.id) {
                  <div class="p-4 rounded-2xl bg-surface-container-low flex gap-4 items-start">
                    <div
                      class="w-20 h-20 rounded-xl bg-surface-container-lowest p-2 flex items-center justify-center shrink-0"
                    >
                      <img
                        [src]="item.image"
                        [alt]="item.modelName"
                        class="w-full h-full object-contain"
                        referrerpolicy="no-referrer"
                      />
                    </div>
                    <div class="flex-1 min-w-0 space-y-1">
                      <div class="flex items-start justify-between gap-2">
                        <h4 class="text-label-lg text-on-surface font-semibold truncate">
                          {{ item.modelName }}
                        </h4>
                        <button
                          type="button"
                          aria-label="Remove item"
                          (click)="state.removeCartItem(item.id)"
                          class="text-on-surface-variant hover:text-error cursor-pointer"
                        >
                          <mat-icon class="material-symbols-outlined text-[18px]">delete</mat-icon>
                        </button>
                      </div>
                      <p class="text-label-sm text-on-surface-variant">
                        {{ item.colorName }} · Size {{ item.size }}
                      </p>
                      <p class="text-[11px] text-on-surface-variant">{{ item.batteryLabel }}</p>
                      @if (item.addons.length > 0) {
                        <p class="text-[11px] text-primary">
                          + {{ item.addons.join(', ') }}
                        </p>
                      }
                      <div class="pt-2 flex items-center justify-between">
                        <div class="inline-flex items-center gap-2 bg-surface-container rounded-full px-2 py-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            (click)="state.updateQuantity(item.id, -1)"
                            class="w-6 h-6 rounded-full hover:bg-surface-container-lowest flex items-center justify-center cursor-pointer"
                          >
                            <mat-icon class="material-symbols-outlined text-[15px]">remove</mat-icon>
                          </button>
                          <span class="text-label-md font-semibold tabular-nums px-1">
                            {{ item.quantity }}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            (click)="state.updateQuantity(item.id, 1)"
                            class="w-6 h-6 rounded-full hover:bg-surface-container-lowest flex items-center justify-center cursor-pointer"
                          >
                            <mat-icon class="material-symbols-outlined text-[15px]">add</mat-icon>
                          </button>
                        </div>
                        <span class="text-label-lg font-bold text-on-surface tabular-nums">
                          \${{ (item.unitPrice * item.quantity).toLocaleString() }}
                        </span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          @if (state.cartItems().length > 0 && !orderConfirmed()) {
            <div class="pt-6 mt-6 border-t border-surface-container space-y-4">
              <div class="p-3.5 rounded-2xl bg-secondary-container/30 flex items-center justify-between">
                <span class="text-label-sm text-on-secondary-fixed-variant flex items-center gap-1.5">
                  <mat-icon class="material-symbols-outlined text-[16px]">local_shipping</mat-icon>
                  Ready-to-ride White-Glove Delivery
                </span>
                <span class="text-label-sm font-bold text-secondary">Free</span>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-body-sm text-on-surface-variant">
                  <span>Subtotal</span>
                  <span class="font-semibold text-on-surface tabular-nums">
                    \${{ state.cartSubtotal().toLocaleString() }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-label-sm text-on-surface-variant">
                  <span>0% APR Monthly Option</span>
                  <span class="tabular-nums">\${{ state.cartMonthly() }}/mo for 24 mos</span>
                </div>
              </div>

              <button
                type="button"
                (click)="placeOrder()"
                class="w-full h-14 rounded-full bg-primary text-on-primary text-label-lg shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Reservation</span>
                <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
              </button>
              <p class="text-[11px] text-center text-on-surface-variant">
                Includes 30-day home trial &amp; 5-year frame warranty.
              </p>
            </div>
          }
        </aside>
      </div>
    }

    <!-- SEARCH MODAL -->
    @if (state.searchModalOpen()) {
      <div
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
      >
        <button
          type="button"
          aria-label="Close search"
          (click)="state.searchModalOpen.set(false)"
          class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
        ></button>
        <div
          class="relative z-10 w-full max-w-xl bg-surface-container-lowest rounded-3xl p-6 shadow-2xl space-y-4"
        >
          <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-low">
            <mat-icon class="material-symbols-outlined text-primary text-[22px]">search</mat-icon>
            <input
              [formControl]="searchControl"
              type="text"
              placeholder="Search Zoe models, Carbon Belt, GPS, Paris rides, routes..."
              aria-label="Search ZoeBike"
              class="w-full bg-transparent text-on-surface placeholder:text-outline text-body-md focus:outline-none"
            />
            <button
              type="button"
              aria-label="Close search"
              (click)="state.searchModalOpen.set(false)"
              class="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[18px]">close</mat-icon>
            </button>
          </div>

          <div class="max-h-80 overflow-y-auto space-y-2">
            @for (result of filteredSearchResults(); track result.title) {
              <button
                type="button"
                (click)="openSearchResult(result)"
                class="w-full p-3.5 rounded-2xl bg-surface-container-low/60 hover:bg-surface-container flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="w-9 h-9 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center shrink-0"
                  >
                    <mat-icon class="material-symbols-outlined text-[18px]">{{ result.icon }}</mat-icon>
                  </div>
                  <div class="min-w-0">
                    <p class="text-label-lg text-on-surface font-semibold truncate">
                      {{ result.title }}
                    </p>
                    <p class="text-body-sm text-on-surface-variant truncate">
                      {{ result.subtitle }}
                    </p>
                  </div>
                </div>
                <span class="text-label-sm text-primary shrink-0">{{ result.category }}</span>
              </button>
            } @empty {
              <p class="text-center py-8 text-body-sm text-on-surface-variant">
                No matches found. Try searching "Zoe Air", "Battery", "GPS", or "Amsterdam".
              </p>
            }
          </div>
        </div>
      </div>
    }

    <!-- TEST RIDE BOOKING MODAL -->
    @if (state.testRideModalOpen()) {
      <div
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <button
          type="button"
          aria-label="Close test ride modal"
          (click)="state.testRideModalOpen.set(false)"
          class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
        ></button>
        <div
          class="relative z-10 w-full max-w-lg bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-2xl space-y-5"
        >
          <button
            type="button"
            aria-label="Close test ride modal"
            (click)="state.testRideModalOpen.set(false)"
            class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
          </button>

          <div>
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Complimentary 45-Minute Salon Ride
            </span>
            <h2 class="text-headline-md text-on-surface font-semibold mt-1">
              Book Your Private Test Ride
            </h2>
            <p class="text-body-sm text-on-surface-variant mt-1">
              Includes helmet fitting, posture tailoring, and artisanal espresso at your salon.
            </p>
          </div>

          <!-- City Selection -->
          <div class="space-y-2">
            <span class="text-label-sm text-on-surface-variant block">Select Salon City</span>
            <div class="flex flex-wrap gap-2">
              @for (city of salonCities; track city) {
                <button
                  type="button"
                  (click)="selectedModalCity.set(city)"
                  class="px-3.5 py-1.5 rounded-full text-label-sm transition-colors cursor-pointer"
                  [class]="
                    selectedModalCity() === city
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  "
                >
                  {{ city }}
                </button>
              }
            </div>
          </div>

          <form [formGroup]="modalBookingForm" (ngSubmit)="submitModalBooking()" class="space-y-4">
            <div class="space-y-2">
              <span class="text-label-sm text-on-surface-variant block">Preferred Model</span>
              <div class="grid grid-cols-3 gap-2">
                @for (m of ['air', 'flow', 'cargo']; track m) {
                  <button
                    type="button"
                    (click)="modalSelectedModel.set($any(m))"
                    class="px-3 py-2.5 rounded-xl text-label-md text-center transition-colors cursor-pointer"
                    [class]="
                      modalSelectedModel() === m
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    "
                  >
                    {{ getModelShortName($any(m)) }}
                  </button>
                }
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="modal-location-input" class="text-label-sm text-on-surface-variant block">
                Postal Code or Neighborhood
              </label>
              <input
                id="modal-location-input"
                formControlName="location"
                type="text"
                placeholder="e.g. 75003 Paris or E1 6AN London"
                class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div class="space-y-1.5">
              <label for="modal-email-input" class="text-label-sm text-on-surface-variant block">
                Contact Email
              </label>
              <input
                id="modal-email-input"
                formControlName="email"
                type="email"
                placeholder="name@domain.com"
                class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <button
              type="submit"
              class="w-full py-3.5 rounded-full bg-primary text-on-primary text-label-lg shadow-md hover:bg-primary-container transition-all cursor-pointer"
            >
              {{ modalBookingSuccess() ? 'Slot Reserved! Check Inbox ✓' : 'Reserve VIP Test Ride' }}
            </button>
          </form>
        </div>
      </div>
    }

    <!-- ACCOUNT / FAVORITES & BOOKINGS DRAWER -->
    @if (state.accountDrawerOpen()) {
      <div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex justify-end">
        <button
          type="button"
          aria-label="Close rider drawer"
          (click)="state.accountDrawerOpen.set(false)"
          class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
        ></button>
        <aside
          aria-label="Rider Account"
          class="relative z-10 w-full max-w-md bg-surface-container-lowest h-full shadow-2xl p-6 md:p-8 overflow-y-auto space-y-6"
        >
          <div class="flex items-center justify-between pb-4 border-b border-surface-container">
            <div>
              <p class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Zoe Club Member
              </p>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Saved Builds &amp; Rides
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close rider drawer"
              (click)="state.accountDrawerOpen.set(false)"
              class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Saved Models -->
          <div class="space-y-3">
            <h3 class="text-label-lg text-on-surface">
              Saved Favorites ({{ state.favoriteModels().length }})
            </h3>
            @for (key of state.favoriteModels(); track key) {
              <div class="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <img
                    [src]="models[key].image"
                    [alt]="models[key].name"
                    class="w-14 h-14 rounded-xl bg-surface-container-lowest object-contain p-1"
                    referrerpolicy="no-referrer"
                  />
                  <div>
                    <p class="text-label-lg text-on-surface font-semibold">
                      {{ models[key].name }}
                    </p>
                    <p class="text-label-sm text-on-surface-variant">
                      {{ models[key].weight }} · \${{ models[key].basePrice.toLocaleString() }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  (click)="configureFavorite(key)"
                  class="px-3.5 py-2 rounded-full bg-primary text-on-primary text-label-sm cursor-pointer"
                >
                  Customize
                </button>
              </div>
            } @empty {
              <p class="text-body-sm text-on-surface-variant">
                Tap the heart icon on any Zoe model to bookmark it here.
              </p>
            }
          </div>

          <!-- Booked Test Rides -->
          <div class="space-y-3">
            <h3 class="text-label-lg text-on-surface">
              Test Ride Sessions ({{ state.testRideBookings().length }})
            </h3>
            @for (booking of state.testRideBookings(); track booking.id) {
              <div class="p-3.5 rounded-2xl bg-secondary-container/25 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-label-md font-semibold text-on-surface">
                    {{ booking.modelName }}
                  </span>
                  <span class="text-label-sm text-secondary font-semibold">{{ booking.id }}</span>
                </div>
                <p class="text-body-sm text-on-surface-variant">
                  Salon: {{ booking.salonCity }} · {{ booking.email }}
                </p>
              </div>
            } @empty {
              <p class="text-body-sm text-on-surface-variant">
                No salon test rides scheduled yet.
              </p>
            }
          </div>

          <!-- Club RSVPs -->
          <div class="space-y-3">
            <h3 class="text-label-lg text-on-surface">
              Club Ride RSVPs ({{ state.rsvpedEventIds().length }})
            </h3>
            @for (evId of state.rsvpedEventIds(); track evId) {
              <div class="p-3.5 rounded-2xl bg-tertiary-fixed/40 flex items-center justify-between">
                <span class="text-label-md text-on-surface font-semibold">
                  {{ getEventTitle(evId) }}
                </span>
                <span class="text-label-sm text-tertiary font-semibold">Attending</span>
              </div>
            } @empty {
              <p class="text-body-sm text-on-surface-variant">
                RSVP to a weekend ride in Zoe Club &amp; Stories.
              </p>
            }
          </div>
        </aside>
      </div>
    }

    <!-- TOAST NOTIFICATION -->
    @if (state.toastMessage()) {
      <div
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full bg-inverse-surface text-inverse-on-surface text-label-lg shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <mat-icon class="material-symbols-outlined text-[18px] text-primary-fixed">
          check_circle
        </mat-icon>
        <span>{{ state.toastMessage() }}</span>
      </div>
    }
  `,
})
export class GlobalOverlays {
  readonly state = inject(ZoeState);
  private readonly router = inject(Router);

  readonly models = BIKE_MODELS;
  readonly salonCities = ['Paris (Marais)', 'London (Soho)', 'Berlin (Mitte)', 'Amsterdam', 'Brooklyn, NY'];
  readonly selectedModalCity = signal('Paris (Marais)');
  readonly modalSelectedModel = signal<BikeModelKey>('flow');
  readonly modalBookingSuccess = signal(false);

  readonly orderConfirmed = signal(false);
  readonly orderNumber = signal(4281);

  readonly searchControl = new FormControl('', {nonNullable: true});
  readonly searchQuery = signal('');

  readonly modalBookingForm = new FormGroup({
    location: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  private readonly searchIndex = [
    ...Object.values(BIKE_MODELS).map((m) => ({
      title: m.name,
      subtitle: `${m.weight} · ${m.range} · $${m.basePrice.toLocaleString()}`,
      category: 'Bike Model',
      icon: m.icon,
      route: '/bikes',
      modelKey: m.key,
    })),
    {
      title: 'Smart Anti-Theft & Cellular GPS',
      subtitle: '4G eSIM geofencing & motor stator lock',
      category: 'Tech & Safety',
      icon: 'radar',
      route: '/tech',
    },
    {
      title: 'Portable Bottle Battery (2.1 kg)',
      subtitle: '75 km range, 65W USB-C bi-directional charging',
      category: 'Tech & Safety',
      icon: 'battery_charging_full',
      route: '/tech',
    },
    {
      title: 'Gates Carbon Belt Drive',
      subtitle: 'Zero grease, 30,000 km silent operation',
      category: 'Tech & Safety',
      icon: 'all_inclusive',
      route: '/tech',
    },
    {
      title: 'About ZoeBike AI & Mission',
      subtitle: 'Sub-8 ms neural torque assist, gentle routing & carbon-neutral craft',
      category: 'Company',
      icon: 'auto_awesome',
      route: '/about',
    },
    {
      title: 'AI Ride Profile Simulator',
      subtitle: 'Preview Eco Glide, City Flow & Hill Assist neural calibrations',
      category: 'Company',
      icon: 'psychology',
      route: '/about',
    },
    ...RIDER_STORIES.map((s) => ({
      title: s.title,
      subtitle: `${s.name} · ${s.city}`,
      category: 'Rider Story',
      icon: 'menu_book',
      route: '/club',
    })),
    ...CLUB_EVENTS.map((e) => ({
      title: e.title,
      subtitle: `${e.locationBadge} · ${e.timeInfo}`,
      category: 'Club Ride',
      icon: 'event',
      route: '/club',
    })),
    ...SCENIC_ROUTES.map((r) => ({
      title: r.title,
      subtitle: `${r.distance} · ${r.summary}`,
      category: 'Scenic Route',
      icon: 'map',
      route: '/club',
    })),
    ...GALLERY_POSTS.map((g) => ({
      title: `${g.handle} (${g.city})`,
      subtitle: g.caption,
      category: '#MyZoeBike',
      icon: 'photo_camera',
      route: '/club',
    })),
  ];

  constructor() {
    this.searchControl.valueChanges.subscribe((v) => this.searchQuery.set(v));
  }

  readonly filteredSearchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.searchIndex.slice(0, 6);
    return this.searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  });

  getModelShortName(key: BikeModelKey): string {
    return BIKE_MODELS[key].name;
  }

  getEventTitle(id: string): string {
    return CLUB_EVENTS.find((e) => e.id === id)?.title ?? id;
  }

  configureFavorite(key: BikeModelKey): void {
    this.state.preferredModel.set(key);
    this.state.accountDrawerOpen.set(false);
    this.router.navigateByUrl('/bikes');
  }

  goTo(path: string): void {
    this.state.closeAllOverlays();
    this.router.navigateByUrl(path);
  }

  openSearchResult(result: {route: string; modelKey?: BikeModelKey}): void {
    if (result.modelKey) {
      this.state.preferredModel.set(result.modelKey);
    }
    this.state.searchModalOpen.set(false);
    this.router.navigateByUrl(result.route);
  }

  placeOrder(): void {
    this.orderNumber.set(Math.floor(1000 + Math.random() * 8999));
    this.state.clearCart();
    this.orderConfirmed.set(true);
  }

  submitModalBooking(): void {
    if (this.modalBookingForm.invalid) {
      this.state.showToast('Please enter your neighborhood and a valid email.');
      return;
    }
    const {location, email} = this.modalBookingForm.getRawValue();
    this.state.addTestRideBooking({
      salonCity: this.selectedModalCity(),
      modelName: BIKE_MODELS[this.modalSelectedModel()].name,
      locationInput: location ?? '',
      email: email ?? '',
    });
    this.modalBookingSuccess.set(true);
    setTimeout(() => {
      this.modalBookingSuccess.set(false);
      this.modalBookingForm.reset();
      this.state.testRideModalOpen.set(false);
    }, 1200);
  }
}
