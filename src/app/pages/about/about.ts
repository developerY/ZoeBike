import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {SectionSubnav} from '../../components/section-subnav';
import {INFO_TABS} from '../../data/ashbike-data';
import {ZOE_IMAGES} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

type AiProfileKey = 'eco' | 'city' | 'hill';

interface AiProfileSpec {
  key: AiProfileKey;
  label: string;
  subtitle: string;
  multiplier: string;
  latency: string;
  predictedRange: string;
  inclineAssist: string;
  description: string;
}

const AI_PROFILES: Record<AiProfileKey, AiProfileSpec> = {
  eco: {
    key: 'eco',
    label: 'Eco Glide',
    subtitle: 'Long-horizon efficiency',
    multiplier: '1.4x adaptive assist',
    latency: '7.2 ms',
    predictedRange: '85 km',
    inclineAssist: 'Up to 7% grade smoothing',
    description:
      'Prioritizes featherlight momentum preservation on flat river paths and boulevards, extending every watt-hour across multi-day city commuting.',
  },
  city: {
    key: 'city',
    label: 'City Flow',
    subtitle: 'Balanced neural rhythm',
    multiplier: '2.2x adaptive assist',
    latency: '6.4 ms',
    predictedRange: '72 km',
    inclineAssist: 'Up to 12% bridge compensation',
    description:
      'Our signature commuter calibration. Continuously balances pedal pressure with intersection stop-and-go timing for sweat-free boulevard pacing.',
  },
  hill: {
    key: 'hill',
    label: 'Hill Assist',
    subtitle: 'Peak torque prediction',
    multiplier: '3.1x adaptive assist',
    latency: '5.8 ms',
    predictedRange: '58 km',
    inclineAssist: 'Up to 18% steep climb lock',
    description:
      'Detects elevation shifts and coastal headwinds within half a pedal stroke, delivering quiet stator surge before fatigue sets in.',
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="infoTabs" ariaLabel="Info and About navigation" />
      <!-- WIDE HERO BANNER SECTION -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-6 pb-10">
        <div
          class="relative w-full aspect-[16/10] sm:aspect-[2/1] max-h-[440px] rounded-2xl border border-outline-variant overflow-hidden bg-inverse-surface"
        >
          <img
            [src]="images.aboutBanner"
            alt="ZoeBike cosmic cycling horizon banner representing intelligent electric mobility"
            class="w-full h-full object-cover object-center"
            referrerpolicy="no-referrer"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/45 to-on-surface/15"
          ></div>

          <div
            class="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end items-start"
          >
            <p class="text-label-sm text-primary-fixed font-semibold mb-2">
              About ZoeBike · AI-Driven Urban Mobility
            </p>

            <h1 class="text-headline-xl text-on-primary max-w-3xl tracking-tight">
              Intelligence in Motion.<br />
              Built for Every Horizon.
            </h1>

            <p class="text-body-md sm:text-body-lg text-surface-container-low/95 max-w-2xl mt-3">
              Founded by roboticists and industrial frame makers, ZoeBike pairs on-bike neural
              torque intelligence with sub-15 kg step-through craft so every city ride feels
              weightless.
            </p>
          </div>
        </div>
      </section>

      <!-- COMPANY MISSION & METRICS STRIP -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-6 space-y-4">
            <p class="text-label-md text-secondary font-semibold">Our Manifesto</p>
            <h2 class="text-headline-lg text-on-surface tracking-tight">
              Quiet AI That Serves the Rider—Never the Other Way Around.
            </h2>
            <p class="text-body-md text-on-surface-variant">
              Traditional e-bikes bolt heavy industrial motors onto rigid frames and leave riders
              fiddling with confusing assistance buttons. At ZoeBike, edge machine learning works
              silently inside the bottom bracket and hub—reading terrain, wind load, and your
              natural cadence in real time so power arrives like a gentle tailwind.
            </p>
            <p class="text-body-md text-on-surface-variant">
              Every frame is sculpted from 78% recycled aluminum-magnesium alloy around over 4,000
              real-world ergonomic fits, proving that cutting-edge bicycle AI can feel warm,
              human, and effortless to carry up fourth-floor stairs.
            </p>
          </div>

          <div class="lg:col-span-6 grid grid-cols-2 gap-4">
            <div class="p-6 rounded-[1.75rem] bg-surface-container-low space-y-1.5">
              <span class="text-headline-md font-semibold text-primary tabular-nums">&lt; 8 ms</span>
              <p class="text-label-lg text-on-surface">Torque Inference</p>
              <p class="text-body-sm text-on-surface-variant">
                On-board neural controller adapts before your second pedal stroke.
              </p>
            </div>
            <div class="p-6 rounded-[1.75rem] bg-surface-container-low space-y-1.5">
              <span class="text-headline-md font-semibold text-secondary tabular-nums">4,000+</span>
              <p class="text-label-lg text-on-surface">Ergonomic Scans</p>
              <p class="text-body-sm text-on-surface-variant">
                Frames proportioned for balanced posture, standover clearance, and narrow reach.
              </p>
            </div>
            <div class="p-6 rounded-[1.75rem] bg-surface-container-low space-y-1.5">
              <span class="text-headline-md font-semibold text-tertiary tabular-nums">75 km</span>
              <p class="text-label-lg text-on-surface">Predictive Range</p>
              <p class="text-body-sm text-on-surface-variant">
                Route-aware battery budgeting that accounts for headwinds and hills.
              </p>
            </div>
            <div class="p-6 rounded-[1.75rem] bg-surface-container-low space-y-1.5">
              <span class="text-headline-md font-semibold text-on-surface tabular-nums">100%</span>
              <p class="text-label-lg text-on-surface">Carbon-Neutral Craft</p>
              <p class="text-body-sm text-on-surface-variant">
                Waterborne mineral finishes in Florence paired with recyclable 21700 cells.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI ARCHITECTURE PILLARS -->
      <section class="w-full bg-surface-container-low/50 py-14">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div class="max-w-2xl mb-10">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant text-label-sm uppercase tracking-wider mb-2"
            >
              Intelligent Engineering
            </span>
            <h2 class="text-headline-lg text-on-surface tracking-tight">
              Four Neural Systems Inside Every Zoe Frame
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article
              class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5"
            >
              <div class="space-y-3">
                <div
                  class="w-12 h-12 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">psychology</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">
                  Adaptive Torque Neural Control
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Samples pedal pressure, cadence, and gradient 125 times per second to eliminate
                  jerky starts and match your riding flow.
                </p>
              </div>
              <span class="text-label-sm text-primary uppercase tracking-wider">125 Hz Edge Loop</span>
            </article>

            <article
              class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5"
            >
              <div class="space-y-3">
                <div
                  class="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">radar</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">
                  Predictive Guardian Radar
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Multi-axis motion models distinguish a harmless breeze from unauthorized lifting
                  and trigger cellular GPS + Crash SOS alerts.
                </p>
              </div>
              <span class="text-label-sm text-secondary uppercase tracking-wider">4G eSIM Shield</span>
            </article>

            <article
              class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5"
            >
              <div class="space-y-3">
                <div
                  class="w-12 h-12 rounded-2xl bg-tertiary-fixed/70 text-tertiary flex items-center justify-center"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">alt_route</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">
                  Gentle-Grade Route AI
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Scores city streets by protected lanes, calm intersections, wind exposure, and
                  elevation so every detour feels restorative.
                </p>
              </div>
              <span class="text-label-sm text-tertiary uppercase tracking-wider">Calm Corridors</span>
            </article>

            <article
              class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5"
            >
              <div class="space-y-3">
                <div
                  class="w-12 h-12 rounded-2xl bg-surface-container-high text-on-surface flex items-center justify-center"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">
                    battery_charging_full
                  </mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">
                  Proactive Cell Diagnostics
                </h3>
                <p class="text-body-sm text-on-surface-variant">
                  Continuous thermal and impedance modeling preserves long-term cell capacity and
                  forecasts belt checks weeks ahead.
                </p>
              </div>
              <span class="text-label-sm text-on-surface-variant uppercase tracking-wider">
                Zero-Guess Care
              </span>
            </article>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE AI RIDE PROFILE SIMULATOR -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div
          class="rounded-[2.5rem] bg-surface-container-lowest shadow-lg p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div class="lg:col-span-5 space-y-5">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-fixed-variant text-label-sm uppercase tracking-wider"
            >
              Interactive Calibration
            </span>
            <h2 class="text-headline-lg text-on-surface tracking-tight">
              Preview How Zoe AI Adapts to Your Route
            </h2>
            <p class="text-body-sm text-on-surface-variant">
              Switch ride profiles to inspect how our on-bike neural assist tunes torque response,
              elevation smoothing, and predictive range.
            </p>

            <div class="flex flex-col gap-2.5">
              @for (profile of profileList; track profile.key) {
                <button
                  type="button"
                  (click)="selectedProfileKey.set(profile.key)"
                  class="p-4 rounded-2xl text-left transition-all flex items-center justify-between gap-3 cursor-pointer"
                  [class]="
                    selectedProfileKey() === profile.key
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  "
                >
                  <div>
                    <span class="text-label-lg font-semibold block">{{ profile.label }}</span>
                    <span
                      class="text-body-sm block"
                      [class]="
                        selectedProfileKey() === profile.key
                          ? 'text-on-primary/85'
                          : 'text-on-surface-variant'
                      "
                    >
                      {{ profile.subtitle }}
                    </span>
                  </div>
                  <mat-icon class="material-symbols-outlined text-[20px]">
                    {{ selectedProfileKey() === profile.key ? 'check_circle' : 'tune' }}
                  </mat-icon>
                </button>
              }
            </div>
          </div>

          <div class="lg:col-span-7 rounded-[2rem] bg-surface-container-low p-6 sm:p-8 space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Active Calibration
                </span>
                <h3 class="text-headline-md text-on-surface font-semibold mt-0.5">
                  {{ activeProfile().label }}
                </h3>
              </div>
              <span
                class="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-label-md font-semibold shadow-xs tabular-nums"
              >
                {{ activeProfile().multiplier }}
              </span>
            </div>

            <p class="text-body-md text-on-surface-variant">
              {{ activeProfile().description }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-4 rounded-2xl bg-surface-container-lowest">
                <span class="text-label-sm text-on-surface-variant block">Response Latency</span>
                <span class="text-headline-sm font-semibold text-primary tabular-nums mt-1 block">
                  {{ activeProfile().latency }}
                </span>
              </div>
              <div class="p-4 rounded-2xl bg-surface-container-lowest">
                <span class="text-label-sm text-on-surface-variant block">Predicted Range</span>
                <span class="text-headline-sm font-semibold text-secondary tabular-nums mt-1 block">
                  {{ activeProfile().predictedRange }}
                </span>
              </div>
              <div class="p-4 rounded-2xl bg-surface-container-lowest">
                <span class="text-label-sm text-on-surface-variant block">Terrain Envelope</span>
                <span class="text-label-lg font-semibold text-on-surface mt-1.5 block">
                  {{ activeProfile().inclineAssist }}
                </span>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a
                routerLink="/bikes"
                class="px-7 py-3.5 rounded-full bg-primary text-on-primary text-label-lg shadow-sm hover:bg-primary-container transition-all inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Customize Your Zoe</span>
                <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
              </a>
              <button
                type="button"
                (click)="state.openTestRideModal()"
                class="px-6 py-3.5 rounded-full bg-surface-container-lowest text-on-surface text-label-lg hover:bg-surface-container-high transition-all inline-flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
              >
                <mat-icon class="material-symbols-outlined text-[18px]">calendar_today</mat-icon>
                <span>Book Free Test Ride</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class About {
  readonly state = inject(ZoeState);
  readonly images = ZOE_IMAGES;
  readonly infoTabs = INFO_TABS;

  readonly profileList = Object.values(AI_PROFILES);
  readonly selectedProfileKey = signal<AiProfileKey>('city');
  readonly activeProfile = computed(() => AI_PROFILES[this.selectedProfileKey()]);
}
