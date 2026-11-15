import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {
  ADDON_OPTIONS,
  BIKE_MODELS,
  BikeModelKey,
  COLOR_OPTIONS,
  ColorOption,
  FRAME_SIZES,
  ZOE_IMAGES,
} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

interface HotspotDetail {
  id: 'battery' | 'belt' | 'cockpit' | 'brakes';
  title: string;
  shortTitle: string;
  shortDesc: string;
  desc: string;
  icon: string;
  topClass: string;
  leftClass: string;
  badgeColorClass: string;
  textAccentClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bikes',
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="flex flex-col w-full pb-14">
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8">
        <!-- Section 1: Model Selector Bar -->
        <div
          class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 p-2 rounded-3xl md:rounded-full bg-surface-container-low mb-8"
        >
          @for (key of modelOrder; track key) {
            @let m = models[key];
            <button
              type="button"
              (click)="selectModel(key)"
              class="flex-1 py-3.5 px-5 rounded-2xl md:rounded-full transition-all duration-300 flex items-center justify-between md:justify-center gap-3 cursor-pointer"
              [class]="
                selectedModel() === key
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              "
            >
              <div class="flex items-center gap-2.5">
                <mat-icon class="material-symbols-outlined text-[20px]">{{ m.icon }}</mat-icon>
                <div class="text-left">
                  <span class="text-label-lg block leading-none">{{ m.customizerTitle }}</span>
                  <span class="text-label-sm text-on-surface-variant hidden sm:inline">
                    {{ m.tagline }}
                  </span>
                </div>
              </div>
              <span
                class="px-2.5 py-0.5 rounded-full text-label-sm font-semibold tabular-nums"
                [class]="
                  selectedModel() === key
                    ? 'bg-primary-fixed/40 text-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                "
              >
                {{ m.weight }}
              </span>
            </button>
          }
        </div>

        <!-- Section 2: Main 2-Column Visual Configurator Studio -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <!-- LEFT COLUMN: Interactive Visual Stage (7 cols) -->
          <div class="lg:col-span-7 flex flex-col gap-5 lg:sticky lg:top-24">
            <!-- Visualizer Card Box -->
            <div
              class="relative w-full rounded-[2.5rem] bg-surface-container-low overflow-hidden shadow-md flex flex-col aspect-[4/3] md:aspect-[16/11]"
            >
              <!-- Dynamic Radial Gradient Backdrop -->
              <div
                class="absolute inset-0 transition-all duration-700 ease-out"
                [style.background]="
                  'radial-gradient(ellipse at center, ' +
                  selectedColor().gradientRgba +
                  ', #f6f3f0 68%, #f0edea 100%)'
                "
              ></div>

              <!-- Top Controls HUD -->
              <div class="relative z-10 w-full p-4 md:p-6 flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span
                    class="px-3 py-1.5 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5"
                  >
                    <mat-icon class="material-symbols-outlined text-[16px] text-primary">
                      view_in_ar
                    </mat-icon>
                    360° Studio View
                  </span>
                  <span
                    class="hidden sm:inline-block px-3 py-1.5 rounded-full bg-surface-container-lowest/65 backdrop-blur-md text-label-sm text-on-surface-variant"
                  >
                    Model: {{ currentModel().customizerTitle }}
                  </span>
                </div>

                <!-- Quick Tools -->
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    (click)="hotspotsVisible.set(!hotspotsVisible())"
                    title="Toggle Feature Annotations"
                    aria-label="Toggle feature annotations"
                    class="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                    [class]="hotspotsVisible() ? 'text-primary' : 'text-on-surface-variant'"
                  >
                    <mat-icon class="material-symbols-outlined text-[20px]">adjust</mat-icon>
                  </button>
                  <button
                    type="button"
                    (click)="cycleAngle()"
                    title="Rotate Bike View"
                    aria-label="Cycle bike angle"
                    class="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm hover:text-primary transition-colors cursor-pointer"
                  >
                    <mat-icon class="material-symbols-outlined text-[20px]">sync</mat-icon>
                  </button>
                  <button
                    type="button"
                    (click)="fullscreenOpen.set(true)"
                    title="Inspect Fullscreen"
                    aria-label="Inspect fullscreen"
                    class="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm hover:text-primary transition-colors cursor-pointer"
                  >
                    <mat-icon class="material-symbols-outlined text-[20px]">fullscreen</mat-icon>
                  </button>
                </div>
              </div>

              <!-- Central Bike Stage Display -->
              <div class="relative z-10 flex-1 flex items-center justify-center px-6 py-2 select-none">
                <div
                  class="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-on-surface/10 rounded-full blur-xl transform scale-y-50"
                ></div>

                <div
                  class="relative w-full max-w-[540px] flex items-center justify-center transition-transform duration-500"
                  [style.transform]="stageTransform()"
                >
                  <img
                    class="w-full h-auto max-h-[360px] object-contain drop-shadow-lg transition-all duration-500 ease-out"
                    [alt]="currentModel().name + ' in ' + selectedColor().name"
                    [src]="currentModel().image"
                    referrerpolicy="no-referrer"
                  />

                  @if (hotspotsVisible()) {
                    @for (spot of hotspots; track spot.id) {
                      <div
                        class="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20"
                        [class]="spot.topClass + ' ' + spot.leftClass"
                      >
                        <button
                          type="button"
                          (click)="activeHotspot.set(spot)"
                          [aria-label]="spot.title"
                          class="relative w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                          [class]="spot.badgeColorClass"
                        >
                          <mat-icon class="material-symbols-outlined text-[15px]">
                            {{ spot.icon }}
                          </mat-icon>
                        </button>
                        <div
                          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-48 p-2.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-xl text-left pointer-events-none z-30"
                        >
                          <p
                            class="text-label-md uppercase font-semibold"
                            [class]="spot.textAccentClass"
                          >
                            {{ spot.shortTitle }}
                          </p>
                          <p class="text-body-sm text-on-surface mt-0.5 leading-snug">
                            {{ spot.shortDesc }}
                          </p>
                        </div>
                      </div>
                    }
                  }
                </div>
              </div>

              <!-- Bottom Angle Selector Bar -->
              <div
                class="relative z-10 w-full px-6 py-4 flex items-center justify-between bg-surface-container/55 backdrop-blur-md"
              >
                <div class="flex items-center gap-2">
                  @for (angle of angles; track angle.value) {
                    <button
                      type="button"
                      (click)="selectedAngle.set(angle.value)"
                      class="px-3.5 py-1.5 rounded-full text-label-sm transition-colors cursor-pointer whitespace-nowrap"
                      [class]="
                        selectedAngle() === angle.value
                          ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      "
                    >
                      {{ angle.label }}
                    </button>
                  }
                </div>

                <div class="hidden sm:flex items-center gap-3 text-on-surface-variant text-label-sm">
                  <span class="flex items-center gap-1">
                    <mat-icon class="material-symbols-outlined text-[16px] text-secondary">
                      eco
                    </mat-icon>
                    Low Impact Alloy
                  </span>
                  <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span>Hand-finished in Florence</span>
                </div>
              </div>
            </div>

            <!-- Quick Telemetry HUD Card -->
            <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-surface-container-low">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-secondary-container/50 flex items-center justify-center text-on-secondary-fixed-variant shrink-0"
                >
                  <mat-icon class="material-symbols-outlined text-[20px]">speed</mat-icon>
                </div>
                <div>
                  <p class="text-label-sm text-on-surface-variant uppercase">Top Speed</p>
                  <p class="text-headline-sm text-on-surface font-semibold tabular-nums">
                    25 km/h
                    <span class="text-label-sm text-on-surface-variant font-normal">(EU)</span>
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0"
                >
                  <mat-icon class="material-symbols-outlined text-[20px]">
                    battery_charging_full
                  </mat-icon>
                </div>
                <div>
                  <p class="text-label-sm text-on-surface-variant uppercase">Full Recharge</p>
                  <p class="text-headline-sm text-on-surface font-semibold tabular-nums">
                    {{ currentModel().chargingTime.split(' ')[0] }} hrs
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-tertiary-fixed/60 flex items-center justify-center text-tertiary shrink-0"
                >
                  <mat-icon class="material-symbols-outlined text-[20px]">
                    nest_farsight_weather
                  </mat-icon>
                </div>
                <div>
                  <p class="text-label-sm text-on-surface-variant uppercase">Motor Torque</p>
                  <p class="text-headline-sm text-on-surface font-semibold tabular-nums">
                    {{ currentModel().torque }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Testimonial Editorial Snip -->
            <div class="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-start gap-4">
              <img
                class="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-primary-fixed"
                alt="Camille Laurent portrait"
                [src]="images.customizerTestimonialAvatar"
                referrerpolicy="no-referrer"
              />
              <div class="flex-1">
                <p class="text-body-sm text-on-surface italic">
                  “The Zoe Air has transformed my morning routine into something I genuinely look
                  forward to. Effortless over city bridges, whisper quiet, and visually sublime.”
                </p>
                <p class="text-label-sm text-on-surface-variant mt-1.5 font-medium">
                  — Camille Laurent, Architect &amp; Daily Commuter (Lyon)
                </p>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Bespoke Configurator Panel (5 cols) -->
          <div class="lg:col-span-5 flex flex-col gap-5">
            <div class="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-md space-y-6">
              <!-- Configurator Title & Live Price -->
              <div class="flex items-start justify-between gap-4 pb-1">
                <div>
                  <span class="text-label-sm text-primary uppercase font-bold tracking-wider">
                    Step-By-Step Specification
                  </span>
                  <h1 class="text-headline-md text-on-surface font-semibold mt-0.5">
                    {{ currentModel().customizerTitle }}
                  </h1>
                  <p class="text-body-sm text-on-surface-variant">
                    {{ currentModel().description }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-headline-md text-primary font-bold tabular-nums">
                    \${{ totalPrice().toLocaleString() }}
                  </p>
                  <p class="text-label-sm text-on-surface-variant tabular-nums">
                    or \${{ monthlyEstimate() }}/mo (24 mos)
                  </p>
                </div>
              </div>

              <!-- 1. Chassis Colorway -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-label-lg text-on-surface font-semibold">
                    1. Chassis Colorway
                  </span>
                  <span class="text-label-md text-primary font-medium">
                    {{ selectedColor().name }}
                  </span>
                </div>
                <div class="grid grid-cols-5 gap-2.5">
                  @for (color of colors; track color.name) {
                    <button
                      type="button"
                      (click)="selectedColor.set(color)"
                      class="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl transition-all cursor-pointer"
                      [class]="
                        selectedColor().name === color.name
                          ? 'ring-2 ring-primary bg-surface-container-low'
                          : 'hover:bg-surface-container-low'
                      "
                    >
                      <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                        [class]="color.swatchClass + ' ' + color.textClass"
                      >
                        @if (selectedColor().name === color.name) {
                          <mat-icon class="material-symbols-outlined text-[18px]">check</mat-icon>
                        }
                      </div>
                      <span class="text-label-sm text-[10px] text-on-surface truncate max-w-full">
                        {{ color.shortName }}
                      </span>
                    </button>
                  }
                </div>
              </div>

              <!-- 2. Ergonomic Frame Size -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-label-lg text-on-surface font-semibold">
                    2. Ergonomic Frame Size
                  </span>
                  <button
                    type="button"
                    (click)="fitGuideOpen.set(true)"
                    class="text-primary hover:underline text-label-sm flex items-center gap-1 cursor-pointer"
                  >
                    <mat-icon class="material-symbols-outlined text-[16px]">straighten</mat-icon>
                    Fitting Guide &amp; Geometry
                  </button>
                </div>
                <div class="grid grid-cols-3 gap-2.5">
                  @for (size of frameSizes; track size.code) {
                    <button
                      type="button"
                      (click)="selectedSize.set(size.code)"
                      class="p-3 rounded-2xl text-left transition-all flex flex-col justify-between cursor-pointer"
                      [class]="
                        selectedSize() === size.code
                          ? 'bg-primary-fixed/40 ring-2 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-container'
                      "
                    >
                      <div class="flex items-center justify-between w-full">
                        <span
                          class="text-headline-sm font-semibold"
                          [class]="
                            selectedSize() === size.code ? 'text-primary' : 'text-on-surface'
                          "
                        >
                          {{ size.code }}
                        </span>
                        <span
                          class="w-4 h-4 rounded-full flex items-center justify-center"
                          [class]="
                            selectedSize() === size.code
                              ? 'bg-primary text-on-primary'
                              : 'border-2 border-outline-variant'
                          "
                        >
                          @if (selectedSize() === size.code) {
                            <mat-icon class="material-symbols-outlined text-[12px]">check</mat-icon>
                          }
                        </span>
                      </div>
                      <div class="mt-2">
                        <p class="text-label-sm text-on-surface font-medium">{{ size.cmRange }}</p>
                        <p class="text-label-sm text-[11px] text-on-surface-variant">
                          {{ size.ftRange }}
                        </p>
                      </div>
                    </button>
                  }
                </div>
              </div>

              <!-- 3. Battery & Drivetrain Range -->
              <div class="space-y-3">
                <span class="text-label-lg text-on-surface font-semibold block">
                  3. Battery &amp; Drivetrain Range
                </span>
                <div class="space-y-2.5">
                  <button
                    type="button"
                    (click)="selectedBattery.set('standard')"
                    class="w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                    [class]="
                      selectedBattery() === 'standard'
                        ? 'bg-primary-fixed/30 ring-2 ring-primary'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    "
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs shrink-0"
                      >
                        <mat-icon class="material-symbols-outlined text-[20px]">
                          battery_4_bar
                        </mat-icon>
                      </div>
                      <div>
                        <p class="text-label-lg text-on-surface font-semibold">
                          Standard Urban Cruiser (50 km)
                        </p>
                        <p class="text-body-sm text-on-surface-variant">
                          250Wh Torpedo Pack · 1.9 kg light cell
                        </p>
                      </div>
                    </div>
                    <span class="text-label-md font-semibold text-on-surface shrink-0">
                      Included
                    </span>
                  </button>

                  <button
                    type="button"
                    (click)="selectedBattery.set('touring')"
                    class="w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                    [class]="
                      selectedBattery() === 'touring'
                        ? 'bg-primary-fixed/30 ring-2 ring-primary'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    "
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-xs shrink-0"
                      >
                        <mat-icon class="material-symbols-outlined text-[20px]">
                          battery_charging_full
                        </mat-icon>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <p class="text-label-lg text-on-surface font-semibold">
                            Extended Touring Range (85 km)
                          </p>
                          <span
                            class="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-fixed-variant text-[10px] font-bold"
                          >
                            Popular
                          </span>
                        </div>
                        <p class="text-body-sm text-on-surface-variant">
                          420Wh High-Density Pack · Fast 3.5A quick-brick
                        </p>
                      </div>
                    </div>
                    <span class="text-label-md font-semibold text-primary shrink-0 tabular-nums">
                      +$240
                    </span>
                  </button>
                </div>
              </div>

              <!-- 4. Curated Atelier Add-Ons -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-label-lg text-on-surface font-semibold">
                    4. Curated Atelier Add-Ons
                  </span>
                  <span class="text-label-sm text-on-surface-variant">
                    Selected:
                    <span class="font-semibold text-primary tabular-nums">
                      {{ selectedAddonKeys().length }}
                    </span>
                  </span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  @for (addon of addons; track addon.key) {
                    @let checked = selectedAddonKeys().includes(addon.key);
                    <button
                      type="button"
                      (click)="toggleAddon(addon.key)"
                      class="flex items-center gap-3 p-3 rounded-2xl text-left transition-colors cursor-pointer"
                      [class]="
                        checked
                          ? 'bg-primary-fixed/25 ring-1 ring-primary'
                          : 'bg-surface-container-low hover:bg-surface-container'
                      "
                    >
                      <span
                        class="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors"
                        [class]="
                          checked
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-lowest border border-outline-variant'
                        "
                      >
                        @if (checked) {
                          <mat-icon class="material-symbols-outlined text-[14px]">check</mat-icon>
                        }
                      </span>
                      <div class="flex-1 min-w-0">
                        <p class="text-label-sm font-semibold text-on-surface truncate">
                          {{ addon.name }}
                        </p>
                        <p class="text-[11px] text-on-surface-variant tabular-nums">
                          {{ addon.subtitle }} · +\${{ addon.price }}
                        </p>
                      </div>
                    </button>
                  }
                </div>
              </div>

              <!-- Checkout Block -->
              <div class="pt-2 space-y-3">
                <div
                  class="p-3.5 rounded-2xl bg-secondary-container/30 flex items-center justify-between text-on-secondary-fixed-variant"
                >
                  <div class="flex items-center gap-2">
                    <mat-icon class="material-symbols-outlined text-[18px]">local_shipping</mat-icon>
                    <span class="text-label-sm">
                      Estimated Delivery: <strong class="font-semibold">April 12 – 16</strong>
                    </span>
                  </div>
                  <span class="text-label-sm font-bold bg-secondary-container px-2.5 py-0.5 rounded-full">
                    Free Express
                  </span>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    (click)="reserveBuild()"
                    class="flex-1 h-14 rounded-full bg-primary text-on-primary hover:bg-primary-container text-label-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Reserve Your Zoe</span>
                    <mat-icon class="material-symbols-outlined text-[20px]">arrow_forward</mat-icon>
                  </button>
                  <button
                    type="button"
                    (click)="state.openTestRideModal(selectedModel())"
                    class="sm:w-auto px-6 h-14 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest text-label-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <mat-icon class="material-symbols-outlined text-[18px]">calendar_month</mat-icon>
                    <span>Test Ride</span>
                  </button>
                </div>

                <div
                  class="flex flex-wrap items-center justify-center gap-3 text-on-surface-variant text-[11px] pt-1"
                >
                  <span class="flex items-center gap-1">
                    <mat-icon class="material-symbols-outlined text-[14px] text-secondary">
                      verified_user
                    </mat-icon>
                    2-Year Warranty
                  </span>
                  <span>·</span>
                  <span class="flex items-center gap-1">
                    <mat-icon class="material-symbols-outlined text-[14px] text-secondary">
                      restart_alt
                    </mat-icon>
                    30-Day Return
                  </span>
                  <span>·</span>
                  <span class="flex items-center gap-1">
                    <mat-icon class="material-symbols-outlined text-[14px] text-secondary">
                      thumb_up
                    </mat-icon>
                    0% APR Financing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Detailed Lineup Specifications -->
        <div class="mt-16 pt-4">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span class="text-label-sm text-primary uppercase font-bold tracking-wider">
                Engineering &amp; Craft
              </span>
              <h2 class="text-headline-lg text-on-surface font-semibold mt-1">
                Detailed Lineup Specifications
              </h2>
              <p class="text-body-md text-on-surface-variant max-w-2xl">
                Compare architectural nuances across all three models to align with your
                metropolitan commute.
              </p>
            </div>
            <button
              type="button"
              (click)="comparisonExpanded.set(!comparisonExpanded())"
              class="px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest text-label-md flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer whitespace-nowrap"
            >
              <mat-icon class="material-symbols-outlined text-[18px]">
                {{ comparisonExpanded() ? 'unfold_less' : 'unfold_more' }}
              </mat-icon>
              <span>
                {{ comparisonExpanded() ? 'Collapse Extra Specs' : 'Expand Complete Comparison' }}
              </span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (key of modelOrder; track key) {
              @let spec = models[key];
              <div
                class="p-6 rounded-3xl bg-surface-container-lowest flex flex-col justify-between relative overflow-hidden hover:-translate-y-1 transition-transform"
                [class]="key === 'flow' ? 'shadow-md ring-2 ring-secondary' : 'shadow-sm'"
              >
                <div
                  class="absolute top-0 left-0 right-0 h-1.5"
                  [class]="
                    key === 'air'
                      ? 'bg-primary'
                      : key === 'flow'
                        ? 'bg-secondary'
                        : 'bg-tertiary'
                  "
                ></div>

                <div>
                  <div class="flex items-center justify-between mb-4 pt-1">
                    <span class="text-label-lg font-bold text-on-surface">{{ spec.name }}</span>
                    <span
                      class="px-2.5 py-1 rounded-full text-label-sm font-semibold"
                      [class]="
                        key === 'air'
                          ? 'bg-primary-fixed/50 text-primary'
                          : key === 'flow'
                            ? 'bg-secondary-container/50 text-secondary'
                            : 'bg-tertiary-fixed/60 text-tertiary'
                      "
                    >
                      {{ spec.badge }}
                    </span>
                  </div>
                  <p class="text-body-sm text-on-surface-variant mb-6">{{ spec.description }}</p>

                  <ul class="space-y-3 text-body-sm text-on-surface tabular-nums">
                    <li class="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span class="text-on-surface-variant">Weight</span>
                      <span class="font-semibold">{{ spec.weight }}</span>
                    </li>
                    <li class="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span class="text-on-surface-variant">Standard Range</span>
                      <span class="font-semibold">{{ spec.range }}</span>
                    </li>
                    <li class="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span class="text-on-surface-variant">Frame Type</span>
                      <span class="font-semibold">{{ spec.frameType }}</span>
                    </li>
                    <li class="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span class="text-on-surface-variant">Motor Drive</span>
                      <span class="font-semibold">{{ spec.motorDrive }}</span>
                    </li>
                    <li class="flex items-center justify-between py-1.5">
                      <span class="text-on-surface-variant">Belt / Carrier</span>
                      <span class="font-semibold">{{ spec.rearRack }}</span>
                    </li>

                    @if (comparisonExpanded()) {
                      <li
                        class="flex items-center justify-between py-1.5 border-t border-surface-container"
                      >
                        <span class="text-on-surface-variant">Standover Clearance</span>
                        <span class="font-semibold">{{ spec.standover }}</span>
                      </li>
                      <li
                        class="flex items-center justify-between py-1.5 border-t border-surface-container"
                      >
                        <span class="text-on-surface-variant">Wheelbase</span>
                        <span class="font-semibold">{{ spec.wheelbase }}</span>
                      </li>
                      <li
                        class="flex items-center justify-between py-1.5 border-t border-surface-container"
                      >
                        <span class="text-on-surface-variant">Braking System</span>
                        <span class="font-semibold">{{ spec.braking }}</span>
                      </li>
                      <li
                        class="flex items-center justify-between py-1.5 border-t border-surface-container"
                      >
                        <span class="text-on-surface-variant">Charging Time</span>
                        <span class="font-semibold">{{ spec.chargingTime }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <div class="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
                  <span
                    class="text-headline-sm font-bold tabular-nums"
                    [class]="
                      key === 'air'
                        ? 'text-primary'
                        : key === 'flow'
                          ? 'text-secondary'
                          : 'text-tertiary'
                    "
                  >
                    \${{ spec.basePrice.toLocaleString() }}
                  </span>
                  <button
                    type="button"
                    (click)="selectAndScrollTop(key)"
                    class="px-4 py-2 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-label-sm transition-colors cursor-pointer"
                  >
                    Select Model
                  </button>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Section 4: The 30-Day Zoe Salon Promise -->
        <div
          class="mt-14 p-8 md:p-12 rounded-3xl bg-surface-container-low shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div class="flex items-start gap-5">
            <div
              class="w-16 h-16 rounded-2xl bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0"
            >
              <mat-icon class="material-symbols-outlined text-[32px]">workspace_premium</mat-icon>
            </div>
            <div class="space-y-1">
              <h3 class="text-headline-md text-on-surface font-semibold">
                The 30-Day Zoe Salon Promise
              </h3>
              <p class="text-body-md text-on-surface-variant max-w-xl">
                Take your bespoke Zoe onto your familiar street corners, uphill bridges, and daily
                café spots. If it does not spark unreserved joy, we pick it up from your doorstep at
                zero cost for a full refund.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              (click)="state.openTestRideModal(selectedModel())"
              class="px-6 py-3.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container text-label-lg shadow-sm transition-all cursor-pointer"
            >
              Schedule Home Demo
            </button>
            <a
              routerLink="/tech"
              class="px-6 py-3.5 rounded-full bg-primary text-on-primary hover:bg-primary-container text-label-lg transition-all"
            >
              View Safety Lab Certs
            </a>
          </div>
        </div>
      </section>

      <!-- MODAL 1: Fit & Inseam Guide -->
      @if (fitGuideOpen()) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close fit guide"
            (click)="fitGuideOpen.set(false)"
            class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close fit guide"
              (click)="fitGuideOpen.set(false)"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>

            <div class="flex items-center gap-2 mb-2">
              <mat-icon class="material-symbols-outlined text-primary text-[24px]">straighten</mat-icon>
              <h3 class="text-headline-sm font-semibold text-on-surface">
                Fit &amp; Inseam Guide
              </h3>
            </div>
            <p class="text-body-sm text-on-surface-variant mb-6">
              Our frames feature an active ergonomic upright sweep that reduces neck stress and
              accommodates varying torso-to-leg proportions.
            </p>

            <div class="space-y-3">
              @for (size of frameSizes; track size.code) {
                <button
                  type="button"
                  (click)="selectedSize.set(size.code); fitGuideOpen.set(false)"
                  class="w-full text-left p-3.5 rounded-2xl flex justify-between items-center transition-colors cursor-pointer"
                  [class]="
                    size.recommended
                      ? 'bg-primary-fixed/30 ring-1 ring-primary'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  "
                >
                  <div>
                    <p
                      class="text-label-lg font-semibold"
                      [class]="size.recommended ? 'text-primary' : 'text-on-surface'"
                    >
                      {{ size.label }}{{ size.recommended ? ' — Recommended' : '' }}
                    </p>
                    <p class="text-label-sm text-on-surface-variant">
                      Rider Height: {{ size.cmRange }}
                    </p>
                  </div>
                  <span class="text-label-md text-primary font-semibold tabular-nums">
                    Inseam: {{ size.inseam }}
                  </span>
                </button>
              }
            </div>

            <div class="mt-6 pt-4">
              <button
                type="button"
                (click)="fitGuideOpen.set(false)"
                class="w-full py-3 rounded-full bg-primary text-on-primary text-label-lg cursor-pointer"
              >
                Got It, Return to Studio
              </button>
            </div>
          </div>
        </div>
      }

      <!-- MODAL 2: Hotspot Deep Dive -->
      @if (activeHotspot(); as spot) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close feature detail"
            (click)="activeHotspot.set(null)"
            class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close feature detail"
              (click)="activeHotspot.set(null)"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>

            <div
              class="w-12 h-12 rounded-2xl bg-primary-fixed/50 flex items-center justify-center text-primary mb-4"
            >
              <mat-icon class="material-symbols-outlined text-[24px]">{{ spot.icon }}</mat-icon>
            </div>
            <h3 class="text-headline-sm font-semibold text-on-surface">{{ spot.title }}</h3>
            <p class="text-body-md text-on-surface-variant mt-2 leading-relaxed">
              {{ spot.desc }}
            </p>
            <div class="mt-6 pt-4">
              <button
                type="button"
                (click)="activeHotspot.set(null)"
                class="w-full py-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest text-label-lg transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      }

      <!-- MODAL 3: Fullscreen Studio Inspection -->
      @if (fullscreenOpen()) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close fullscreen view"
            (click)="fullscreenOpen.set(false)"
            class="fixed inset-0 bg-on-background/70 backdrop-blur-md cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-[2.5rem] p-6 md:p-10 max-w-4xl w-full shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close fullscreen view"
              (click)="fullscreenOpen.set(false)"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>
            <div class="mb-4">
              <span class="text-label-sm text-primary uppercase font-bold tracking-wider">
                {{ selectedColor().name }} · Size {{ selectedSize() }}
              </span>
              <h3 class="text-headline-md text-on-surface font-semibold">
                {{ currentModel().customizerTitle }}
              </h3>
            </div>
            <div
              class="w-full h-[360px] sm:h-[460px] rounded-3xl bg-surface-container-low flex items-center justify-center p-6"
            >
              <img
                [src]="currentModel().image"
                [alt]="currentModel().name"
                class="w-full h-full object-contain"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class Bikes {
  readonly state = inject(ZoeState);

  readonly models = BIKE_MODELS;
  readonly modelOrder: BikeModelKey[] = ['air', 'flow', 'cargo'];
  readonly colors = COLOR_OPTIONS;
  readonly frameSizes = FRAME_SIZES;
  readonly addons = ADDON_OPTIONS;
  readonly images = ZOE_IMAGES;

  readonly selectedModel = signal<BikeModelKey>(this.state.preferredModel());
  readonly selectedColor = signal<ColorOption>(
    COLOR_OPTIONS.find((c) => c.name === this.state.preferredColor()) ?? COLOR_OPTIONS[0],
  );
  readonly selectedSize = signal<'S' | 'M' | 'L'>('M');
  readonly selectedBattery = signal<'standard' | 'touring'>('standard');
  readonly selectedAddonKeys = signal<('basket' | 'helmet' | 'lock' | 'bag')[]>([]);

  readonly hotspotsVisible = signal(true);
  readonly selectedAngle = signal<0 | 45 | 90>(0);
  readonly comparisonExpanded = signal(false);
  readonly fitGuideOpen = signal(false);
  readonly fullscreenOpen = signal(false);
  readonly activeHotspot = signal<HotspotDetail | null>(null);

  readonly angles: {label: string; value: 0 | 45 | 90}[] = [
    {label: 'Side Profile', value: 0},
    {label: '3/4 Front', value: 45},
    {label: 'Cockpit Detail', value: 90},
  ];

  readonly hotspots: HotspotDetail[] = [
    {
      id: 'battery',
      shortTitle: 'Integrated Battery',
      title: 'Removable Torpedo Battery',
      shortDesc: 'Samsung 36V Torpedo Cells. Unlock with key in 2 seconds.',
      desc: 'Form-integrated 36V automotive-grade cells discreetly housed within the down tube. Simply unlock with your personal Zoe encrypted key, slide out, and charge in any studio or coffee shop in 2.5 hours.',
      icon: 'bolt',
      topClass: 'top-[48%]',
      leftClass: 'left-[44%]',
      badgeColorClass: 'bg-primary text-on-primary',
      textAccentClass: 'text-primary',
    },
    {
      id: 'belt',
      shortTitle: 'Gates Carbon Belt',
      title: 'Quiet Carbon Belt Drive',
      shortDesc: 'Zero grease, zero rust, 30,000 km maintenance-free glide.',
      desc: 'Engineered with Gates Carbon-Drive polyurethane technology. Requires zero oily lubricants, keeps trousers immaculate, and operates in total acoustic whisper silence through rain or gravel.',
      icon: 'all_inclusive',
      topClass: 'top-[68%]',
      leftClass: 'left-[58%]',
      badgeColorClass: 'bg-secondary text-on-secondary',
      textAccentClass: 'text-secondary',
    },
    {
      id: 'cockpit',
      shortTitle: 'StVZO Halo Light',
      title: 'Smart Ring Bell & Headlight',
      shortDesc: '40 Lux ambient auto-dimming LED & concealed acoustic chime.',
      desc: 'Custom CNC-machined alloy bar featuring a 40 Lux StVZO compliant headlight synced with light sensors, along with an integrated subtle sonic alert bell that blends gracefully into the handgrip contour.',
      icon: 'lightbulb',
      topClass: 'top-[28%]',
      leftClass: 'left-[30%]',
      badgeColorClass: 'bg-tertiary text-on-tertiary',
      textAccentClass: 'text-tertiary',
    },
    {
      id: 'brakes',
      shortTitle: 'Shimano Hydraulic',
      title: 'Shimano Hydraulic Disc Brakes',
      shortDesc: 'Precision wet-weather calipers with instant motor cut-off.',
      desc: 'Engineered specifically for wet European cobblestones and sudden descents. Instant electric motor cutout engages the microsecond fingertips apply lever pressure.',
      icon: 'safety_check',
      topClass: 'top-[70%]',
      leftClass: 'left-[22%]',
      badgeColorClass: 'bg-on-surface text-surface',
      textAccentClass: 'text-on-surface',
    },
  ];

  readonly currentModel = computed(() => this.models[this.selectedModel()]);

  readonly stageTransform = computed(() => {
    const angle = this.selectedAngle();
    if (angle === 45) return 'scale(1.06) rotate(-1.5deg)';
    if (angle === 90) return 'scale(1.14) translateX(-18px)';
    return 'scale(1)';
  });

  readonly totalPrice = computed(() => {
    const base = this.currentModel().basePrice;
    const batteryAddon = this.selectedBattery() === 'touring' ? 240 : 0;
    const addonsTotal = this.selectedAddonKeys().reduce((sum, key) => {
      const found = this.addons.find((a) => a.key === key);
      return sum + (found?.price ?? 0);
    }, 0);
    return base + batteryAddon + addonsTotal;
  });

  readonly monthlyEstimate = computed(() => Math.round(this.totalPrice() / 24));

  selectModel(key: BikeModelKey): void {
    this.selectedModel.set(key);
    this.state.preferredModel.set(key);
  }

  selectAndScrollTop(key: BikeModelKey): void {
    this.selectModel(key);
    if (typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  cycleAngle(): void {
    const current = this.selectedAngle();
    this.selectedAngle.set(current === 0 ? 45 : current === 45 ? 90 : 0);
  }

  toggleAddon(key: 'basket' | 'helmet' | 'lock' | 'bag'): void {
    this.selectedAddonKeys.update((list) =>
      list.includes(key) ? list.filter((k) => k !== key) : [...list, key],
    );
  }

  reserveBuild(): void {
    const model = this.currentModel();
    const addonNames = this.selectedAddonKeys()
      .map((k) => this.addons.find((a) => a.key === k)?.name)
      .filter((n): n is string => Boolean(n));

    this.state.addToCart({
      modelKey: model.key,
      modelName: model.customizerTitle,
      colorName: this.selectedColor().name,
      colorHex: this.selectedColor().hex,
      size: this.selectedSize(),
      batteryLabel:
        this.selectedBattery() === 'touring'
          ? 'Extended Touring Range (85 km)'
          : 'Standard Urban Cruiser (50 km)',
      addons: addonNames,
      unitPrice: this.totalPrice(),
      image: model.image,
    });
  }
}
