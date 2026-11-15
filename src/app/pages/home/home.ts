import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {BIKE_MODELS, BikeModelKey, ZOE_IMAGES} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="flex flex-col w-full">
      <!-- HERO SHOWCASE SECTION -->
      <section
        class="relative w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-6 lg:py-14 overflow-hidden"
      >
        <div
          class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-primary-fixed-dim/30 blur-3xl pointer-events-none"
        ></div>
        <div
          class="absolute top-1/2 -left-28 w-80 h-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"
        ></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <!-- Left Column: Editorial Manifesto & CTAs -->
          <div class="lg:col-span-6 flex flex-col items-start z-10">
            <div
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/50 text-on-secondary-fixed-variant mb-5 shadow-sm"
            >
              <span class="w-2 h-2 rounded-full bg-secondary"></span>
              <span class="text-label-sm uppercase tracking-wider">
                Spring 2025 Edition · Featherweight E-Bikes
              </span>
            </div>

            <h1 class="text-headline-xl text-on-surface tracking-tight mb-5">
              Effortless Motion.<br />
              <span class="text-primary italic font-normal">Tailored for You.</span>
            </h1>

            <p class="text-body-lg text-on-surface-variant max-w-lg mb-8">
              Sculpted for poise, intuitive lightness, and joyful urban rhythm. An electric
              companion designed from the frame up for women—carrying up metro stairs with a single
              hand, gliding with whisper-quiet grace.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <a
                routerLink="/bikes"
                class="px-8 py-3.5 rounded-full bg-primary text-on-primary text-label-lg shadow-md hover:bg-primary-container transition-all active:scale-[0.98] inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore Bikes</span>
                <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
              </a>
              <button
                type="button"
                (click)="state.openTestRideModal('flow')"
                class="px-7 py-3.5 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface text-label-lg hover:bg-surface-container-highest transition-all active:scale-[0.98] inline-flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
              >
                <mat-icon class="material-symbols-outlined text-[18px]">calendar_today</mat-icon>
                <span>Book a Free Test Ride</span>
              </button>
            </div>

            <!-- Metric Badges Row -->
            <div class="grid grid-cols-3 gap-3 w-full max-w-md pt-1">
              <div class="p-3.5 rounded-2xl bg-surface-container-low flex flex-col">
                <span class="text-headline-sm font-semibold text-primary tabular-nums">
                  14.2 kg
                </span>
                <span class="text-label-sm text-on-surface-variant mt-1">Featherweight</span>
              </div>
              <div class="p-3.5 rounded-2xl bg-surface-container-low flex flex-col">
                <span class="text-headline-sm font-semibold text-secondary tabular-nums">
                  75 km
                </span>
                <span class="text-label-sm text-on-surface-variant mt-1">Range per charge</span>
              </div>
              <div class="p-3.5 rounded-2xl bg-surface-container-low flex flex-col">
                <span class="text-headline-sm font-semibold text-tertiary">GPS 4G</span>
                <span class="text-label-sm text-on-surface-variant mt-1">Anti-Theft Radar</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Hero Visual Studio Layout -->
          <div class="lg:col-span-6 relative flex justify-center items-center">
            <div
              class="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] bg-gradient-to-tr from-surface-container-high via-secondary-container/20 to-primary-fixed/30 p-5 sm:p-8 flex items-center justify-center shadow-xl"
            >
              <div
                class="absolute w-72 h-72 rounded-full bg-surface-container-lowest/70 backdrop-blur-2xl shadow-inner"
              ></div>

              <img
                class="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(44,53,49,0.12)]"
                alt="Minimalist luxury Zoe electric bicycle in soft terracotta and brushed aluminum finish"
                [src]="images.heroBike"
                referrerpolicy="no-referrer"
              />

              <!-- Floating Spec 1 -->
              <div
                class="absolute top-6 left-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md"
              >
                <mat-icon class="material-symbols-outlined text-secondary text-[18px]">scale</mat-icon>
                <span class="text-label-md text-on-surface font-medium">
                  14.2 kg · 1-Hand Carry
                </span>
              </div>

              <!-- Floating Spec 2 -->
              <div
                class="absolute bottom-8 right-6 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-lg"
              >
                <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <div class="flex flex-col">
                  <span class="text-label-sm text-on-surface font-semibold">
                    TorqueSense™ Assist
                  </span>
                  <span class="text-label-sm text-on-surface-variant text-[10px]">
                    Zero jerk natural cadence
                  </span>
                </div>
              </div>

              <!-- Floating Spec 3 -->
              <div
                class="absolute -bottom-3 left-12 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-fixed/90 text-on-tertiary-fixed text-label-sm shadow-md"
              >
                <mat-icon class="material-symbols-outlined text-[16px]">lock_reset</mat-icon>
                <span>Always Connected GPS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PRESS ACCREDITATION STRIP -->
      <section class="w-full bg-surface-container-low/60 py-5">
        <div
          class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <span
            class="text-label-sm text-on-surface-variant uppercase tracking-widest whitespace-nowrap"
          >
            Acclaimed by Modern Culture
          </span>
          <div class="grid grid-cols-3 gap-6 sm:gap-12 w-full md:w-auto items-center opacity-80">
            <div class="flex items-center justify-center">
              <span class="text-headline-sm font-bold tracking-tight text-on-surface">VOGUE</span>
            </div>
            <div class="flex items-center justify-center">
              <span class="text-headline-sm font-semibold italic text-on-surface tracking-wider">
                ELLE
              </span>
            </div>
            <div class="flex items-center justify-center">
              <span class="text-headline-sm font-black tracking-widest text-on-surface uppercase">
                WIRED
              </span>
            </div>
          </div>
          <div class="hidden lg:block text-right">
            <p class="text-label-sm text-outline italic">
              “The most effortless luxury electric bicycle engineered for city rhythm.”
            </p>
          </div>
        </div>
      </section>

      <!-- FLAGSHIP MODELS SHOWCASE -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div class="max-w-xl">
            <div
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-label-sm uppercase tracking-wider mb-2"
            >
              The Two Icons
            </div>
            <h2 class="text-headline-lg text-on-surface tracking-tight">
              Pure Expression. Two Distinct Spirits.
            </h2>
            <p class="text-body-md text-on-surface-variant mt-2">
              Engineered around custom lightweight aluminum-magnesium frames with integrated battery
              geometry and silent Gates Carbon belt drives.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              (click)="showCompareModal.set(true)"
              class="px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface text-label-md hover:bg-surface-container-highest transition-all whitespace-nowrap cursor-pointer"
            >
              Compare Dimensions &amp; Spec
            </button>
          </div>
        </div>

        <!-- Models Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Card 1: Zoe Air 01 -->
          <div
            class="group rounded-[2rem] bg-surface-container-low p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              <div class="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span
                    class="inline-block px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-fixed-variant text-label-sm mb-2"
                  >
                    Ultra-Light Agility
                  </span>
                  <h3 class="text-headline-md text-on-surface">Zoe Air 01</h3>
                  <p class="text-body-sm text-on-surface-variant mt-1">
                    The city rocket. Precision diamond frame sculpted for nimble acceleration
                    through rush-hour boulevards.
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-headline-sm font-semibold text-on-surface tabular-nums">
                    $2,450
                  </span>
                  <span class="block text-label-sm text-outline tabular-nums">or $82/mo</span>
                </div>
              </div>

              <!-- Color Swatch Selector -->
              <div class="flex items-center gap-2.5 mb-5">
                <span class="text-label-sm text-on-surface-variant mr-1">Palettes:</span>
                @for (swatch of airSwatches; track swatch.name) {
                  <button
                    type="button"
                    [title]="swatch.name"
                    [attr.aria-label]="'Select ' + swatch.name + ' finish'"
                    (click)="selectedAirSwatch.set(swatch.name)"
                    class="w-6 h-6 rounded-full transition-transform cursor-pointer"
                    [style.background-color]="swatch.hex"
                    [class]="
                      selectedAirSwatch() === swatch.name
                        ? 'ring-2 ring-primary ring-offset-2 scale-110'
                        : 'hover:scale-110'
                    "
                  ></button>
                }
                <span class="text-label-sm text-on-surface-variant ml-1">
                  {{ selectedAirSwatch() }}
                </span>
              </div>

              <!-- Image Container -->
              <div
                class="relative w-full h-64 sm:h-72 rounded-2xl bg-surface-container-lowest/80 overflow-hidden flex items-center justify-center p-4"
              >
                <img
                  class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  alt="Zoe Air 01 lightweight electric commuter bike"
                  [src]="images.zoeAirHome"
                  referrerpolicy="no-referrer"
                />
                <div class="absolute bottom-3 left-4 flex gap-2">
                  <span
                    class="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm shadow-sm tabular-nums"
                  >
                    13.9 kg
                  </span>
                  <span
                    class="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm shadow-sm tabular-nums"
                  >
                    65 km
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                (click)="configureModel('air', 'Blush Terracotta')"
                class="text-label-lg text-primary hover:text-primary-container inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Configure Zoe Air</span>
                <mat-icon class="material-symbols-outlined text-[16px]">chevron_right</mat-icon>
              </button>
              <button
                type="button"
                (click)="state.toggleFavorite('air')"
                aria-label="Save Zoe Air 01 to favorites"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                [class]="
                  state.isFavorite('air')
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container hover:bg-primary-fixed text-on-surface'
                "
              >
                <mat-icon
                  class="material-symbols-outlined text-[18px]"
                  [class.icon-filled]="state.isFavorite('air')"
                >
                  favorite
                </mat-icon>
              </button>
            </div>
          </div>

          <!-- Card 2: Zoe Flow Wave -->
          <div
            class="group rounded-[2rem] bg-surface-container-low p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div>
              <div class="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span
                    class="inline-block px-3 py-1 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant text-label-sm mb-2"
                  >
                    Effortless Low Step
                  </span>
                  <h3 class="text-headline-md text-on-surface">Zoe Flow Wave</h3>
                  <p class="text-body-sm text-on-surface-variant mt-1">
                    The graceful cruiser. Low-swoop frame accommodating long coats, skirts, and
                    relaxed upright posture.
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-headline-sm font-semibold text-on-surface tabular-nums">
                    $2,680
                  </span>
                  <span class="block text-label-sm text-outline tabular-nums">or $89/mo</span>
                </div>
              </div>

              <!-- Color Swatch Selector -->
              <div class="flex items-center gap-2.5 mb-5">
                <span class="text-label-sm text-on-surface-variant mr-1">Palettes:</span>
                @for (swatch of flowSwatches; track swatch.name) {
                  <button
                    type="button"
                    [title]="swatch.name"
                    [attr.aria-label]="'Select ' + swatch.name + ' finish'"
                    (click)="selectedFlowSwatch.set(swatch.name)"
                    class="w-6 h-6 rounded-full transition-transform cursor-pointer"
                    [style.background-color]="swatch.hex"
                    [class]="
                      selectedFlowSwatch() === swatch.name
                        ? 'ring-2 ring-primary ring-offset-2 scale-110'
                        : 'hover:scale-110'
                    "
                  ></button>
                }
                <span class="text-label-sm text-on-surface-variant ml-1">
                  {{ selectedFlowSwatch() }}
                </span>
              </div>

              <!-- Image Container -->
              <div
                class="relative w-full h-64 sm:h-72 rounded-2xl bg-surface-container-lowest/80 overflow-hidden flex items-center justify-center p-4"
              >
                <img
                  class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  alt="Zoe Flow Wave low step-through electric commuter bike"
                  [src]="images.zoeFlowHome"
                  referrerpolicy="no-referrer"
                />
                <div class="absolute bottom-3 left-4 flex gap-2">
                  <span
                    class="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm shadow-sm tabular-nums"
                  >
                    14.6 kg
                  </span>
                  <span
                    class="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-on-surface text-label-sm shadow-sm tabular-nums"
                  >
                    80 km
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                (click)="configureModel('flow', 'Lilac Haze')"
                class="text-label-lg text-primary hover:text-primary-container inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Configure Zoe Flow</span>
                <mat-icon class="material-symbols-outlined text-[16px]">chevron_right</mat-icon>
              </button>
              <button
                type="button"
                (click)="state.toggleFavorite('flow')"
                aria-label="Save Zoe Flow Wave to favorites"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                [class]="
                  state.isFavorite('flow')
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container hover:bg-primary-fixed text-on-surface'
                "
              >
                <mat-icon
                  class="material-symbols-outlined text-[18px]"
                  [class.icon-filled]="state.isFavorite('flow')"
                >
                  favorite
                </mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ERGONOMICS SECTION -->
      <section class="w-full bg-surface-container-low/40 py-14">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-tertiary-fixed/50 text-on-tertiary-fixed-variant text-label-sm uppercase tracking-wider mb-2"
            >
              Anatomical Craft
            </span>
            <h2 class="text-headline-lg text-on-surface tracking-tight">
              Form Follows Her Movement
            </h2>
            <p class="text-body-md text-on-surface-variant mt-2">
              Most electric bikes are heavy, modified men’s downhill platforms. Zoe was born from
              over 4,000 ergonomic body-scans of female riders to engineer true comfort without
              compromise.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="p-8 rounded-[2rem] bg-surface-container-lowest shadow-md flex flex-col justify-between"
            >
              <div>
                <div
                  class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-5"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">height</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface mb-2">
                  Ultra-Low Standover Clearance
                </h3>
                <p class="text-body-sm text-on-surface-variant mb-5">
                  Step on and off in any outfit—trench coats, pencil skirts, or dresses. The bottom
                  bracket clearance sits 18% lower than standard unisex commuters.
                </p>
              </div>
              <div class="pt-3 flex items-center justify-between text-label-sm text-secondary">
                <span>Standover: 39 cm</span>
                <mat-icon class="material-symbols-outlined text-[18px]">check_circle</mat-icon>
              </div>
            </div>

            <div
              class="p-8 rounded-[2rem] bg-surface-container-lowest shadow-md flex flex-col justify-between"
            >
              <div>
                <div
                  class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary mb-5"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">pan_tool</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface mb-2">Custom Grip &amp; Narrow Reach</h3>
                <p class="text-body-sm text-on-surface-variant mb-5">
                  Tapered brake levers adjusted for smaller hand spans. Handlebars are 40mm narrower
                  to eliminate shoulder pinch during extended city navigation.
                </p>
              </div>
              <div class="pt-3 flex items-center justify-between text-label-sm text-secondary">
                <span>Reach Span: 68 mm reach</span>
                <mat-icon class="material-symbols-outlined text-[18px]">check_circle</mat-icon>
              </div>
            </div>

            <div
              class="p-8 rounded-[2rem] bg-surface-container-lowest shadow-md flex flex-col justify-between"
            >
              <div>
                <div
                  class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-5"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">flight_takeoff</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface mb-2">
                  Balanced 50/50 Portage Weight
                </h3>
                <p class="text-body-sm text-on-surface-variant mb-5">
                  Sub-15kg total weight with battery centered directly over the bottom axle. Pick up
                  the bike by the top tube with a single arm to effortlessly glide up subway steps.
                </p>
              </div>
              <div class="pt-3 flex items-center justify-between text-label-sm text-secondary">
                <span>Weight: 14.2 kg complete</span>
                <mat-icon class="material-symbols-outlined text-[18px]">check_circle</mat-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LIFESTYLE & MOSAIC FREEDOM SECTION -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <!-- Left Photo Mosaic -->
          <div class="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
            <div class="space-y-4 sm:space-y-5">
              <div class="rounded-[2rem] overflow-hidden shadow-lg h-64 sm:h-80 relative group">
                <img
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Woman riding soft sage green Zoe e-bike past a Parisian stone cafe facade"
                  [src]="images.lifestyleParis"
                  referrerpolicy="no-referrer"
                />
                <div
                  class="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm text-on-surface"
                >
                  Rue de Bretagne, Paris
                </div>
              </div>
              <div class="rounded-[2rem] bg-surface-container p-5 flex flex-col justify-center">
                <span class="text-headline-sm font-semibold text-primary mb-1">2.5 Hours</span>
                <span class="text-body-sm text-on-surface-variant">
                  Full rapid charge using compact lipstick-sized brick adapter.
                </span>
              </div>
            </div>

            <div class="space-y-4 sm:space-y-5 sm:-mt-10">
              <div class="rounded-[2rem] bg-primary-fixed/40 p-5 flex flex-col justify-center">
                <div class="flex items-center gap-1 text-primary mb-2">
                  @for (star of [1, 2, 3, 4, 5]; track star) {
                    <mat-icon class="material-symbols-outlined icon-filled text-[20px]">
                      star
                    </mat-icon>
                  }
                </div>
                <p class="text-body-sm text-on-surface italic">
                  "I finally stopped taking cabs to meetings. It feels like wearing sneakers that
                  fly."
                </p>
                <span class="text-label-sm text-on-surface-variant mt-2 font-medium">
                  — Camille L., Architect
                </span>
              </div>
              <div class="rounded-[2rem] overflow-hidden shadow-lg h-72 sm:h-96 relative group">
                <img
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Close up of hands holding polished Zoe commuter handlebars near flower market"
                  [src]="images.lifestyleHandlebars"
                  referrerpolicy="no-referrer"
                />
                <div
                  class="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm text-secondary font-medium"
                >
                  Zero Maintenance Belt
                </div>
              </div>
            </div>
          </div>

          <!-- Right Narrative & Live Battery Widget -->
          <div class="lg:col-span-5 flex flex-col items-start lg:pl-5">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-fixed-variant text-label-sm uppercase tracking-wider mb-2"
            >
              Daily Liberation
            </span>
            <h2 class="text-headline-lg text-on-surface tracking-tight mb-3">
              Reclaim Your Morning Sanctuary
            </h2>
            <p class="text-body-md text-on-surface-variant mb-5">
              Say goodbye to delayed metro trains and sweaty hill climbs. Zoe’s silent hub engine
              produces a natural rush of confidence—accelerating smoothly the instant your foot
              touches the pedal.
            </p>

            <!-- Battery Widget Card -->
            <div
              class="w-full p-5 rounded-[2rem] bg-surface-container-low shadow-sm flex flex-col gap-3 mb-6"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <mat-icon class="material-symbols-outlined text-secondary text-[22px]">
                    battery_charging_full
                  </mat-icon>
                  <span class="text-label-lg text-on-surface">Integrated Smart Cell</span>
                </div>
                <span class="text-label-md text-secondary font-bold tabular-nums">
                  100% (78 km est.)
                </span>
              </div>
              <div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                <div class="bg-secondary h-full rounded-full w-[85%]"></div>
              </div>
              <div class="flex items-center justify-between text-label-sm text-on-surface-variant">
                <span>Removable with magnetic key</span>
                <span>2.8 kg lightweight cell</span>
              </div>
            </div>

            <a
              routerLink="/club"
              class="px-6 py-3 rounded-full bg-surface-container-high text-on-surface text-label-lg hover:bg-surface-container-highest transition-colors inline-flex items-center gap-2"
            >
              <span>Read Rider Stories</span>
              <mat-icon class="material-symbols-outlined text-[16px]">menu_book</mat-icon>
            </a>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE TEST RIDE BOOKING BANNER -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div
          class="relative rounded-[2.5rem] bg-gradient-to-br from-surface-container-high via-surface-container to-primary-fixed/20 p-6 sm:p-12 overflow-hidden shadow-lg"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <!-- Content -->
            <div class="lg:col-span-7">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-primary text-label-sm uppercase tracking-wider mb-3 shadow-sm"
              >
                Experience the Magic
              </span>
              <h2 class="text-headline-lg text-on-surface tracking-tight mb-3">
                Feel the Weightlessness in Person.
              </h2>
              <p class="text-body-md text-on-surface-variant max-w-lg mb-6">
                Schedule a complimentary 45-minute private test ride at our boutique salons or
                request a concierge doorstep delivery in select metropolitan areas.
              </p>

              <!-- City Salons Chips -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-label-sm text-on-surface-variant mr-2">Salons:</span>
                @for (city of salonCities; track city) {
                  <button
                    type="button"
                    (click)="selectedSalonCity.set(city)"
                    class="px-3.5 py-1.5 rounded-full text-label-sm shadow-sm transition-all cursor-pointer"
                    [class]="
                      selectedSalonCity() === city
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary'
                    "
                  >
                    {{ city }}
                  </button>
                }
              </div>
            </div>

            <!-- Booking Widget Form Card -->
            <form
              [formGroup]="bookingForm"
              (ngSubmit)="submitTestRide()"
              class="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-7 rounded-[2rem] shadow-xl flex flex-col gap-4"
            >
              <div class="flex items-center justify-between pb-1">
                <span class="text-headline-sm font-semibold text-on-surface">Book Session</span>
                <span class="text-label-sm text-secondary font-medium">
                  Free · No commitment
                </span>
              </div>

              <div class="space-y-1.5">
                <span class="block text-label-sm text-on-surface-variant">
                  Select Preferred Model
                </span>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    (click)="bookingModel.set('air')"
                    class="px-3 py-2.5 rounded-xl text-label-md text-center transition-colors cursor-pointer"
                    [class]="
                      bookingModel() === 'air'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    "
                  >
                    Zoe Air 01
                  </button>
                  <button
                    type="button"
                    (click)="bookingModel.set('flow')"
                    class="px-3 py-2.5 rounded-xl text-label-md text-center transition-colors cursor-pointer"
                    [class]="
                      bookingModel() === 'flow'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    "
                  >
                    Zoe Flow Wave
                  </button>
                </div>
              </div>

              <div class="space-y-1.5">
                <label for="home-city-input" class="block text-label-sm text-on-surface-variant">
                  Your City or Postal Code
                </label>
                <div class="relative">
                  <input
                    id="home-city-input"
                    formControlName="cityInput"
                    class="w-full px-4 py-2.5 pr-10 rounded-xl bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="e.g. 75003 Paris or E1 6AN London"
                    type="text"
                  />
                  <mat-icon
                    class="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant text-[20px]"
                  >
                    location_on
                  </mat-icon>
                </div>
              </div>

              <div class="space-y-1.5">
                <label for="home-email-input" class="block text-label-sm text-on-surface-variant">
                  Contact Email
                </label>
                <input
                  id="home-email-input"
                  formControlName="email"
                  class="w-full px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="name@domain.com"
                  type="email"
                />
              </div>

              <button
                type="submit"
                class="w-full mt-1 py-3.5 rounded-full text-label-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                [class]="
                  bookingConfirmed()
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                "
              >
                @if (bookingConfirmed()) {
                  <mat-icon class="material-symbols-outlined text-[18px]">done</mat-icon>
                  <span>Slot Reserved! Check Inbox.</span>
                } @else {
                  <span>Reserve VIP Test Ride</span>
                }
              </button>

              <p class="text-label-sm text-center text-on-surface-variant text-[11px]">
                Includes complimentary helmet fitting and custom espresso tasting at our salon.
              </p>
            </form>
          </div>
        </div>
      </section>

      <!-- CONFIDENCE & SUSTAINABILITY ACCENTS -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-8 mb-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary shrink-0"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">shield</mat-icon>
            </div>
            <div>
              <h4 class="text-label-lg text-on-surface">5-Year Warranty</h4>
              <p class="text-body-sm text-on-surface-variant text-[12px]">
                Frame &amp; motor protection
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary shrink-0"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">replay_30</mat-icon>
            </div>
            <div>
              <h4 class="text-label-lg text-on-surface">30-Day Home Trial</h4>
              <p class="text-body-sm text-on-surface-variant text-[12px]">Love it or free pickup</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary shrink-0"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">local_shipping</mat-icon>
            </div>
            <div>
              <h4 class="text-label-lg text-on-surface">Assembled Delivery</h4>
              <p class="text-body-sm text-on-surface-variant text-[12px]">100% ready to ride box</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary shrink-0"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">handshake</mat-icon>
            </div>
            <div>
              <h4 class="text-label-lg text-on-surface">Concierge Service</h4>
              <p class="text-body-sm text-on-surface-variant text-[12px]">
                On-demand city mechanics
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
            class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-5"
          >
            <button
              type="button"
              aria-label="Close comparison"
              (click)="showCompareModal.set(false)"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>

            <div>
              <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                Side-by-Side Geometry
              </span>
              <h3 class="text-headline-md text-on-surface font-semibold mt-1">
                Zoe Air 01 vs. Zoe Flow Wave
              </h3>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-body-sm">
                <thead>
                  <tr class="border-b border-surface-container text-label-md text-on-surface-variant">
                    <th class="py-3 pr-4">Specification</th>
                    <th class="py-3 px-4 text-primary font-semibold">Zoe Air 01</th>
                    <th class="py-3 pl-4 text-secondary font-semibold">Zoe Flow Wave</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-container tabular-nums">
                  <tr>
                    <td class="py-3 pr-4 text-on-surface-variant">Frame Geometry</td>
                    <td class="py-3 px-4 font-medium">Diamond Minimalist</td>
                    <td class="py-3 pl-4 font-medium">Deep Wave Low-Step</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-on-surface-variant">Standover Clearance</td>
                    <td class="py-3 px-4 font-medium">46 cm</td>
                    <td class="py-3 pl-4 font-medium">39 cm</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-on-surface-variant">Complete Weight</td>
                    <td class="py-3 px-4 font-medium">13.9 – 14.2 kg</td>
                    <td class="py-3 pl-4 font-medium">14.6 – 15.5 kg</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-on-surface-variant">Max Range</td>
                    <td class="py-3 px-4 font-medium">65 – 85 km</td>
                    <td class="py-3 pl-4 font-medium">80 – 85 km</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 text-on-surface-variant">Drivetrain</td>
                    <td class="py-3 px-4 font-medium">Gates Carbon Belt</td>
                    <td class="py-3 pl-4 font-medium">Gates Carbon Belt</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <button
                type="button"
                (click)="showCompareModal.set(false)"
                class="px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface text-label-md cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                (click)="showCompareModal.set(false); configureModel('flow', 'Lilac Haze')"
                class="px-6 py-2.5 rounded-full bg-primary text-on-primary text-label-md cursor-pointer"
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

  readonly airSwatches = [
    {name: 'Rose Quartz', hex: '#E5B8A8'},
    {name: 'Mint Sage', hex: '#B2CCC7'},
    {name: 'Raw Linen', hex: '#E2DED9'},
  ];

  readonly flowSwatches = [
    {name: 'Lavender Mist', hex: '#D7C9E3'},
    {name: 'Champagne Cream', hex: '#EADCC8'},
    {name: 'Velvet Obsidian', hex: '#1C1C1A'},
  ];

  readonly selectedAirSwatch = signal('Rose Quartz');
  readonly selectedFlowSwatch = signal('Lavender Mist');

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
