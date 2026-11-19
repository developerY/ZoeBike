import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {SectionSubnav} from '../../components/section-subnav';
import {
  CITIES_COMMERCE_POINTS,
  SUSTAINABILITY_TABS,
  VERTICAL_PARKING_PILLARS,
} from '../../data/ashbike-data';

type CitiesSection = 'cities' | 'parking' | 'la' | 'ny';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sustainability-cities',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="tabs" ariaLabel="Sustainability sub-navigation" />

      @if (activeSection() === 'cities') {
        <!-- CITIES & LOCAL COMMERCE -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Cities &amp; Urban Economics
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              How Bike Traffic Boosts Local Businesses
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Switching short urban trips from cars to bicycles isn’t just good for climate targets
              and rider health—it transforms neighborhood storefronts into vibrant, high-conversion
              streetscapes.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (point of commercePoints; track point.title) {
              <article
                class="p-8 rounded-[2rem] bg-surface-container-low space-y-3 flex flex-col justify-between"
              >
                <div class="space-y-3">
                  <div
                    class="w-12 h-12 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center"
                  >
                    <mat-icon class="material-symbols-outlined text-[24px]">{{ point.icon }}</mat-icon>
                  </div>
                  <h2 class="text-headline-sm text-on-surface font-semibold">{{ point.title }}</h2>
                  <p class="text-body-sm text-on-surface-variant">{{ point.description }}</p>
                </div>
              </article>
            }
          </div>

          <div
            class="p-8 rounded-[2rem] bg-secondary-container/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div class="space-y-1.5 max-w-2xl">
              <h2 class="text-headline-md text-on-surface font-semibold">
                More Feet. More Bicycles. Thriving Commercial Corridors.
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                By embracing bike-friendly lanes and space-saving parking towers, cities turn gridlocked
                curb lanes into bustling walkable plazas.
              </p>
            </div>
            <a
              routerLink="/sustainability/cities/parking"
              class="px-6 py-3.5 rounded-full bg-primary text-on-primary text-label-lg whitespace-nowrap shrink-0 hover:bg-primary-container transition-colors"
            >
              See Vertical Bike Tower →
            </a>
          </div>
        </section>
      } @else if (activeSection() === 'parking') {
        <!-- VERTICAL BIKE PARKING (PEZ DISPENSER CONCEPT) -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-6 space-y-4">
              <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
                A Vertical Solution for a Horizontal Problem
              </span>
              <h1 class="text-headline-xl text-on-surface tracking-tight">
                Bike Parking Reimagined—Just Like a PEZ Dispenser
              </h1>
              <p class="text-body-lg text-on-surface-variant">
                Imagine an elegant automated tower that stores and delivers your bicycle at the
                push of a button. Instead of cluttering sidewalks, our Bike Tower stacks bicycles
                upward—keeping rides weatherproof, theft-resistant, and returning ground space to
                pedestrians.
              </p>
            </div>

            <!-- Interactive Footprint Comparison Widget -->
            <div
              class="lg:col-span-6 p-7 sm:p-8 rounded-[2rem] bg-surface-container-lowest shadow-lg space-y-6"
            >
              <div class="flex items-center justify-between gap-3">
                <div>
                  <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                    Sidewalk Footprint Simulator
                  </span>
                  <h2 class="text-headline-sm text-on-surface font-semibold">
                    Ground Racks vs. Vertical Bike Tower
                  </h2>
                </div>
                <span class="text-label-lg text-secondary font-bold tabular-nums">
                  {{ parkedBikeCount() }} Bikes
                </span>
              </div>

              <div class="flex flex-wrap gap-2">
                @for (qty of bikeQuantities; track qty) {
                  <button
                    type="button"
                    (click)="parkedBikeCount.set(qty)"
                    class="px-4 py-2 rounded-full text-label-md transition-colors cursor-pointer tabular-nums"
                    [class]="
                      parkedBikeCount() === qty
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    "
                  >
                    {{ qty }} Bicycles
                  </button>
                }
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-5 rounded-2xl bg-surface-container-low space-y-1">
                  <span class="text-label-sm text-on-surface-variant">Traditional Curb Racks</span>
                  <p class="text-headline-md font-semibold text-on-surface tabular-nums">
                    {{ groundAreaSqM() }} m²
                  </p>
                  <p class="text-body-sm text-on-surface-variant">
                    Exposed to rain, theft risk &amp; crowded sidewalks
                  </p>
                </div>
                <div class="p-5 rounded-2xl bg-secondary-container/35 space-y-1">
                  <span class="text-label-sm text-on-secondary-fixed-variant">
                    Vertical Bike Tower
                  </span>
                  <p class="text-headline-md font-semibold text-secondary tabular-nums">
                    {{ towerAreaSqM() }} m²
                  </p>
                  <p class="text-body-sm text-on-secondary-fixed-variant">
                    Saves {{ spaceSavedPct() }}% ground footprint · Weatherproof
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (pillar of parkingPillars; track pillar.title) {
              <div class="p-6 rounded-[2rem] bg-surface-container-low space-y-3">
                <div
                  class="w-11 h-11 rounded-2xl bg-surface-container-lowest text-secondary flex items-center justify-center shadow-xs"
                >
                  <mat-icon class="material-symbols-outlined text-[22px]">{{ pillar.icon }}</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold">{{ pillar.title }}</h3>
                <p class="text-body-sm text-on-surface-variant">{{ pillar.description }}</p>
              </div>
            }
          </div>
        </section>
      } @else if (activeSection() === 'la') {
        <!-- LA 2028 INITIATIVE -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-10">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Los Angeles Regional Mobility · PeopleForBikes &amp; LA Metro
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              28 Projects by 2028 Games — Building the Future of Biking in Los Angeles
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              LA Metro’s Twenty-Eight by ’28 Initiative unites transit expansions with protected
              first- and last-mile cycling corridors so spectators and everyday Angelenos can glide
              across the basin car-free.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <span class="text-headline-md font-semibold text-primary tabular-nums">28</span>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Priority Transit &amp; Greenway Corridors
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Linking rail stations directly to major venues and neighborhoods via continuous
                active-transport bike lanes.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <span class="text-headline-md font-semibold text-secondary tabular-nums">Zero-Car</span>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Olympic Spectator Last Mile
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Pairing Go Swift shared bikes and electric pedicabs at Metro stops eliminates game-day
                freeway gridlock.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2.5">
              <span class="text-headline-md font-semibold text-tertiary tabular-nums">2028+</span>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Lasting Clean-Air Legacy
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Connected bike infrastructure championed with PeopleForBikes leaves Southern California
                cleaner long after the closing ceremony.
              </p>
            </div>
          </div>
        </section>
      } @else {
        <!-- NEW YORK CYCLING VISION -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-10">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
              New York Five-Borough Vision
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              Reclaiming New York Streets for Cyclists, Pedestrians &amp; Clean Transit
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              In dense vertical cities like New York, replacing single-occupant rides with compact
              featherweight e-bikes, shared stations, and vertical bike towers transforms congested
              avenues into high-capacity human corridors.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Bridge &amp; River Greenways
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Dedicated cross-river bike lanes paired with regenerative hill-assist turn Brooklyn,
                Queens, and Manhattan bridges into predictable 15-minute commutes.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Walk-Up &amp; Elevator Friendly
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                At 14.2 kg or docked inside street-level PEZ Bike Towers, bikes fit fifth-floor
                brownstones and transit hubs alike.
              </p>
            </div>
            <div class="p-7 rounded-[2rem] bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Congestion Relief &amp; Quiet Blocks
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Shifting short crosstown trips onto two wheels cuts honking, delivery friction, and
                street-level particulate emissions.
              </p>
            </div>
          </div>
        </section>
      }
    </div>
  `,
})
export class SustainabilityCities {
  private readonly route = inject(ActivatedRoute);
  readonly tabs = SUSTAINABILITY_TABS;
  readonly commercePoints = CITIES_COMMERCE_POINTS;
  readonly parkingPillars = VERTICAL_PARKING_PILLARS;

  readonly activeSection = toSignal(
    this.route.data.pipe(map((d) => (d['section'] as CitiesSection | undefined) ?? 'cities')),
    {initialValue: 'cities' as CitiesSection},
  );

  readonly bikeQuantities = [12, 24, 48, 96];
  readonly parkedBikeCount = signal(48);

  readonly groundAreaSqM = computed(() => Math.round(this.parkedBikeCount() * 1.8));
  readonly towerAreaSqM = computed(() => Math.max(6, Math.round(this.parkedBikeCount() * 0.25)));
  readonly spaceSavedPct = computed(() =>
    Math.round(((this.groundAreaSqM() - this.towerAreaSqM()) / this.groundAreaSqM()) * 100),
  );
}
