import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {ASHBIKE_APPS, PLANET_BENEFITS, RIDER_BENEFITS} from '../../data/ashbike-data';
import {BIKE_MODELS, BikeModelKey, ZOE_IMAGES} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

interface SoftwareSuiteItem {
  id: string;
  tabLabel: string;
  kicker: string;
  title: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaRoute: string;
  architectureBadge: string;
  highlights: string[];
  icon: string;
}

const SOFTWARE_SUITE: SoftwareSuiteItem[] = [
  {
    id: 'ashbike',
    tabLabel: 'AshBike Companion',
    kicker: 'Android · Google Health Connect · Phase One Prototype',
    title: 'AshBike Companion',
    tagline: 'Your private, weather-aware cycling companion.',
    description: ASHBIKE_APPS[0].summary,
    ctaLabel: 'Open Full App Architecture',
    ctaRoute: '/tech/app',
    architectureBadge: '100% On-Device',
    highlights: [
      'Real-time wind, weather, speed, and elevation tracking',
      'Custom route planning by surface quality and traffic density',
      'Private on-device SQLite storage with zero external servers',
      'Optional Google Health Connect read/write fitness sync',
    ],
    icon: 'smartphone',
  },
  {
    id: 'swift',
    tabLabel: 'Swift Bike Shift',
    kicker: 'Android · San Francisco Transit · Early Alpha',
    title: 'Swift Bike Shift',
    tagline: 'Station-by-station urban bike discovery.',
    description: ASHBIKE_APPS[1].summary,
    ctaLabel: 'Explore Station Routing',
    ctaRoute: '/tech/features',
    architectureBadge: 'Live Dock Map',
    highlights: [
      'Downtown shared bike station lookup via map or next/previous pins',
      'Discover neighborhood cafés and points of interest nearby',
      'One-tap cycling turn-by-turn launch in Google Maps',
      'Calendar trip reservation scheduling on roadmap',
    ],
    icon: 'map',
  },
  {
    id: 'goswift',
    tabLabel: 'GoSwift Fitness',
    kicker: 'iOS · Apple Health & Calendar · Active Concept',
    title: 'GoSwift Fitness',
    tagline: 'Turn everyday trips into rewarding cardio.',
    description: ASHBIKE_APPS[2].summary,
    ctaLabel: 'See Sustainability Rewards',
    ctaRoute: '/sustainability',
    architectureBadge: 'Health + Rewards',
    highlights: [
      'Automatic Calendar-to-bike route matching for errands',
      'Apple Health heart rate, cadence, and daily active step tracking',
      'Eco-milestone collectibles redeemable for cycling gear',
      'Designed around zero gym commute wasted time',
    ],
    icon: 'emoji_events',
  },
  {
    id: 'wearos',
    tabLabel: 'Go Swift WearOS',
    kicker: 'WearOS Smartwatch · Glanceable Telemetry',
    title: 'Go Swift WearOS',
    tagline: 'Hands-on-bars smartwatch ride face.',
    description: ASHBIKE_APPS[3].summary,
    ctaLabel: 'Inspect Smart Glass & Watch',
    ctaRoute: '/tech/app/hud',
    architectureBadge: 'Wrist Display',
    highlights: [
      'Glanceable real-time cadence, speed, and trip duration',
      'Remaining dock & PEZ tower stall timer at a glance',
      'Phone stays pocketed for calmer city focus',
      'Haptic navigation tap cues before street turns',
    ],
    icon: 'watch',
  },
  {
    id: 'zoe-ai',
    tabLabel: 'ZoeBike AI Neural',
    kicker: 'On-Bike Edge Intelligence · 8 ms Torque Sensing',
    title: 'ZoeBike AI Neural Torque',
    tagline: 'Quiet assistance that anticipates hills and headwinds.',
    description:
      'On-bike edge intelligence reads incline gradient, headwind resistance, and your pedal cadence in under 8 milliseconds—delivering smooth electric power before fatigue begins.',
    ctaLabel: 'Read About ZoeBike AI',
    ctaRoute: '/about',
    architectureBadge: '< 8 ms Edge Inference',
    highlights: [
      'Eco Glide, City Flow, and Hill Assist adaptive calibration',
      'Regenerative front braking harvests downhill kinetic energy',
      'Automatic crash SOS detection with local smartphone fusion',
      'Sub-15 kg lightweight step-through aluminum-magnesium frame',
    ],
    icon: 'auto_awesome',
  },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="flex flex-col w-full bg-white">
      <!-- HERO SECTION (bg-white, border-b border-slate-200) -->
      <section class="w-full bg-white border-b border-slate-200 py-12 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <!-- Left Column -->
            <div class="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div class="space-y-5">
                <p class="text-sm font-medium text-emerald-700">
                  ZoeBike <span class="text-slate-300 mx-1" aria-hidden="true">·</span> Sunlit
                  Urban Mobility for Rider &amp; Planet
                </p>

                <h1
                  class="font-display font-bold text-slate-900 tracking-tight leading-[1.06] text-4xl sm:text-5xl lg:text-[3.5rem]"
                >
                  Fall in love with biking, one ride at a time.
                </h1>

                <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  We are all athletes using our energy to save our planet and ourselves. ZoeBike
                  fuses sub-15 kg electric frames, smartphone sensor fusion, regenerative brakes,
                  and human-scale city infrastructure so everyday travel restores both health and
                  clean air.
                </p>

                <div class="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    routerLink="/sustainability"
                    class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  >
                    <mat-icon class="!text-[19px] !w-[19px] !h-[19px] leading-none">eco</mat-icon>
                    <span>Explore Sustainability</span>
                  </a>
                  <a
                    routerLink="/bikes"
                    class="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-mineral border border-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <span>Browse Bikes &amp; Concepts</span>
                    <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                      arrow_forward
                    </mat-icon>
                  </a>
                </div>
              </div>

              <p class="text-xs text-slate-500">
                Android · iOS · WearOS · Google Health Connect · Smart Glass HUD
              </p>
            </div>

            <!-- Right Media Frame -->
            <div
              class="lg:col-span-6 min-h-[300px] lg:min-h-[440px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 sm:p-6"
            >
              <img
                class="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-[1.02]"
                alt="Featherweight Zoe electric commuter bicycle in sunlit brushed finish"
                [src]="images.heroBike"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>

          <!-- 4-Column Impact Strip anchored beneath Hero -->
          <div
            class="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            <div class="space-y-1">
              <p class="font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                0 g/km
              </p>
              <p class="text-sm font-semibold text-slate-800">Tailpipe Emissions</p>
              <p class="text-xs text-slate-500">Clean air across daily commutes</p>
            </div>

            <div class="space-y-1">
              <p class="font-display text-2xl sm:text-3xl font-bold text-seaglass tabular-nums">
                8x Less
              </p>
              <p class="text-sm font-semibold text-slate-800">Street Footprint</p>
              <p class="text-xs text-slate-500">Quieter, calmer city corridors</p>
            </div>

            <div class="space-y-1">
              <p class="font-display text-2xl sm:text-3xl font-bold text-emerald-700 tabular-nums">
                10 Bikes
              </p>
              <p class="text-sm font-semibold text-slate-800">Per Car Stall Footprint</p>
              <p class="text-xs text-slate-500">Vertical PEZ-style Bike Towers</p>
            </div>

            <div class="space-y-1">
              <p class="font-display text-2xl sm:text-3xl font-bold text-ocean tabular-nums">
                +35 min
              </p>
              <p class="text-sm font-semibold text-slate-800">Daily Cardio Flow</p>
              <p class="text-xs text-slate-500">Built-in health on every errand</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 01: CORE ARCHITECTURE (bg-slate-50, border-b border-slate-200) -->
      <section class="w-full bg-slate-50 border-b border-slate-200 py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div class="max-w-2xl space-y-2">
            <p class="text-sm font-medium text-emerald-700">01. Core Architecture</p>
            <h2 class="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Saving the Earth one bike at a time.
            </h2>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
              Four interconnected ideas—intelligent software, energy-recovering hardware, clean
              propulsion concepts, and vertical urban space—built to make cycling irresistible.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Bento Wide Card 1 (bg-pearl) -->
            <div
              class="lg:col-span-2 bg-pearl rounded-2xl border border-mineral-line overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch"
            >
              <div class="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div class="space-y-2.5">
                  <p class="text-xs font-medium text-emerald-700">
                    Smartphone · Bicycle Brain Fusion · Android &amp; iOS
                  </p>
                  <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    From Pocket to Pedal: Your Phone as Bicycle Brain
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    Leverage GPS, barometers, gyroscopes, and cameras already in your pocket for
                    real-time wind forecasts, crash detection, terrain-aware routing, and Smart
                    Glass HUD cues.
                  </p>
                </div>
                <a
                  routerLink="/tech/features/functions"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Inspect Sensor Suite &amp; Apps</span>
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                    arrow_forward
                  </mat-icon>
                </a>
              </div>
              <div
                class="md:col-span-5 min-h-[220px] bg-slate-100 border-t md:border-t-0 md:border-l border-mineral-line overflow-hidden"
              >
                <img
                  [src]="images.techGps"
                  alt="Smartphone mounted on bicycle handlebars showing navigation telemetry"
                  class="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                  referrerpolicy="no-referrer"
                />
              </div>
            </div>

            <!-- Bento Card 2 (bg-white, seaglass accent) -->
            <div
              class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div class="space-y-2.5">
                <p class="text-xs font-medium text-seaglass">Urban Parking · Micro-Mobility</p>
                <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                  Vertical Bike Tower
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed">
                  Bike parking reimagined—just like a PEZ dispenser. An automated street-level
                  elevator stacks bikes vertically, clearing sidewalks for cafés and pedestrians
                  while shielding rides from theft and rain.
                </p>
              </div>
              <a
                routerLink="/sustainability/cities/parking"
                class="inline-flex items-center gap-2 text-sm font-semibold text-seaglass hover:text-seaglass-deep transition-colors"
              >
                <span>Try Tower Simulator</span>
                <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                  arrow_forward
                </mat-icon>
              </a>
            </div>

            <!-- Bento Card 3 (bg-white, emerald accent) -->
            <div
              class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div class="space-y-2.5">
                <p class="text-xs font-medium text-emerald-700">
                  Electric Brakes · Anti-Lock Safety
                </p>
                <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                  Regenerative Front Braking
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed">
                  Replaces friction pads on the front wheel with electromagnetic generators. Harvests
                  kinetic energy to charge phones and lights while preventing dangerous front-wheel
                  lockups.
                </p>
              </div>
              <a
                routerLink="/tech/electric-brakes"
                class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <span>Simulate Brake Harvest</span>
                <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                  arrow_forward
                </mat-icon>
              </a>
            </div>

            <!-- Bento Wide Card 4 (bg-pearl, ocean accent) -->
            <div
              class="lg:col-span-2 bg-pearl rounded-2xl border border-mineral-line overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch"
            >
              <div
                class="md:col-span-5 min-h-[220px] bg-slate-100 border-b md:border-b-0 md:border-r border-mineral-line overflow-hidden"
              >
                <img
                  [src]="images.lifestyleParis"
                  alt="Rider cruising effortlessly along a sunlit boulevard on a lightweight Zoe electric bike"
                  class="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                  referrerpolicy="no-referrer"
                />
              </div>
              <div class="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div class="space-y-2.5">
                  <p class="text-xs font-medium text-ocean">Store &amp; Concept Lab · H₂ Propulsion</p>
                  <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    The H₂ E-Bike Concept &amp; eMobility
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    Exploring hydrogen-assisted extended range alongside integrated electric
                    rickshaws, eTruck logistics, and featherweight daily commuter frames built for
                    real cities.
                  </p>
                </div>
                <a
                  routerLink="/store"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:text-ocean-deep transition-colors"
                >
                  <span>View H₂ Concept &amp; Store</span>
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                    arrow_forward
                  </mat-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 02: CONNECTED SOFTWARE & AI SUITE (bg-white, border-b border-slate-200) -->
      <section class="w-full bg-white border-b border-slate-200 py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div class="max-w-xl space-y-2">
              <p class="text-sm font-medium text-emerald-700">
                02. Connected Software &amp; AI Suite
              </p>
              <h2 class="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Shared bike, fitness, and ZoeBike AI cockpit.
              </h2>
            </div>

            <!-- AshBike Mineral Segmented Tab Switcher -->
            <div
              role="tablist"
              aria-label="ZoeBike and AshBike software suite modules"
              class="flex flex-wrap items-center gap-1.5 p-1.5 bg-mineral rounded-xl border border-mineral-line"
            >
              @for (app of softwareSuite; track app.id; let idx = $index) {
                <button
                  type="button"
                  role="tab"
                  [attr.aria-selected]="activeAppIndex() === idx"
                  (click)="activeAppIndex.set(idx)"
                  class="px-3.5 py-2 text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  [class]="
                    activeAppIndex() === idx
                      ? 'bg-white text-slate-900 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  "
                >
                  {{ app.tabLabel }}
                </button>
              }
            </div>
          </div>

          <!-- Active App Detail Panel (bg-pearl) -->
          <div
            class="bg-pearl rounded-2xl border border-mineral-line p-7 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div class="lg:col-span-6 space-y-5">
              <p class="text-xs font-medium text-slate-500 font-mono">
                {{ activeApp().kicker }}
              </p>

              <div class="flex items-center gap-3.5">
                <div
                  class="w-12 h-12 rounded-xl bg-seaglass-mist border border-seaglass-line text-seaglass flex items-center justify-center shrink-0"
                >
                  <mat-icon class="!text-[24px] !w-[24px] !h-[24px] leading-none">
                    {{ activeApp().icon }}
                  </mat-icon>
                </div>
                <div>
                  <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                    {{ activeApp().title }}
                  </h3>
                  <p class="text-sm font-medium text-seaglass">{{ activeApp().tagline }}</p>
                </div>
              </div>

              <p class="text-sm text-slate-600 leading-relaxed">
                {{ activeApp().description }}
              </p>

              <div>
                <a
                  [routerLink]="activeApp().ctaRoute"
                  class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{{ activeApp().ctaLabel }}</span>
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                    arrow_forward
                  </mat-icon>
                </a>
              </div>
            </div>

            <div class="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                <span class="text-xs font-medium text-slate-500">Data Architecture</span>
                <span class="font-mono text-xs font-semibold text-ocean tabular-nums">
                  {{ activeApp().architectureBadge }}
                </span>
              </div>
              <ul class="space-y-3">
                @for (bullet of activeApp().highlights; track bullet) {
                  <li class="flex items-start gap-2.5 text-sm text-slate-700">
                    <mat-icon
                      class="!text-[16px] !w-[16px] !h-[16px] leading-none text-emerald-600 mt-0.5 shrink-0"
                    >
                      check_circle_outline
                    </mat-icon>
                    <span>{{ bullet }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 03: SIGNATURE HARDWARE (bg-slate-50, border-b border-slate-200) -->
      <section class="w-full bg-slate-50 border-b border-slate-200 py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div class="max-w-xl space-y-2">
              <p class="text-sm font-medium text-ocean">03. Signature Electric Hardware</p>
              <h2 class="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Two featherweight electric silhouettes.
              </h2>
              <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
                Sculpted from over 4,000 ergonomic rider body-scans with silent Gates Carbon belt
                drives and balanced battery geometry.
              </p>
            </div>
            <button
              type="button"
              (click)="showCompareModal.set(true)"
              class="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-mineral border border-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                compare_arrows
              </mat-icon>
              <span>Compare Dimensions &amp; Specs</span>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Zoe Air 01 -->
            <div
              class="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between gap-6"
            >
              <div class="space-y-5">
                <div class="flex items-start justify-between gap-4">
                  <div class="space-y-1">
                    <p class="text-xs font-medium text-seaglass">
                      Ultra-Light Diamond · 13.9 kg · 65 km
                    </p>
                    <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                      Zoe Air 01
                    </h3>
                    <p class="text-sm text-slate-600 leading-relaxed">
                      Nimble city agility sculpted for effortless stair climbs and fast commuting.
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      $2,450
                    </span>
                    <span class="block text-xs text-slate-500 tabular-nums">or $82/mo</span>
                  </div>
                </div>

                <div class="flex items-center gap-2.5">
                  <span class="text-xs font-medium text-slate-500 mr-1">Finish:</span>
                  @for (swatch of airSwatches; track swatch.name) {
                    <button
                      type="button"
                      [title]="swatch.name"
                      [attr.aria-label]="'Select ' + swatch.name + ' finish'"
                      (click)="selectedAirSwatch.set(swatch.name)"
                      class="w-6 h-6 rounded-full border border-slate-300 transition-transform cursor-pointer"
                      [style.background-color]="swatch.hex"
                      [class]="
                        selectedAirSwatch() === swatch.name
                          ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110'
                          : 'hover:scale-110'
                      "
                    ></button>
                  }
                  <span class="font-mono text-xs text-slate-600 ml-1">
                    {{ selectedAirSwatch() }}
                  </span>
                </div>

                <div
                  class="w-full h-64 rounded-xl bg-pearl border border-mineral-line overflow-hidden flex items-center justify-center p-4"
                >
                  <img
                    class="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-[1.03]"
                    alt="Zoe Air 01 lightweight electric commuter bike"
                    [src]="images.zoeAirHome"
                    referrerpolicy="no-referrer"
                  />
                </div>
              </div>

              <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  (click)="configureModel('air', selectedAirSwatch())"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <span>Configure Zoe Air 01</span>
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                    arrow_forward
                  </mat-icon>
                </button>
                <button
                  type="button"
                  (click)="state.toggleFavorite('air')"
                  aria-label="Save Zoe Air 01 to favorites"
                  class="w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer"
                  [class]="
                    state.isFavorite('air')
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-mineral'
                  "
                >
                  <mat-icon
                    class="!text-[18px] !w-[18px] !h-[18px] leading-none"
                    [class.icon-filled]="state.isFavorite('air')"
                  >
                    favorite
                  </mat-icon>
                </button>
              </div>
            </div>

            <!-- Zoe Flow Wave -->
            <div
              class="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between gap-6"
            >
              <div class="space-y-5">
                <div class="flex items-start justify-between gap-4">
                  <div class="space-y-1">
                    <p class="text-xs font-medium text-ocean">
                      Low Step-Through · 14.6 kg · 80 km
                    </p>
                    <h3 class="font-display text-2xl font-bold text-slate-900 tracking-tight">
                      Zoe Flow Wave
                    </h3>
                    <p class="text-sm text-slate-600 leading-relaxed">
                      39 cm step-through frame engineered for upright comfort in everyday clothing.
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="font-display text-2xl font-bold text-slate-900 tabular-nums">
                      $2,680
                    </span>
                    <span class="block text-xs text-slate-500 tabular-nums">or $89/mo</span>
                  </div>
                </div>

                <div class="flex items-center gap-2.5">
                  <span class="text-xs font-medium text-slate-500 mr-1">Finish:</span>
                  @for (swatch of flowSwatches; track swatch.name) {
                    <button
                      type="button"
                      [title]="swatch.name"
                      [attr.aria-label]="'Select ' + swatch.name + ' finish'"
                      (click)="selectedFlowSwatch.set(swatch.name)"
                      class="w-6 h-6 rounded-full border border-slate-300 transition-transform cursor-pointer"
                      [style.background-color]="swatch.hex"
                      [class]="
                        selectedFlowSwatch() === swatch.name
                          ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110'
                          : 'hover:scale-110'
                      "
                    ></button>
                  }
                  <span class="font-mono text-xs text-slate-600 ml-1">
                    {{ selectedFlowSwatch() }}
                  </span>
                </div>

                <div
                  class="w-full h-64 rounded-xl bg-pearl border border-mineral-line overflow-hidden flex items-center justify-center p-4"
                >
                  <img
                    class="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-[1.03]"
                    alt="Zoe Flow Wave low step-through electric commuter bike"
                    [src]="images.zoeFlowHome"
                    referrerpolicy="no-referrer"
                  />
                </div>
              </div>

              <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  (click)="configureModel('flow', selectedFlowSwatch())"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <span>Configure Zoe Flow Wave</span>
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                    arrow_forward
                  </mat-icon>
                </button>
                <button
                  type="button"
                  (click)="state.toggleFavorite('flow')"
                  aria-label="Save Zoe Flow Wave to favorites"
                  class="w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer"
                  [class]="
                    state.isFavorite('flow')
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-mineral'
                  "
                >
                  <mat-icon
                    class="!text-[18px] !w-[18px] !h-[18px] leading-none"
                    [class.icon-filled]="state.isFavorite('flow')"
                  >
                    favorite
                  </mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 04: WHY BIKE · QUANTIFIED IMPACT (bg-white, border-b border-slate-200) -->
      <section class="w-full bg-white border-b border-slate-200 py-16 lg:py-24">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <!-- Left Column: Interactive Impact Slider & Multi-Accent Filter -->
          <div class="lg:col-span-5 space-y-6">
            <div class="space-y-2.5">
              <p class="text-sm font-medium text-emerald-700">04. Why Bike · Quantified Impact</p>
              <h2 class="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                See what replacing car miles does in one year.
              </h2>
              <p class="text-sm text-slate-600 leading-relaxed">
                Slide your daily round-trip ride distance to estimate annual carbon kept out of the
                sky, household fuel savings redirected locally, and weekly aerobic fitness gained.
              </p>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div class="flex items-center justify-between gap-2">
                <label for="daily-km-slider" class="text-sm font-semibold text-slate-700">
                  Daily Commute Distance
                </label>
                <span class="font-mono text-xl sm:text-2xl font-bold text-emerald-700 tabular-nums">
                  {{ dailyKm() }} km / day
                </span>
              </div>

              <div class="space-y-2">
                <input
                  id="daily-km-slider"
                  type="range"
                  min="2"
                  max="40"
                  step="1"
                  [value]="dailyKm()"
                  (input)="onSliderChange($event)"
                  class="w-full accent-emerald-600 cursor-pointer"
                />
                <div class="flex justify-between font-mono text-xs text-slate-500">
                  <span>2 km</span>
                  <span>20 km</span>
                  <span>40 km</span>
                </div>
              </div>

              <!-- 2x2 Tinted Coastal Readout Cards (§6.3) -->
              <div class="grid grid-cols-2 gap-3 tabular-nums">
                <div class="p-4 rounded-xl bg-ocean-mist border border-ocean-line">
                  <span class="text-xs font-medium text-slate-600 block">CO₂ Avoided / Yr</span>
                  <span class="font-display text-xl font-bold text-ocean mt-1 block">
                    {{ co2SavedKgYear() }} kg
                  </span>
                </div>
                <div class="p-4 rounded-xl bg-seaglass-mist border border-seaglass-line">
                  <span class="text-xs font-medium text-slate-600 block">Fuel &amp; Parking Saved</span>
                  <span class="font-display text-xl font-bold text-seaglass mt-1 block">
                    \${{ moneySavedYear().toLocaleString() }}
                  </span>
                </div>
                <div class="p-4 rounded-xl bg-mineral border border-mineral-line">
                  <span class="text-xs font-medium text-slate-600 block">Active Energy / Wk</span>
                  <span class="font-display text-xl font-bold text-slate-900 mt-1 block">
                    {{ caloriesPerWeek().toLocaleString() }} kcal
                  </span>
                </div>
                <div class="p-4 rounded-xl bg-pearl border border-mineral-line">
                  <span class="text-xs font-medium text-slate-600 block">Active Cardio / Wk</span>
                  <span class="font-display text-xl font-bold text-emerald-700 mt-1 block">
                    {{ activeMinsWeek() }} min
                  </span>
                </div>
              </div>
            </div>

            <!-- Semantic Filter Chips (§6.4) -->
            <div class="flex flex-wrap items-center gap-2">
              <button
                type="button"
                (click)="benefitFilter.set('all')"
                class="px-4 py-2 text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                [class]="
                  benefitFilter() === 'all'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-mineral text-slate-700 hover:bg-slate-200 font-medium'
                "
              >
                All Benefits (8)
              </button>
              <button
                type="button"
                (click)="benefitFilter.set('rider')"
                class="px-4 py-2 text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                [class]="
                  benefitFilter() === 'rider'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-mineral text-slate-700 hover:bg-slate-200 font-medium'
                "
              >
                For the Rider
              </button>
              <button
                type="button"
                (click)="benefitFilter.set('planet')"
                class="px-4 py-2 text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                [class]="
                  benefitFilter() === 'planet'
                    ? 'bg-ocean text-white font-semibold'
                    : 'bg-mineral text-slate-700 hover:bg-slate-200 font-medium'
                "
              >
                For the Planet
              </button>
            </div>
          </div>

          <!-- Right Column: Clean 2-Column Benefits Grid -->
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            @for (benefit of filteredBenefits(); track benefit.title) {
              <div
                class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between gap-4"
              >
                <div class="flex items-center justify-between gap-2">
                  <div
                    class="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                    [class]="
                      benefit.audience === 'rider'
                        ? 'bg-seaglass-mist border-seaglass-line text-seaglass'
                        : 'bg-ocean-mist border-ocean-line text-ocean'
                    "
                  >
                    <mat-icon class="!text-[20px] !w-[20px] !h-[20px] leading-none">
                      {{ benefit.icon }}
                    </mat-icon>
                  </div>
                  <span class="font-mono text-xs text-slate-500 tabular-nums">
                    {{ benefit.metric }}
                  </span>
                </div>
                <div class="space-y-1.5">
                  <h3 class="font-display text-lg font-semibold text-slate-900">
                    {{ benefit.title }}
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    {{ benefit.detail }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- SECTION 05: ZOEBIKE AI & CONCIERGE TEST RIDE (bg-white) -->
      <section class="w-full bg-white py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div
            class="bg-pearl rounded-2xl border border-mineral-line overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            <!-- Left: ZoeBike AI Horizon Banner & Salon Selector -->
            <div
              class="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-mineral-line"
            >
              <div class="h-48 sm:h-56 bg-slate-100 border-b border-mineral-line overflow-hidden">
                <img
                  [src]="images.aboutBanner"
                  alt="ZoeBike cosmic cycling horizon banner"
                  class="w-full h-full object-cover object-center"
                  referrerpolicy="no-referrer"
                />
              </div>
              <div class="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div class="space-y-2.5">
                  <p class="text-sm font-medium text-emerald-700">
                    05. ZoeBike AI &amp; Regional Salons
                  </p>
                  <h2
                    class="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                  >
                    Feel Neural Torque in Person.
                  </h2>
                  <p class="text-sm text-slate-600 leading-relaxed max-w-xl">
                    Edge inference reads road incline and headwinds in under 8 ms so every climb
                    feels effortless. Reserve a complimentary 45-minute test ride or read our story
                    on the About ZoeBike AI page.
                  </p>
                </div>

                <div class="space-y-2.5">
                  <span class="text-xs font-medium text-slate-500 block">Select Salon City:</span>
                  <div class="flex flex-wrap gap-2">
                    @for (city of salonCities; track city) {
                      <button
                        type="button"
                        (click)="selectedSalonCity.set(city)"
                        class="px-3.5 py-2 text-xs rounded-xl border transition-colors cursor-pointer whitespace-nowrap"
                        [class]="
                          selectedSalonCity() === city
                            ? 'bg-seaglass border-seaglass text-white font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-mineral font-medium'
                        "
                      >
                        {{ city }}
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Clean Light-Mode Booking Form -->
            <form
              [formGroup]="bookingForm"
              (ngSubmit)="submitTestRide()"
              class="lg:col-span-5 bg-white p-7 sm:p-8 flex flex-col justify-between gap-5"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span class="font-display text-xl font-bold text-slate-900">
                    Book a Test Ride
                  </span>
                  <span class="text-xs font-semibold text-seaglass">Free · 45 min</span>
                </div>

                <div class="space-y-1.5">
                  <span class="block text-xs font-semibold text-slate-700">Preferred Model</span>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      (click)="bookingModel.set('air')"
                      class="px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-colors cursor-pointer"
                      [class]="
                        bookingModel() === 'air'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-mineral'
                      "
                    >
                      Zoe Air 01
                    </button>
                    <button
                      type="button"
                      (click)="bookingModel.set('flow')"
                      class="px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-colors cursor-pointer"
                      [class]="
                        bookingModel() === 'flow'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-mineral'
                      "
                    >
                      Zoe Flow Wave
                    </button>
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="home-city-input" class="block text-xs font-semibold text-slate-700">
                    Your City or Postal Code
                  </label>
                  <div class="relative">
                    <input
                      id="home-city-input"
                      formControlName="cityInput"
                      class="w-full px-3.5 py-2.5 pr-10 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="e.g. 75003 Paris or 11211 Brooklyn"
                      type="text"
                    />
                    <mat-icon
                      class="!text-[18px] !w-[18px] !h-[18px] leading-none absolute right-3 top-2.5 text-slate-400"
                    >
                      location_on
                    </mat-icon>
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="home-email-input" class="block text-xs font-semibold text-slate-700">
                    Contact Email
                  </label>
                  <input
                    id="home-email-input"
                    formControlName="email"
                    class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    placeholder="name@domain.com"
                    type="email"
                  />
                </div>
              </div>

              @if (bookingConfirmed()) {
                <div
                  class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3"
                >
                  <div class="flex items-center gap-2 text-emerald-800 text-sm font-semibold">
                    <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                      check_circle
                    </mat-icon>
                    <span>Slot reserved at {{ selectedSalonCity() }}.</span>
                  </div>
                  <button
                    type="button"
                    (click)="bookingConfirmed.set(false)"
                    class="text-xs font-medium text-emerald-800 underline cursor-pointer"
                  >
                    Book another
                  </button>
                </div>
              } @else {
                <div class="space-y-2.5">
                  <button
                    type="submit"
                    class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  >
                    <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
                      calendar_today
                    </mat-icon>
                    <span>Plan a Test Ride</span>
                  </button>
                  <p class="text-xs text-center text-slate-500">
                    Includes complimentary sizing &amp; route demo at {{ selectedSalonCity() }}.
                  </p>
                </div>
              }
            </form>
          </div>

          <!-- 4-Column Confidence Strip -->
          <div class="pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="space-y-1">
              <h4 class="font-display text-sm font-semibold text-slate-900">5-Year Frame Warranty</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Aluminum-magnesium structural &amp; motor coverage
              </p>
            </div>
            <div class="space-y-1">
              <h4 class="font-display text-sm font-semibold text-slate-900">30-Day Home Trial</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Ride daily routes risk-free with free salon pickup
              </p>
            </div>
            <div class="space-y-1">
              <h4 class="font-display text-sm font-semibold text-slate-900">
                100% On-Device Privacy
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Local-first SQLite telemetry with zero server tracking
              </p>
            </div>
            <div class="space-y-1">
              <h4 class="font-display text-sm font-semibold text-slate-900">Concierge Mechanics</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Gates Carbon belt drives &amp; city salon tune-ups
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- COMPARE DIMENSIONS & SPEC MODAL -->
      @if (showCompareModal()) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close comparison"
            (click)="showCompareModal.set(false)"
            class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 max-w-2xl w-full space-y-5"
          >
            <button
              type="button"
              aria-label="Close comparison"
              (click)="showCompareModal.set(false)"
              class="absolute top-6 right-6 w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <mat-icon class="!text-[20px] !w-[20px] !h-[20px] leading-none">close</mat-icon>
            </button>

            <div>
              <p class="text-xs font-medium text-emerald-700">Side-by-Side Geometry</p>
              <h3 class="font-display text-2xl font-bold text-slate-900 mt-1">
                Zoe Air 01 vs. Zoe Flow Wave
              </h3>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-xs font-semibold text-slate-500">
                    <th class="py-3 pr-4">Specification</th>
                    <th class="py-3 px-4 text-emerald-700">Zoe Air 01</th>
                    <th class="py-3 pl-4 text-ocean">Zoe Flow Wave</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 tabular-nums text-slate-700">
                  <tr>
                    <td class="py-3 pr-4 text-slate-500">Frame Geometry</td>
                    <td class="py-3 px-4 font-medium text-slate-900">Diamond Minimalist</td>
                    <td class="py-3 pl-4 font-medium text-slate-900">Deep Wave Low-Step</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-slate-500">Standover Clearance</td>
                    <td class="py-3 px-4 font-medium text-slate-900">46 cm</td>
                    <td class="py-3 pl-4 font-medium text-slate-900">39 cm</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-slate-500">Complete Weight</td>
                    <td class="py-3 px-4 font-medium text-slate-900">13.9 – 14.2 kg</td>
                    <td class="py-3 pl-4 font-medium text-slate-900">14.6 – 15.5 kg</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-slate-500">Max Range</td>
                    <td class="py-3 px-4 font-medium text-slate-900">65 – 85 km</td>
                    <td class="py-3 pl-4 font-medium text-slate-900">80 – 85 km</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-slate-500">Drivetrain</td>
                    <td class="py-3 px-4 font-medium text-slate-900">Gates Carbon Belt</td>
                    <td class="py-3 pl-4 font-medium text-slate-900">Gates Carbon Belt</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button
                type="button"
                (click)="showCompareModal.set(false)"
                class="px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold hover:bg-mineral cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                (click)="showCompareModal.set(false); configureModel('flow', selectedFlowSwatch())"
                class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold cursor-pointer"
              >
                Open Full Customizer
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class Home {
  readonly state = inject(ZoeState);
  private readonly router = inject(Router);
  readonly images = ZOE_IMAGES;
  readonly softwareSuite = SOFTWARE_SUITE;
  readonly activeAppIndex = signal(0);
  readonly activeApp = computed(() => this.softwareSuite[this.activeAppIndex()]);

  readonly benefitFilter = signal<'all' | 'rider' | 'planet'>('all');
  readonly filteredBenefits = computed(() => {
    const mode = this.benefitFilter();
    const all = [...RIDER_BENEFITS, ...PLANET_BENEFITS];
    return mode === 'all' ? all : all.filter((b) => b.audience === mode);
  });

  readonly dailyKm = signal(10);
  readonly co2SavedKgYear = computed(() => Math.round(this.dailyKm() * 240 * 0.21));
  readonly moneySavedYear = computed(() => Math.round(this.dailyKm() * 240 * 0.45));
  readonly caloriesPerWeek = computed(() => Math.round(this.dailyKm() * 5 * 32));
  readonly activeMinsWeek = computed(() => Math.round(this.dailyKm() * 5 * 3));

  onSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = Number(target.value);
    if (!Number.isNaN(val)) {
      this.dailyKm.set(val);
    }
  }

  readonly airSwatches = [
    {name: 'Canopy Emerald', hex: '#059669'},
    {name: 'Deep Ocean', hex: '#0B4F78'},
    {name: 'Pearl White', hex: '#FAF9F6'},
  ];

  readonly flowSwatches = [
    {name: 'Sea-Glass', hex: '#1C6E63'},
    {name: 'Mineral Slate', hex: '#EEF2F4'},
    {name: 'Midnight Slate', hex: '#0F172A'},
  ];

  readonly selectedAirSwatch = signal('Canopy Emerald');
  readonly selectedFlowSwatch = signal('Sea-Glass');

  readonly salonCities = [
    'Paris (Marais)',
    'London (Soho)',
    'Berlin (Mitte)',
    'Amsterdam',
    'Brooklyn, NY',
  ];
  readonly selectedSalonCity = signal('Paris (Marais)');
  readonly bookingModel = signal<BikeModelKey>('flow');
  readonly bookingConfirmed = signal(false);
  readonly showCompareModal = signal(false);

  readonly bookingForm = new FormGroup({
    cityInput: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  configureModel(model: BikeModelKey, colorName: string): void {
    this.state.preferredModel.set(model);
    this.state.preferredColor.set(colorName);
    this.router.navigateByUrl('/bikes');
  }

  submitTestRide(): void {
    if (this.bookingForm.invalid) {
      this.state.showToast('Please enter your city/postal code and a valid email.');
      return;
    }
    const {cityInput, email} = this.bookingForm.getRawValue();
    this.state.addTestRideBooking({
      salonCity: this.selectedSalonCity(),
      modelName: BIKE_MODELS[this.bookingModel()].name,
      locationInput: cityInput ?? '',
      email: email ?? '',
    });
    this.bookingConfirmed.set(true);
    setTimeout(() => {
      this.bookingForm.reset();
    }, 800);
  }
}
