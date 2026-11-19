import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {SectionSubnav} from '../../components/section-subnav';
import {BIKES_STORE_TABS} from '../../data/ashbike-data';
import {ZOE_IMAGES} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

type StoreSection = 'store' | 'concept';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-store',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="tabs" ariaLabel="Bikes and Store navigation" />

      @if (activeSection() === 'store') {
        <!-- STORE & H2E-BIKE -->
        <section class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 space-y-12">
          <div
            class="rounded-2xl bg-pearl border border-mineral-line p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div class="lg:col-span-7 space-y-5">
              <p class="text-sm font-medium text-ocean">Crazy Dream · Flagship Future Vision</p>
              <h1 class="font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.08]">
                Unbelievable, Unimaginable and Unattainable—but if we make it, it will be
                Undeniably Unforgettable.
              </h1>
              <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Introducing the <strong class="text-slate-900">H₂E-Bike</strong>—our pursuit of the
                world’s most advanced hydrogen-assisted electric bicycle, paired with zero-emission
                refueling and featherweight alpine agility.
              </p>
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  (click)="reserveInterest('H₂E-Bike Concept')"
                  class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  {{ reservedH2() ? 'Early Access Requested ✓' : 'Join H₂E-Bike Waitlist' }}
                </button>
                <a
                  routerLink="/bikes"
                  class="px-5 py-3 rounded-xl bg-white hover:bg-mineral border border-slate-200 text-slate-800 text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Configure Zoe Air &amp; Flow Now
                </a>
              </div>
            </div>

            <div class="lg:col-span-5">
              <div class="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
                <img
                  [src]="images.heroBike"
                  alt="H2E-Bike and Zoe featherweight hydrogen concept commuter silhouette"
                  class="w-full h-56 object-contain"
                  referrerpolicy="no-referrer"
                />
                <div class="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                  <span class="font-semibold text-ocean">H₂E-Bike Architecture</span>
                  <span class="text-slate-500">Zero Tailpipe · Rapid Swappable Cell</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Available Commuter Builds Grid -->
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 class="text-headline-lg text-on-surface tracking-tight">
                  Ready-to-Ride Production Models
                </h2>
                <p class="text-body-md text-on-surface-variant">
                  Configure our shipping featherweight e-bikes while exploring future H₂ concepts.
                </p>
              </div>
              <a
                routerLink="/bikes"
                class="text-label-lg text-primary hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Open Full Palette Customizer</span>
                <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-4">
                <img
                  [src]="images.zoeAirHome"
                  alt="Zoe Air 01"
                  class="w-full h-44 object-contain"
                  referrerpolicy="no-referrer"
                />
                <h3 class="text-headline-sm text-on-surface font-semibold">Zoe Air 01</h3>
                <p class="text-body-sm text-on-surface-variant">
                  14.2 kg featherweight commuter with Gates carbon belt and AI TorqueSense.
                </p>
                <a
                  routerLink="/bikes"
                  class="inline-flex items-center gap-1.5 text-label-md text-primary font-semibold"
                >
                  <span>Configure — $1,850</span>
                  <mat-icon class="material-symbols-outlined text-[16px]">chevron_right</mat-icon>
                </a>
              </div>

              <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-4">
                <img
                  [src]="images.zoeFlowHome"
                  alt="Zoe Flow Wave"
                  class="w-full h-44 object-contain"
                  referrerpolicy="no-referrer"
                />
                <h3 class="text-headline-sm text-on-surface font-semibold">Zoe Flow Wave</h3>
                <p class="text-body-sm text-on-surface-variant">
                  Ultra-low 39 cm step-through geometry crafted for relaxed city poise.
                </p>
                <a
                  routerLink="/bikes"
                  class="inline-flex items-center gap-1.5 text-label-md text-primary font-semibold"
                >
                  <span>Configure — $1,980</span>
                  <mat-icon class="material-symbols-outlined text-[16px]">chevron_right</mat-icon>
                </a>
              </div>

              <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-4">
                <img
                  [src]="images.aboutBanner"
                  alt="Zoe Concept Archive"
                  class="w-full h-44 object-cover rounded-2xl"
                  referrerpolicy="no-referrer"
                />
                <h3 class="text-headline-sm text-on-surface font-semibold">E-Bike Concept Lab</h3>
                <p class="text-body-sm text-on-surface-variant">
                  Explore experimental hydrogen storage, regenerative hubs, and HUD prototyping.
                </p>
                <a
                  routerLink="/store/concept"
                  class="inline-flex items-center gap-1.5 text-label-md text-secondary font-semibold"
                >
                  <span>Explore Concepts</span>
                  <mat-icon class="material-symbols-outlined text-[16px]">chevron_right</mat-icon>
                </a>
              </div>
            </div>
          </div>
        </section>
      } @else {
        <!-- E-BIKE CONCEPTS -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-10">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Experimental Mobility R&amp;D
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">E-Bike Concepts</h1>
            <p class="text-body-lg text-on-surface-variant">
              Select a prototype concept to inspect how ZoeBike and AshBike are pushing clean
              propulsion, regenerative braking, and smartphone-guided bicycles forward.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-5 flex flex-col gap-3">
              @for (item of concepts; track item.id) {
                <button
                  type="button"
                  (click)="selectedConceptId.set(item.id)"
                  class="p-5 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between gap-3"
                  [class]="
                    selectedConceptId() === item.id
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  "
                >
                  <div>
                    <span class="text-label-lg font-semibold block">{{ item.title }}</span>
                    <span
                      class="text-body-sm block"
                      [class]="
                        selectedConceptId() === item.id
                          ? 'text-on-primary/85'
                          : 'text-on-surface-variant'
                      "
                    >
                      {{ item.subtitle }}
                    </span>
                  </div>
                  <mat-icon class="material-symbols-outlined text-[20px]">{{ item.icon }}</mat-icon>
                </button>
              }
            </div>

            <div class="lg:col-span-7 p-8 rounded-[2rem] bg-surface-container-lowest shadow-md space-y-5">
              @let active = currentConcept();
              <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                {{ active.stage }}
              </span>
              <h2 class="text-headline-md text-on-surface font-semibold">{{ active.title }}</h2>
              <p class="text-body-md text-on-surface-variant">{{ active.summary }}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                @for (spec of active.specs; track spec.label) {
                  <div class="p-4 rounded-2xl bg-surface-container-low">
                    <span class="text-label-sm text-on-surface-variant block">{{ spec.label }}</span>
                    <span class="text-label-lg font-semibold text-on-surface mt-1 block">
                      {{ spec.value }}
                    </span>
                  </div>
                }
              </div>
              <div class="pt-3 flex flex-wrap gap-3">
                <a
                  routerLink="/tech/electric-brakes"
                  class="px-6 py-3 rounded-full bg-surface-container-high text-on-surface text-label-md hover:bg-surface-container-highest transition-colors"
                >
                  Inspect Regenerative Brakes
                </a>
                <a
                  routerLink="/sustainability/cities/parking"
                  class="px-6 py-3 rounded-full bg-secondary-container/50 text-on-secondary-fixed-variant text-label-md hover:bg-secondary-container transition-colors"
                >
                  See Vertical Parking Compatibility
                </a>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  `,
})
export class Store {
  private readonly route = inject(ActivatedRoute);
  private readonly state = inject(ZoeState);

  readonly tabs = BIKES_STORE_TABS;
  readonly images = ZOE_IMAGES;
  readonly reservedH2 = signal(false);

  readonly activeSection = toSignal(
    this.route.data.pipe(map((d) => (d['section'] as StoreSection | undefined) ?? 'store')),
    {initialValue: 'store' as StoreSection},
  );

  readonly concepts = [
    {
      id: 'h2',
      title: 'H₂E-Bike Flagship Concept',
      subtitle: 'Swappable hydrogen fuel-cell urban bike',
      stage: 'Crazy Dream · Concept Architecture',
      icon: 'science',
      summary:
        'A lightweight commuter pairing a compact solid-state hydrogen cartridge with zero-emission fuel cell stacks—refueling in seconds with pure water vapor exhaust.',
      specs: [
        {label: 'Energy Carrier', value: 'Compact H₂ Cartridge'},
        {label: 'Byproduct', value: 'Pure Water Vapor Only'},
        {label: 'Refuel Speed', value: '< 30 sec Cartridge Swap'},
        {label: 'Target Range', value: '120+ km Urban Loop'},
      ],
    },
    {
      id: 'regen',
      title: 'Front Generator Braking Hub',
      subtitle: 'Anti-lock electromagnetic deceleration',
      stage: 'Active Prototype · Safety & Power',
      icon: 'bolt',
      summary:
        'Replaces friction-heavy front brake pads with a modulated electromagnetic generator that harvests kinetic stopping energy into capacitors to keep smartphones and headlights charged.',
      specs: [
        {label: 'Lock-Up Prevention', value: 'Intrinsic Load Limit'},
        {label: 'Harvested Power', value: 'Phones, HUD & Lights'},
        {label: 'Pad Wear', value: 'Reduced Maintenance'},
        {label: 'Wet Weather Grip', value: 'Smooth Modulation'},
      ],
    },
    {
      id: 'brain',
      title: 'BicycleBrain Smartphone Dock',
      subtitle: 'Phone sensors as the central e-bike ECU',
      stage: 'Phase 1 Integration',
      icon: 'smartphone',
      summary:
        'Instead of proprietary locked dashboards, your smartphone docks magnetically to run neural crash detection, computer-vision hazard alerts, and BLE suspension tuning.',
      specs: [
        {label: 'Sensor Suite', value: 'GPS · IMU · Barometer · Cam'},
        {label: 'Storage Philosophy', value: '100% On-Device Local DB'},
        {label: 'Health Integrations', value: 'Apple Health & Google Health Connect'},
        {label: 'Wearable Extension', value: 'Go Swift WearOS & Smart HUD'},
      ],
    },
  ];

  readonly selectedConceptId = signal('h2');

  currentConcept() {
    return this.concepts.find((c) => c.id === this.selectedConceptId()) ?? this.concepts[0];
  }

  reserveInterest(item: string): void {
    this.reservedH2.set(true);
    this.state.showToast(`${item} — added to your preview updates!`);
  }
}
