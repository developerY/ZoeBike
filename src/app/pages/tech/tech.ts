import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {SectionSubnav} from '../../components/section-subnav';
import {TECH_TABS} from '../../data/ashbike-data';
import {ZOE_IMAGES} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

interface SafetyPillar {
  num: string;
  tag: string;
  tagIcon: string;
  tagBgClass: string;
  title: string;
  summary: string;
  footerLabel: string;
  image: string;
  overlayType: 'geofence' | 'badge-top' | 'badge-bottom-left' | 'badge-bottom-right';
  overlayLabel: string;
  deepDive: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tech',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="techTabs" ariaLabel="Tech sub-navigation" />
      <!-- Hero Section -->
      <section class="w-full pt-10 pb-12 bg-surface border-b border-outline-variant/60">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div
            class="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10"
          >
            <div class="max-w-2xl space-y-3">
              <p class="text-label-md text-primary font-semibold">
                Architecture &amp; Intelligence
              </p>
              <h1 class="text-headline-xl text-on-surface tracking-tight font-semibold">
                High-Tech,<br class="hidden sm:inline" />
                <span class="text-primary font-normal">Zero Intimidation.</span>
              </h1>
              <p class="text-body-lg text-on-surface-variant max-w-xl">
                We stripped away cold gears, messy cables, and over-complicated telemetry. What
                remains is whisper-quiet engineering sculpted for seamless grace, serene
                confidence, and pure riding pleasure.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 lg:pb-1">
              <div
                class="px-5 py-3.5 rounded-2xl border border-outline-variant bg-surface flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-secondary"
                >
                  <mat-icon class="material-symbols-outlined text-[20px]">shield_lock</mat-icon>
                </div>
                <div>
                  <p class="text-label-sm text-on-surface-variant">Theft Rate</p>
                  <p class="text-headline-sm font-semibold text-on-surface tabular-nums">
                    &lt; 0.2%
                  </p>
                </div>
              </div>

              <div
                class="px-5 py-3.5 rounded-2xl border border-outline-variant bg-surface flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-primary"
                >
                  <mat-icon class="material-symbols-outlined text-[20px]">
                    battery_charging_full
                  </mat-icon>
                </div>
                <div>
                  <p class="text-label-sm text-on-surface-variant">Fast Top-Off</p>
                  <p class="text-headline-sm font-semibold text-on-surface tabular-nums">
                    2.5 hrs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Spotlight Ribbon -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a
              routerLink="/tech/app"
              class="flex items-center gap-3 p-4 rounded-2xl border border-outline-variant bg-surface hover:bg-surface-container-low transition-colors"
            >
              <mat-icon class="material-symbols-outlined text-primary text-[22px]">
                phonelink_ring
              </mat-icon>
              <span class="text-label-md text-on-surface font-semibold">
                Swift &amp; GoSwift Apps
              </span>
            </a>
            <a
              routerLink="/tech/electric-brakes"
              class="flex items-center gap-3 p-4 rounded-2xl border border-outline-variant bg-surface hover:bg-surface-container-low transition-colors"
            >
              <mat-icon class="material-symbols-outlined text-secondary text-[22px]">
                bolt
              </mat-icon>
              <span class="text-label-md text-on-surface font-semibold">
                Regen Anti-Lock Brakes
              </span>
            </a>
            <a
              routerLink="/tech/app/hud"
              class="flex items-center gap-3 p-4 rounded-2xl border border-outline-variant bg-surface hover:bg-surface-container-low transition-colors"
            >
              <mat-icon class="material-symbols-outlined text-tertiary text-[22px]">
                visibility
              </mat-icon>
              <span class="text-label-md text-on-surface font-semibold">Smart Glass HUD</span>
            </a>
            <a
              routerLink="/tech/features/functions"
              class="flex items-center gap-3 p-4 rounded-2xl border border-outline-variant bg-surface hover:bg-surface-container-low transition-colors"
            >
              <mat-icon class="material-symbols-outlined text-primary text-[22px]">
                psychology
              </mat-icon>
              <span class="text-label-md text-on-surface font-semibold">Smartphone Fusion</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Interactive 4 Pillars Grid Section -->
      <section class="w-full py-14 bg-surface">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span class="text-label-md text-primary tracking-widest uppercase font-semibold">
                Foundational Protection
              </span>
              <h2 class="text-headline-lg text-on-surface mt-1">
                Four Pillars of Effortless Trust
              </h2>
            </div>
            <p class="text-body-md text-on-surface-variant max-w-md">
              Each safety element is integrated directly into the unibody frame, operating silently
              in the background without cumbersome switches or greasy touchpoints.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (pillar of pillars; track pillar.num) {
              <button
                type="button"
                (click)="activePillar.set(pillar)"
                class="group relative rounded-3xl bg-surface-container-low p-5 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-surface-container cursor-pointer"
              >
                <div>
                  <div class="flex items-center justify-between mb-5">
                    <span
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm"
                      [class]="pillar.tagBgClass"
                    >
                      <mat-icon class="material-symbols-outlined text-[14px]">
                        {{ pillar.tagIcon }}
                      </mat-icon>
                      {{ pillar.tag }}
                    </span>
                    <span class="text-headline-sm text-outline-variant font-light tabular-nums">
                      {{ pillar.num }}
                    </span>
                  </div>

                  <div
                    class="w-full h-44 rounded-2xl overflow-hidden mb-5 relative bg-surface-container-high"
                  >
                    <img
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      [alt]="pillar.title"
                      [src]="pillar.image"
                      referrerpolicy="no-referrer"
                    />

                    @if (pillar.overlayType === 'geofence') {
                      <div
                        class="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-2 rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between text-on-surface"
                      >
                        <div class="flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-secondary"></span>
                          <span class="text-label-sm font-semibold">
                            {{ pillar.overlayLabel }}
                          </span>
                        </div>
                        <span class="text-label-sm text-secondary">Secure</span>
                      </div>
                    } @else if (pillar.overlayType === 'badge-top') {
                      <div
                        class="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface text-label-sm"
                      >
                        {{ pillar.overlayLabel }}
                      </div>
                    } @else if (pillar.overlayType === 'badge-bottom-left') {
                      <div
                        class="absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm flex items-center gap-2"
                      >
                        <mat-icon class="material-symbols-outlined text-[16px] text-tertiary">
                          wb_sunny
                        </mat-icon>
                        <span class="text-label-sm font-medium">{{ pillar.overlayLabel }}</span>
                      </div>
                    } @else {
                      <div
                        class="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface text-label-sm font-semibold tabular-nums"
                      >
                        {{ pillar.overlayLabel }}
                      </div>
                    }
                  </div>

                  <h3 class="text-headline-sm text-on-surface mb-2 font-semibold">
                    {{ pillar.title }}
                  </h3>
                  <p class="text-body-sm text-on-surface-variant">{{ pillar.summary }}</p>
                </div>

                <div class="pt-5 mt-3 flex items-center justify-between w-full">
                  <span class="text-label-sm text-on-surface-variant">{{ pillar.footerLabel }}</span>
                  <span
                    class="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors"
                  >
                    <mat-icon class="material-symbols-outlined text-[16px]">north_east</mat-icon>
                  </span>
                </div>
              </button>
            }
          </div>
        </div>
      </section>

      <!-- Zoe Companion Mobile App Deep-Dive -->
      <section class="w-full py-14 bg-surface-container-low overflow-hidden relative">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <!-- Left: Interactive Phone Mockup Shell -->
            <div class="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div
                class="relative w-full max-w-[340px] rounded-[3rem] p-3.5 bg-surface-container-highest shadow-2xl"
              >
                <div
                  class="relative w-full rounded-[2.5rem] bg-surface-container-lowest overflow-hidden flex flex-col p-5 space-y-4"
                >
                  <!-- Phone Top Bar -->
                  <div class="flex items-center justify-between px-2 pt-1 pb-2">
                    <span class="text-label-sm font-bold text-on-surface tabular-nums">9:41</span>
                    <div class="w-20 h-4 rounded-full bg-surface-container-high mx-auto"></div>
                    <div class="flex items-center gap-1 text-on-surface">
                      <mat-icon class="material-symbols-outlined text-[14px]">wifi</mat-icon>
                      <mat-icon class="material-symbols-outlined text-[14px]">battery_std</mat-icon>
                    </div>
                  </div>

                  <!-- App Header -->
                  <div class="flex items-center justify-between pt-1">
                    <div>
                      <p class="text-label-sm text-on-surface-variant">CONNECTED TO</p>
                      <h4 class="text-headline-sm font-bold text-on-surface">
                        Zoe Model 01 · Linen
                      </h4>
                    </div>
                    <div
                      class="w-9 h-9 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary"
                    >
                      <mat-icon class="material-symbols-outlined text-[20px]">
                        bluetooth_connected
                      </mat-icon>
                    </div>
                  </div>

                  <!-- Interactive Proximity Lock Card -->
                  <div class="p-4 rounded-2xl bg-surface-container transition-all">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-label-sm text-on-surface-variant flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-primary"></span>
                        BEACON DETECTION
                      </span>
                      <span class="text-label-sm text-primary font-bold tabular-nums">
                        1.4m away
                      </span>
                    </div>
                    <div class="flex items-center gap-3">
                      <button
                        type="button"
                        (click)="isBikeUnlocked.set(!isBikeUnlocked())"
                        [attr.aria-label]="
                          isBikeUnlocked() ? 'Lock bike motor' : 'Unlock bike motor'
                        "
                        class="w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
                        [class]="
                          isBikeUnlocked()
                            ? 'bg-primary text-on-primary'
                            : 'bg-secondary text-on-secondary'
                        "
                      >
                        <mat-icon class="material-symbols-outlined text-[24px]">
                          {{ isBikeUnlocked() ? 'lock_open' : 'lock' }}
                        </mat-icon>
                      </button>
                      <div>
                        <p class="text-label-lg font-semibold text-on-surface">
                          {{
                            isBikeUnlocked() ? 'Walk-Up Auto Unlocked' : 'Motor Armed & Locked'
                          }}
                        </p>
                        <p class="text-body-sm text-on-surface-variant">
                          Tap icon to toggle security
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Live Elevation-Aware Route Card -->
                  <div class="p-4 rounded-2xl bg-surface-container-low space-y-3">
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-label-sm font-semibold text-on-surface">
                        ELEVATION-AWARE ROUTE
                      </span>
                      <button
                        type="button"
                        (click)="
                          routeMode.set(routeMode() === 'flat' ? 'direct' : 'flat')
                        "
                        class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer"
                        [class]="
                          routeMode() === 'flat'
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-primary-fixed text-on-primary-fixed'
                        "
                      >
                        {{ routeMode() === 'flat' ? 'FLAT PREFERRED' : 'DIRECT ROUTE' }}
                      </button>
                    </div>

                    <!-- Dynamic Elevation Bars -->
                    <div class="h-14 w-full flex items-end gap-1 px-1 pt-2">
                      @for (barH of elevationBars(); track $index) {
                        <div
                          class="w-full rounded-t transition-all duration-300"
                          [style.height.%]="barH"
                          [class]="
                            routeMode() === 'flat' ? 'bg-secondary/45' : 'bg-primary/50'
                          "
                        ></div>
                      }
                    </div>
                    <p class="text-[11px] text-on-surface-variant flex justify-between">
                      <span>
                        {{
                          routeMode() === 'flat'
                            ? 'Max Grade: 1.8% (Sweat-Free)'
                            : 'Max Grade: 5.4% (Fastest)'
                        }}
                      </span>
                      <span class="font-semibold text-on-surface tabular-nums">
                        {{ routeMode() === 'flat' ? '19 min' : '15 min' }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Narrative & App Features -->
            <div class="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div>
                <span class="text-label-md text-primary tracking-widest uppercase font-semibold">
                  Zoe Companion App
                </span>
                <h2 class="text-headline-lg text-on-surface mt-1">
                  Intuitive Intelligence in Your Pocket
                </h2>
                <p class="text-body-md text-on-surface-variant mt-2 max-w-xl">
                  Your smartphone acts as an invisible concierge key, automatically waking your Zoe
                  as you step outside and guiding you along gentle, traffic-calmed boulevards.
                </p>
              </div>

              <div class="space-y-4">
                <div
                  class="p-5 rounded-2xl bg-surface-container-lowest transition-all hover:shadow-md flex items-start gap-4"
                >
                  <div
                    class="w-10 h-10 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center shrink-0"
                  >
                    <mat-icon class="material-symbols-outlined text-[22px]">lock_clock</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-label-lg font-semibold text-on-surface">
                      Approximity Keyless Wake
                    </h3>
                    <p class="text-body-sm text-on-surface-variant mt-0.5">
                      Walk within 2 meters with your phone, and the kickstand disengages while
                      lighting gently illuminates. Walk away, and the Zoe shuts down and locks
                      automatically.
                    </p>
                  </div>
                </div>

                <div
                  class="p-5 rounded-2xl bg-surface-container-lowest transition-all hover:shadow-md flex items-start gap-4"
                >
                  <div
                    class="w-10 h-10 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0"
                  >
                    <mat-icon class="material-symbols-outlined text-[22px]">hiking</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-label-lg font-semibold text-on-surface">
                      Effortless "Gentle Grade" Routing
                    </h3>
                    <p class="text-body-sm text-on-surface-variant mt-0.5">
                      Select your mood: "Sweat-Free" or "Direct". Our turn-by-turn navigation
                      actively redirects you along protected greenways, paved lanes, and
                      low-gradient avenues.
                    </p>
                  </div>
                </div>

                <div
                  class="p-5 rounded-2xl bg-surface-container-lowest transition-all hover:shadow-md flex items-start gap-4"
                >
                  <div
                    class="w-10 h-10 rounded-xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center shrink-0"
                  >
                    <mat-icon class="material-symbols-outlined text-[22px]">
                      health_and_safety
                    </mat-icon>
                  </div>
                  <div>
                    <h3 class="text-label-lg font-semibold text-on-surface">
                      Impact Fall Alert &amp; Dispatch
                    </h3>
                    <p class="text-body-sm text-on-surface-variant mt-0.5">
                      Tri-axial gyroscope sensors detect sudden vertical-to-horizontal impacts. If
                      unacknowledged within 60 seconds, your GPS pinpoint and medical notes transmit
                      instantly to designated emergency companions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Battery & Charging Spotlight -->
      <section class="w-full py-14 bg-surface">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div
            class="rounded-3xl bg-surface-container-low p-6 md:p-14 overflow-hidden relative"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-6 space-y-5">
                <span
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm"
                >
                  <mat-icon class="material-symbols-outlined text-[16px]">power</mat-icon>
                  Modular Power Architecture
                </span>
                <h2 class="text-headline-lg text-on-surface font-semibold tracking-tight">
                  A battery disguised as a luxury water bottle.
                </h2>
                <p class="text-body-lg text-on-surface-variant">
                  Heavy, grease-laden brick batteries belong in the past decade. Zoe's power cell
                  twists out smoothly with one hand, weighs just 2.1 kg, and charges discreetly
                  beside your latte or laptop.
                </p>

                <!-- Specification List -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div class="p-4 rounded-2xl bg-surface-container-lowest">
                    <p class="text-label-sm text-on-surface-variant">RANGE</p>
                    <p class="text-headline-sm font-bold text-on-surface mt-1 tabular-nums">
                      75 km
                    </p>
                    <span class="text-label-sm text-secondary">Eco-Glide mode</span>
                  </div>
                  <div class="p-4 rounded-2xl bg-surface-container-lowest">
                    <p class="text-label-sm text-on-surface-variant">DESK TOP-OFF</p>
                    <p class="text-headline-sm font-bold text-on-surface mt-1 tabular-nums">
                      2.5 hrs
                    </p>
                    <span class="text-label-sm text-primary">0 to 100% full</span>
                  </div>
                  <div class="p-4 rounded-2xl bg-surface-container-lowest col-span-2 sm:col-span-1">
                    <p class="text-label-sm text-on-surface-variant">OUTLET</p>
                    <p class="text-headline-sm font-bold text-on-surface mt-1 tabular-nums">
                      65W USB-C
                    </p>
                    <span class="text-label-sm text-tertiary">Powers your phone/Mac</span>
                  </div>
                </div>

                <!-- Interactive Commute Simulator Slider -->
                <div class="p-5 rounded-2xl bg-surface-container-lowest space-y-3 shadow-sm">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-label-sm font-semibold text-on-surface">
                      COMMUTE DURATION SIMULATOR
                    </span>
                    <span class="text-label-sm font-bold text-primary tabular-nums">
                      {{ simulatedDistance() }} km (~{{ simulatedDays() }} day{{
                        simulatedDays() > 1 ? 's' : ''
                      }}
                      commute)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="75"
                    [value]="simulatedDistance()"
                    (input)="onRangeInput($event)"
                    aria-label="Commute distance simulator"
                    class="w-full h-2 rounded-lg bg-surface-container-high appearance-none cursor-pointer accent-primary"
                  />
                  <div class="flex justify-between text-label-sm text-on-surface-variant">
                    <span>Quick errand (10 km)</span>
                    <span>Remaining reserve: {{ remainingReservePct() }}%</span>
                    <span>Weekend getaway (75 km)</span>
                  </div>
                </div>
              </div>

              <!-- Visual Showcase of Battery Pack -->
              <div class="lg:col-span-6 flex flex-col items-center">
                <div
                  class="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-surface-container-highest"
                >
                  <img
                    class="w-full h-full object-cover"
                    alt="Cylindrical matte ceramic-finish Zoe portable e-bike battery on marble cafe table"
                    [src]="images.techBatteryBottle"
                    referrerpolicy="no-referrer"
                  />
                  <div
                    class="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-label-sm font-semibold shadow-sm flex items-center gap-1.5"
                  >
                    <mat-icon class="material-symbols-outlined text-[16px] text-primary">
                      bolt
                    </mat-icon>
                    LG 21700 High-Density Cells
                  </div>
                  <div
                    class="absolute bottom-5 right-5 px-3.5 py-2 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md text-on-surface shadow-md"
                  >
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span class="text-label-sm font-semibold">Fast Bi-Directional USB-PD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Guarantees, Roadside Assistance & Care Tier Cards -->
      <section class="w-full py-14 bg-surface-container-low">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-label-md text-primary tracking-widest uppercase font-semibold">
              Total Ownership Sanctuary
            </span>
            <h2 class="text-headline-lg text-on-surface mt-1">
              Peace of Mind, Standard on Every Ride
            </h2>
            <p class="text-body-md text-on-surface-variant mt-2">
              Technology means little without steadfast human backing. Every Zoe includes concierge
              guarantees so you never feel stranded.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between"
            >
              <div>
                <div
                  class="w-12 h-12 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center mb-5"
                >
                  <mat-icon class="material-symbols-outlined text-[26px]">verified_user</mat-icon>
                </div>
                <h3 class="text-headline-sm font-semibold text-on-surface mb-2">
                  3-Year Frame &amp; Motor Warranty
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Comprehensive zero-deductible coverage. If your motor, carbon belt, sensors, or
                  integrated wiring harness ever falter under normal urban use, we service or
                  replace it completely free of charge.
                </p>
              </div>
              <div
                class="pt-5 mt-3 flex items-center gap-2 text-primary text-label-sm font-semibold"
              >
                <span>Official Factory Backing</span>
                <mat-icon class="material-symbols-outlined text-[16px]">check_circle</mat-icon>
              </div>
            </div>

            <div
              class="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between"
            >
              <div>
                <div
                  class="w-12 h-12 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center mb-5"
                >
                  <mat-icon class="material-symbols-outlined text-[26px]">handshake</mat-icon>
                </div>
                <h3 class="text-headline-sm font-semibold text-on-surface mb-2">
                  50% Crash Replacement Care
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Accidents are jarring enough without facing full retail replacement costs. In the
                  unfortunate event of a major spill, receive 50% credit toward an equivalent
                  brand-new Zoe chassis within 2 years.
                </p>
              </div>
              <div
                class="pt-5 mt-3 flex items-center gap-2 text-secondary text-label-sm font-semibold"
              >
                <span>Gentle Renewal Policy</span>
                <mat-icon class="material-symbols-outlined text-[16px]">check_circle</mat-icon>
              </div>
            </div>

            <div
              class="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between"
            >
              <div>
                <div
                  class="w-12 h-12 rounded-2xl bg-tertiary-fixed/60 text-tertiary flex items-center justify-center mb-5"
                >
                  <mat-icon class="material-symbols-outlined text-[26px]">airport_shuttle</mat-icon>
                </div>
                <h3 class="text-headline-sm font-semibold text-on-surface mb-2">
                  Zoe Angel Roadside Dispatch
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Punctured tire late at night? Simply tap "Request Angel" in the Zoe App. Our
                  eco-friendly electric sprinter vans arrive to pick up both you and your bike
                  anywhere across metropolitan coverage zones.
                </p>
              </div>
              <div
                class="pt-5 mt-3 flex items-center gap-2 text-tertiary text-label-sm font-semibold"
              >
                <span>24/7 Metropolitan Escort</span>
                <mat-icon class="material-symbols-outlined text-[16px]">check_circle</mat-icon>
              </div>
            </div>
          </div>

          <!-- Bottom CTA Banner -->
          <div
            class="mt-14 p-6 md:p-9 rounded-3xl bg-primary text-on-primary flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div class="space-y-1 text-center md:text-left">
              <h3 class="text-headline-md font-semibold text-on-primary">
                Curious to feel the gentle power firsthand?
              </h3>
              <p class="text-body-sm text-primary-fixed">
                Book a 30-minute private salon test ride with our female product specialists.
              </p>
            </div>
            <button
              type="button"
              (click)="state.openTestRideModal('air')"
              class="px-7 py-3.5 rounded-full bg-surface text-primary text-label-lg shadow-md hover:bg-surface-container-low transition-all whitespace-nowrap cursor-pointer"
            >
              Schedule Atelier Test Ride
            </button>
          </div>
        </div>
      </section>

      <!-- PILLAR DETAIL MODAL -->
      @if (activePillar(); as pillar) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close pillar detail"
            (click)="activePillar.set(null)"
            class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4"
          >
            <button
              type="button"
              aria-label="Close pillar detail"
              (click)="activePillar.set(null)"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>
            <span class="text-label-sm text-primary uppercase font-bold tracking-wider">
              Pillar {{ pillar.num }} · {{ pillar.tag }}
            </span>
            <h3 class="text-headline-sm font-semibold text-on-surface">{{ pillar.title }}</h3>
            <img
              [src]="pillar.image"
              [alt]="pillar.title"
              class="w-full h-48 object-cover rounded-2xl"
              referrerpolicy="no-referrer"
            />
            <p class="text-body-sm text-on-surface-variant leading-relaxed">
              {{ pillar.deepDive }}
            </p>
            <button
              type="button"
              (click)="activePillar.set(null)"
              class="w-full py-3 rounded-full bg-primary text-on-primary text-label-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class Tech {
  readonly state = inject(ZoeState);
  readonly images = ZOE_IMAGES;
  readonly techTabs = TECH_TABS;

  readonly isBikeUnlocked = signal(true);
  readonly routeMode = signal<'flat' | 'direct'>('flat');
  readonly simulatedDistance = signal(32);
  readonly activePillar = signal<SafetyPillar | null>(null);

  readonly elevationBars = computed(() =>
    this.routeMode() === 'flat'
      ? [28, 34, 42, 24, 30, 38, 28, 22]
      : [40, 68, 92, 74, 58, 86, 62, 35],
  );

  readonly simulatedDays = computed(() => Math.max(1, Math.round(this.simulatedDistance() / 16)));

  readonly remainingReservePct = computed(() =>
    Math.max(0, Math.round(((75 - this.simulatedDistance()) / 75) * 100)),
  );

  readonly pillars: SafetyPillar[] = [
    {
      num: '01',
      tag: 'Cellular IoT',
      tagIcon: 'radar',
      tagBgClass: 'bg-secondary-fixed/50 text-on-secondary-fixed-variant',
      title: 'Smart Anti-Theft & Cellular GPS',
      summary:
        'Always-on 4G eSIM connectivity. The moment unauthorized motion is felt, your bike locks its rear motor stator, chirps an 88dB warning chord, and pins live coordinates to your phone.',
      footerLabel: 'Multi-Carrier LTE-M',
      image: ZOE_IMAGES.techGps,
      overlayType: 'geofence',
      overlayLabel: 'Active Geofence',
      deepDive:
        'Our embedded LTE-M & GNSS module maintains an active heartbeat for up to 21 days even if the main bottle battery is detached. In the event of theft, Zoe Angel Recovery coordinates directly with local authorities using sub-3-meter live triangulation.',
    },
    {
      num: '02',
      tag: 'Ergonomic Reach',
      tagIcon: 'pan_tool',
      tagBgClass: 'bg-primary-fixed/60 text-on-primary-fixed-variant',
      title: 'Petite-Fit Hydraulic Disc Brakes',
      summary:
        'Engineered with smaller palm biometric envelopes. Shorter-reach levers require 40% less finger squeeze effort while providing linear wet-weather modulation on dual 160mm mineral discs.',
      footerLabel: 'Dry & Wet All-Season',
      image: ZOE_IMAGES.techBrakes,
      overlayType: 'badge-top',
      overlayLabel: '14mm Short Reach',
      deepDive:
        'Traditional hydraulic brake levers force smaller hands to over-extend. We custom-forged our lever blades 14mm closer to the vegan leather grips, paired with instant electronic motor cut-off switches.',
    },
    {
      num: '03',
      tag: 'Auto Dusk Pulse',
      tagIcon: 'flare',
      tagBgClass: 'bg-tertiary-fixed/60 text-on-tertiary-fixed-variant',
      title: '360° Starlight Illumination',
      summary:
        'Cleanly integrated into the frame headtube and rear seat stays. Automatically illuminates as dusk approaches, pulsing brighter to warn trailing cars during hard deceleration.',
      footerLabel: 'Brake Light Decel Sensor',
      image: ZOE_IMAGES.techLights,
      overlayType: 'badge-bottom-left',
      overlayLabel: 'Ambient Lux Sensor',
      deepDive:
        'A 40-Lux StVZO optical projector lens casts a wide, non-glaring warm-white beam across cobblestones while an accelerometer-linked rear seatstay light bar brightens during braking.',
    },
    {
      num: '04',
      tag: 'No Greasy Chains',
      tagIcon: 'clean_hands',
      tagBgClass: 'bg-secondary-container/60 text-on-secondary-container',
      title: 'Clean Carbon Belt Drive',
      summary:
        "Toss out degreaser and chain oil forever. Gates Carbon Drive™ never stretches, never rusts, and won't soil your silk culottes or cream coats. Silent, smooth, and utterly maintenance-free.",
      footerLabel: 'Zero Maintenance',
      image: ZOE_IMAGES.techBelt,
      overlayType: 'badge-bottom-right',
      overlayLabel: '30,000 km',
      deepDive:
        'Tensile carbon cords embedded in weather-proof polyurethane eliminate chain slap, rust streaks, and oily pant marks while delivering silent power transfer rated for 30,000 km.',
    },
  ];

  onRangeInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.simulatedDistance.set(Number(target.value));
  }
}
