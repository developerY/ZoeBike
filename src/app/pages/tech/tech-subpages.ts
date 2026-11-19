import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {SectionSubnav} from '../../components/section-subnav';
import {ASHBIKE_APPS, FUSION_SENSORS, TECH_TABS} from '../../data/ashbike-data';

type TechSubSection = 'app' | 'gamification' | 'hud' | 'features' | 'functions' | 'electric-brakes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tech-subpages',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="tabs" ariaLabel="Tech sub-navigation" />

      @if (activeSection() === 'app') {
        <!-- APPS: ASHBIKE, SWIFT BIKE SHIFT, GOSWIFT, WEAROS -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Connected Cycling Apps · Google Health &amp; Apple Health
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              Ride Smarter, Track Health &amp; Earn Eco Rewards
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Our mobile and wearable ecosystem connects calendar events, local shared bike docks,
              live wind and weather forecasts, and health telemetry—turning everyday commutes into
              rewarding fitness habits.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (app of apps; track app.name) {
              <article
                class="p-8 rounded-[2rem] bg-surface-container-low flex flex-col justify-between gap-5"
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between gap-3">
                    <div
                      class="w-12 h-12 rounded-2xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs"
                    >
                      <mat-icon class="material-symbols-outlined text-[24px]">{{ app.icon }}</mat-icon>
                    </div>
                    <span class="text-label-sm text-secondary font-semibold">{{ app.status }}</span>
                  </div>
                  <p class="text-label-sm text-on-surface-variant">{{ app.platform }}</p>
                  <h2 class="text-headline-sm text-on-surface font-semibold">{{ app.name }}</h2>
                  <p class="text-body-sm text-on-surface-variant">{{ app.summary }}</p>
                </div>

                <ul class="space-y-1.5 pt-3 border-t border-outline-variant/30 text-body-sm text-on-surface">
                  @for (h of app.highlights; track h) {
                    <li class="flex items-center gap-2">
                      <mat-icon class="material-symbols-outlined text-primary text-[16px]">
                        check_circle
                      </mat-icon>
                      <span>{{ h }}</span>
                    </li>
                  }
                </ul>
              </article>
            }
          </div>
        </section>
      } @else if (activeSection() === 'gamification') {
        <!-- GAMIFICATION (AR OUTDOOR & VR INDOOR) -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-tertiary uppercase tracking-wider font-semibold">
              Blending Fitness, Fun &amp; Innovation
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              Gamification of Biking: AR Cities &amp; VR Escapes
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              What if daily eco-commuting felt as engaging as your favorite game? Augmented Reality
              turns real city blocks into playable quests, while VR transforms indoor training
              rides into immersive adventures.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-5">
              <h2 class="text-headline-md text-primary font-semibold">
                1. Augmented Reality (AR) for Outdoor Cycling
              </h2>
              <div class="space-y-4 text-body-sm text-on-surface-variant">
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    Pokémon-Go-Style Neighborhood Quests
                  </h3>
                  <p>
                    Collect digital checkpoints, earn experience points (XP) for distance covered,
                    and unlock Eco-Badges for real greenhouse emissions avoided.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    Friendly Team Territory &amp; Leaderboards
                  </h3>
                  <p>
                    Coordinate city-wide scavenger hunts and track collective neighborhood emission
                    savings alongside friends.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    Local Business &amp; Café Partnerships
                  </h3>
                  <p>
                    Ride past participating local cafes to unlock real-world treats, espresso perks,
                    or partner shop discounts—supporting local commerce directly.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-5">
              <h2 class="text-headline-md text-secondary font-semibold">
                2. Virtual Reality (VR) for Stationary Training
              </h2>
              <div class="space-y-4 text-body-sm text-on-surface-variant">
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    Futuristic Horizon Races
                  </h3>
                  <p>
                    Pair handlebar steering and pedal cadence with alpine roads, futuristic
                    skylines, or off-world tracks so indoor workouts never feel repetitive.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    Fantasy Trails &amp; Arcade Challenges
                  </h3>
                  <p>
                    Explore ancient forests, timed checkpoint trails, and interactive arcade modes
                    where your real physical wattage powers in-game speed.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    Safety-First Simplification
                  </h3>
                  <p>
                    Outdoor AR cues strictly rely on non-distracting audio chimes, peripheral HUD
                    glyphs, and post-ride unlock summaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      } @else if (activeSection() === 'hud') {
        <!-- SMART GLASS HUD -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-6 space-y-4">
              <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Android &amp; iOS Smart Glasses HUD
              </span>
              <h1 class="text-headline-xl text-on-surface tracking-tight">
                Heads-Up Awareness Without Looking Down
              </h1>
              <p class="text-body-lg text-on-surface-variant">
                Eyes belong on intersections, pedestrians, and pavement—not glued to handlebar
                screens. Our Smart Glass HUD concept projects weightless directional vectors and
                proximity cues softly into your peripheral field of view.
              </p>
            </div>

            <div
              class="lg:col-span-6 p-7 rounded-[2rem] bg-inverse-surface text-inverse-on-surface space-y-5 shadow-xl"
            >
              <div class="flex items-center justify-between">
                <span class="text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                  HUD Projection Preview
                </span>
                <button
                  type="button"
                  (click)="hudAlertActive.set(!hudAlertActive())"
                  class="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-label-sm text-inverse-on-surface cursor-pointer transition-colors"
                >
                  {{ hudAlertActive() ? 'Simulate Hazard Clear' : 'Simulate Cross-Traffic Cue' }}
                </button>
              </div>

              <div class="grid grid-cols-3 gap-4 py-4 border-y border-white/10 tabular-nums">
                <div>
                  <span class="text-label-sm text-inverse-on-surface/65 block">Speed</span>
                  <span class="text-headline-md font-semibold text-on-primary">24 km/h</span>
                </div>
                <div>
                  <span class="text-label-sm text-inverse-on-surface/65 block">Next Turn</span>
                  <span class="text-headline-sm font-semibold text-secondary-fixed">120 m →</span>
                </div>
                <div>
                  <span class="text-label-sm text-inverse-on-surface/65 block">CO₂ Saved Today</span>
                  <span class="text-headline-sm font-semibold text-primary-fixed">2.4 kg</span>
                </div>
              </div>

              <div
                class="p-3.5 rounded-2xl flex items-center gap-3 text-body-sm"
                [class]="
                  hudAlertActive()
                    ? 'bg-primary text-on-primary'
                    : 'bg-white/10 text-inverse-on-surface/85'
                "
              >
                <mat-icon class="material-symbols-outlined text-[20px]">
                  {{ hudAlertActive() ? 'warning' : 'visibility' }}
                </mat-icon>
                <span>
                  {{
                    hudAlertActive()
                      ? 'Peripheral Alert: Delivery van approaching right bike lane ahead.'
                      : 'Calm path verified — Gentle-Grade greenway active for next 3.2 km.'
                  }}
                </span>
              </div>
            </div>
          </div>
        </section>
      } @else if (activeSection() === 'features') {
        <!-- ROUTE PLANNING & TUNING FEATURES -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Intelligent Route Planning &amp; Bike Tuning
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              Tailored Routes, Surface Filtering &amp; Live Suspension Tuning
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Intelligent routing respects your preferred terrain, lighting conditions after dusk,
              and live cyclist hazard reports while communicating over BLE with electronic bike
              components.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <h2 class="text-headline-sm text-on-surface font-semibold">Terrain &amp; Surface Filters</h2>
              <p class="text-body-sm text-on-surface-variant">
                Choose flat sweat-free boulevards or crisp hill workouts, filtering between paved
                greenways, gravel paths, and off-street trails.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Traffic &amp; Street-Lighting Aware
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Avoids high-density car arteries and favors well-lit corridors when riding after
                sunset.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Dynamic Incident Re-Routing
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Automatically routes around temporary road construction, blocked lanes, or
                crowd-reported pavement hazards.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Rest Stops, Viewpoints &amp; Amenities
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Pins scenic overlooks, public water fill stations, vertical parking towers, and
                rider-friendly espresso stops along your path.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                BLE Electronic Suspension &amp; Gears
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Smoothly softens damping over cobblestones and firms geometry on clean asphalt via
                low-energy Bluetooth telemetry.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Offline Maps &amp; Future AR Waypoints
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Pre-cached neighborhood tiles keep turn-by-turn navigation dependable even through
                tunnels and rural canyons.
              </p>
            </div>
          </div>
        </section>
      } @else if (activeSection() === 'functions') {
        <!-- SMARTPHONE / BICYCLE FUSION FUNCTIONS -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Smartphone / Bicycle Fusion
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              From Pocket to Pedal: How Smartphones Are Becoming the Brains of Bicycles
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Modern smartphones already hold multi-core neural processors, high-precision sensors,
              and global connectivity. Treating the phone as the bike’s central computer unlocks
              safety and intelligence without bloating bike hardware costs.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (sensor of sensors; track sensor.name) {
              <div class="p-6 rounded-3xl bg-surface-container-low space-y-2">
                <h2 class="text-headline-sm text-on-surface font-semibold">{{ sensor.name }}</h2>
                <p class="text-body-sm text-on-surface-variant">{{ sensor.role }}</p>
              </div>
            }
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm space-y-2">
              <h3 class="text-headline-sm text-primary font-semibold">
                Crash Detection &amp; Medical SOS
              </h3>
              <p class="text-body-sm text-on-surface-variant">
                Detects abnormal impact deceleration, warns emergency contacts with live GPS, and
                exposes critical allergies/blood type for responders.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm space-y-2">
              <h3 class="text-headline-sm text-secondary font-semibold">
                Computer-Vision Obstacle Alerts
              </h3>
              <p class="text-body-sm text-on-surface-variant">
                On-device AI vision models flag encroaching vehicles or doorway hazards via subtle
                auditory cues or wearable haptic vibrations.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm space-y-2">
              <h3 class="text-headline-sm text-tertiary font-semibold">
                Adaptive Lights &amp; Auto Brake Pulse
              </h3>
              <p class="text-body-sm text-on-surface-variant">
                Ambient light sensors wake headlights at twilight while deceleration readings trigger
                rear brake illumination and turn signals.
              </p>
            </div>
          </div>
        </section>
      } @else {
        <!-- REGENERATIVE & ANTI-LOCK ELECTRIC BRAKES -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-6 space-y-4">
              <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                Regenerative Braking Hardware
              </span>
              <h1 class="text-headline-xl text-on-surface tracking-tight">
                Regenerative &amp; Anti-Lock Front Bicycle Braking
              </h1>
              <p class="text-body-lg text-on-surface-variant">
                Our front-wheel braking concept replaces traditional friction brake pads with
                compact electromagnetic generators—harvesting lost stopping energy into electrical
                power while preventing dangerous front-wheel lockups.
              </p>
            </div>

            <!-- Interactive Recovery Simulator -->
            <div
              class="lg:col-span-6 p-7 sm:p-8 rounded-[2rem] bg-surface-container-lowest shadow-lg space-y-5"
            >
              <div class="flex items-center justify-between gap-2">
                <div>
                  <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
                    Kinetic Recovery Estimator
                  </span>
                  <h2 class="text-headline-sm text-on-surface font-semibold">
                    City Stops &amp; Harvested Energy
                  </h2>
                </div>
                <span class="text-headline-sm font-bold text-primary tabular-nums">
                  {{ stopsPerTrip() }} Stops
                </span>
              </div>

              <div class="flex flex-wrap gap-2">
                @for (stops of stopPresets; track stops) {
                  <button
                    type="button"
                    (click)="stopsPerTrip.set(stops)"
                    class="px-4 py-2 rounded-full text-label-md transition-colors cursor-pointer tabular-nums"
                    [class]="
                      stopsPerTrip() === stops
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    "
                  >
                    {{ stops }} Urban Stops
                  </button>
                }
              </div>

              <div class="grid grid-cols-2 gap-4 tabular-nums">
                <div class="p-4 rounded-2xl bg-surface-container-low">
                  <span class="text-label-sm text-on-surface-variant block">Captured Energy</span>
                  <span class="text-headline-md font-semibold text-secondary mt-1 block">
                    {{ capturedWh() }} Wh
                  </span>
                </div>
                <div class="p-4 rounded-2xl bg-surface-container-low">
                  <span class="text-label-sm text-on-surface-variant block">
                    Smartphone Boost
                  </span>
                  <span class="text-headline-md font-semibold text-primary mt-1 block">
                    +{{ phoneBoostPct() }}%
                  </span>
                </div>
              </div>
              <p class="text-body-sm text-on-surface-variant">
                Enough harvested electricity to power LED lighting, BicycleBrain sensors, and top up
                your phone without external outlets.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-[2rem] bg-surface-container-low space-y-2">
              <h3 class="text-headline-sm text-on-surface font-semibold">Electromagnetic Capture</h3>
              <p class="text-body-sm text-on-surface-variant">
                Coils gently resist rim or rotor rotation when the lever is pulled, converting
                momentum into regulated voltage instead of waste heat.
              </p>
            </div>
            <div class="p-6 rounded-[2rem] bg-surface-container-low space-y-2">
              <h3 class="text-headline-sm text-on-surface font-semibold">Built-In Anti-Lock Safety</h3>
              <p class="text-body-sm text-on-surface-variant">
                Because maximum braking torque is bounded by generator electrical load rather than
                hard pad clamping, the front tire resists skidding on wet asphalt.
              </p>
            </div>
            <div class="p-6 rounded-[2rem] bg-surface-container-low space-y-2">
              <h3 class="text-headline-sm text-on-surface font-semibold">Always Charged Devices</h3>
              <p class="text-body-sm text-on-surface-variant">
                Feeds a small buffer capacitor/battery with a steady regulator for smartphones,
                headlights, and HUD accessories.
              </p>
            </div>
            <div class="p-6 rounded-[2rem] bg-surface-container-low space-y-2">
              <h3 class="text-headline-sm text-on-surface font-semibold">Minimal Pad Wear</h3>
              <p class="text-body-sm text-on-surface-variant">
                Dramatically lowers brake-pad dust and service replacements—cleaner wheels and lower
                lifetime ownership cost.
              </p>
            </div>
          </div>

          <div class="pt-2">
            <a
              routerLink="/store/concept"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface text-label-md hover:bg-surface-container-highest transition-colors"
            >
              <span>Inspect Related E-Bike Concept Hardware</span>
              <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
            </a>
          </div>
        </section>
      }
    </div>
  `,
})
export class TechSubpages {
  private readonly route = inject(ActivatedRoute);

  readonly tabs = TECH_TABS;
  readonly apps = ASHBIKE_APPS;
  readonly sensors = FUSION_SENSORS;

  readonly activeSection = toSignal(
    this.route.data.pipe(map((d) => (d['section'] as TechSubSection | undefined) ?? 'app')),
    {initialValue: 'app' as TechSubSection},
  );

  readonly hudAlertActive = signal(false);
  readonly stopPresets = [15, 30, 60, 100];
  readonly stopsPerTrip = signal(30);
  readonly capturedWh = computed(() => Math.round(this.stopsPerTrip() * 0.28 * 10) / 10);
  readonly phoneBoostPct = computed(() => Math.min(100, Math.round((this.capturedWh() / 18) * 100)));
}
