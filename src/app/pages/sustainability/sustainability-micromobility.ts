import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {SectionSubnav} from '../../components/section-subnav';
import {CYCLE_RICKSHAW_ADVANTAGES, SUSTAINABILITY_TABS} from '../../data/ashbike-data';

type MicroSection = 'micro-mobility' | 'cycle-rickshaw' | 'e-mobility';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sustainability-micromobility',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="tabs" ariaLabel="Sustainability sub-navigation" />

      @if (activeSection() === 'micro-mobility') {
        <!-- SMART CITIES & MICRO MOBILITY -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Smart Cities &amp; Micro Mobility
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              A Path to Healthier Communities &amp; Cleaner Urban Corridors
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              By shifting short car commutes onto bicycles, e-bikes, and electric pedicabs, cities
              simultaneously relieve gridlock, cut greenhouse gases, reduce dependence on fossil
              oil, and transform public health.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-5">
              <h2 class="text-headline-md text-secondary font-semibold">
                Environmental &amp; City Systems Solved
              </h2>
              <div class="space-y-4 text-body-sm text-on-surface-variant">
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    01. Reducing City Congestion
                  </h3>
                  <p>
                    Compact bicycles let dramatically more commuters move per lane while freeing
                    asphalt for green parks and pedestrian plazas.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    02. Cutting Back on Air Pollution
                  </h3>
                  <p>
                    Negligible CO₂ and zero tailpipe particulates keep residential air breathable for
                    children, commuters, and wildlife.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    03. Decreasing Reliance on Foreign &amp; Domestic Oil
                  </h3>
                  <p>
                    Relying on muscle power and rechargeable battery cells shields local economies
                    from volatile fossil fuel shocks.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-5">
              <h2 class="text-headline-md text-primary font-semibold">
                Rider Health &amp; Wellness Outcomes
              </h2>
              <div class="space-y-4 text-body-sm text-on-surface-variant">
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">01. Reducing Obesity</h3>
                  <p>
                    Active commuting builds daily aerobic burn naturally into work and errand
                    routines without needing extra gym hours.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    02. Lowering Risks of Heart Disease
                  </h3>
                  <p>
                    Even brief 20-minute daily rides strengthen cardiac muscles, improve vascular
                    circulation, and support healthy blood pressure.
                  </p>
                </div>
                <div>
                  <h3 class="text-label-lg text-on-surface font-semibold">
                    03. Managing &amp; Preventing Diabetes
                  </h3>
                  <p>
                    Low-impact rhythmic pedaling improves insulin sensitivity and helps regulate blood
                    glucose consistently across the week.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              routerLink="/sustainability/micro-mobility/cycle-rickshaw"
              class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Fleet Alternative
                </span>
                <h3 class="text-headline-sm text-on-surface font-semibold mt-1">
                  Why Electric Bike Cabs Beat Scattered E-Scooters
                </h3>
              </div>
              <mat-icon class="material-symbols-outlined text-primary text-[24px]">
                arrow_forward
              </mat-icon>
            </a>

            <a
              routerLink="/sustainability/micro-mobility/e-mobility"
              class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
                  Field Ecosystem
                </span>
                <h3 class="text-headline-sm text-on-surface font-semibold mt-1">
                  eMobility Solution: eTruck, eBike &amp; Phone Fix
                </h3>
              </div>
              <mat-icon class="material-symbols-outlined text-secondary text-[24px]">
                arrow_forward
              </mat-icon>
            </a>
          </div>
        </section>
      } @else if (activeSection() === 'cycle-rickshaw') {
        <!-- CYCLE RICKSHAW / ELECTRIC BIKE CABS -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-10">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Human-Centered Ride Hailing
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              Why Electric Bike Cabs Outperform Dockless E-Scooter Fleets
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Instead of scattered e-scooters plagued by vandalism and constant rebalancing vans,
              driver-operated electric bike cabs offer a durable, community-friendly alternative to
              both cars and scooters.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (adv of rickshawAdvantages; track adv.title; let i = $index) {
              <article class="p-7 rounded-[2rem] bg-surface-container-low space-y-3">
                <span class="text-label-md text-primary font-semibold tabular-nums">
                  0{{ i + 1 }}
                </span>
                <h2 class="text-headline-sm text-on-surface font-semibold">{{ adv.title }}</h2>
                <p class="text-body-sm text-on-surface-variant">{{ adv.description }}</p>
              </article>
            }
          </div>
        </section>
      } @else {
        <!-- E-MOBILITY SOLUTION -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-10">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Connected Field Service
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              eMobility Solution: eTruck, eBike &amp; Phone Fix for Commute &amp; World
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Sustainable micro-mobility thrives when vehicle maintenance and digital devices stay
              operational. Our combined e-mobility model unites zero-emission light utility trucks,
              daily commuter e-bikes, and rapid mobile phone servicing.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-3">
              <div
                class="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center"
              >
                <mat-icon class="material-symbols-outlined text-[24px]">local_shipping</mat-icon>
              </div>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                eTruck Mobile Support
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Electric service vans carry spare wheels, belt drives, and rapid battery packs right
                to busy city bike hubs without diesel idling.
              </p>
            </div>

            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-3">
              <div
                class="w-12 h-12 rounded-2xl bg-primary-fixed/60 text-primary flex items-center justify-center"
              >
                <mat-icon class="material-symbols-outlined text-[24px]">electric_bike</mat-icon>
              </div>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                eBike Commuter Fleet
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Lightweight urban commuters and electric bike cabs engineered for thousands of
                trouble-free city kilometers.
              </p>
            </div>

            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-3">
              <div
                class="w-12 h-12 rounded-2xl bg-tertiary-fixed/70 text-tertiary flex items-center justify-center"
              >
                <mat-icon class="material-symbols-outlined text-[24px]">build</mat-icon>
              </div>
              <h2 class="text-headline-sm text-on-surface font-semibold">
                On-the-Spot Phone Fix
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Since the smartphone serves as the brain of the modern bicycle, fast screen and
                battery care keeps riders navigated and connected.
              </p>
            </div>
          </div>
        </section>
      }
    </div>
  `,
})
export class SustainabilityMicroMobility {
  private readonly route = inject(ActivatedRoute);
  readonly tabs = SUSTAINABILITY_TABS;
  readonly rickshawAdvantages = CYCLE_RICKSHAW_ADVANTAGES;

  readonly activeSection = toSignal(
    this.route.data.pipe(map((d) => (d['section'] as MicroSection | undefined) ?? 'micro-mobility')),
    {initialValue: 'micro-mobility' as MicroSection},
  );
}
