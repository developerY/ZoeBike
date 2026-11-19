import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {SectionSubnav} from '../../components/section-subnav';
import {
  PLANET_BENEFITS,
  RIDER_BENEFITS,
  SUSTAINABILITY_TABS,
} from '../../data/ashbike-data';
import {ZOE_IMAGES} from '../../data/zoebike-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sustainability',
  imports: [RouterLink, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="tabs" ariaLabel="Sustainability sub-navigation" />

      <!-- HERO SECTION -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-12">
        <div
          class="rounded-2xl border border-outline-variant bg-surface p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div class="lg:col-span-7 space-y-5">
            <p class="text-label-md text-secondary font-semibold">
              Community <span class="text-outline-variant mx-1" aria-hidden="true">·</span> Shared
              Bikes R 4 U
            </p>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              We Are All Athletes Using Our Energy to Save Our Planet and Ourselves.
            </h1>
            <p class="text-body-lg text-on-surface-variant max-w-2xl">
              Sustainability begins the moment two wheels replace a two-ton car. From shared dock
              ecosystems and vertical bike towers to health-rewarded commuting, biking restores
              both personal vitality and living cities.
            </p>
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a
                routerLink="/sustainability/cities/parking"
                class="px-6 py-3 rounded-xl bg-primary text-on-primary text-label-lg hover:bg-primary-container transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore Vertical Bike Parking</span>
                <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
              </a>
              <a
                routerLink="/sustainability/micro-mobility"
                class="px-6 py-3 rounded-xl border border-outline-variant bg-surface text-on-surface text-label-lg hover:bg-surface-container-low transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Smart Cities &amp; Health</span>
              </a>
            </div>
          </div>

          <div class="lg:col-span-5 space-y-4">
            <div
              class="p-6 rounded-2xl border border-outline-variant bg-surface-container-low space-y-3"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 rounded-xl border border-outline-variant bg-surface text-secondary flex items-center justify-center shrink-0"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">directions_bike</mat-icon>
                </div>
                <div>
                  <h2 class="text-headline-sm text-on-surface font-semibold">
                    Go Swift Shared Bikes
                  </h2>
                  <p class="text-body-sm text-on-surface-variant">
                    Community-first station bikes powered by rider energy.
                  </p>
                </div>
              </div>
              <div class="pt-3 border-t border-outline-variant/60 space-y-2.5 text-body-sm">
                <div class="flex items-start gap-2.5">
                  <mat-icon class="material-symbols-outlined text-primary text-[18px] mt-0.5">
                    emoji_events
                  </mat-icon>
                  <p class="text-on-surface-variant">
                    <strong class="text-on-surface">Go Swift iOS App:</strong> Connects calendar
                    schedules and Apple Health stats to unlock NFT fitness rewards.
                  </p>
                </div>
                <div class="flex items-start gap-2.5">
                  <mat-icon class="material-symbols-outlined text-secondary text-[18px] mt-0.5">
                    watch
                  </mat-icon>
                  <p class="text-on-surface-variant">
                    <strong class="text-on-surface">Go Swift WearOS App:</strong> Purpose-built
                    smartwatch face for zero-phone glanceable trips.
                  </p>
                </div>
              </div>
            </div>

            <a
              routerLink="/about"
              class="block rounded-2xl border border-outline-variant overflow-hidden bg-inverse-surface group relative h-40"
            >
              <img
                [src]="images.aboutBanner"
                alt="ZoeBike planetary cycling horizon"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerpolicy="no-referrer"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/35 to-transparent p-5 flex flex-col justify-end"
              >
                <span class="text-label-sm text-primary-fixed font-medium">
                  AI-Assisted Clean Mobility
                </span>
                <span class="text-label-lg text-on-primary font-semibold">
                  See How ZoeBike AI Reduces Grid &amp; Urban Emissions →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- TWO SIDES OF CYCLING: RIDER & PLANET -->
      <section class="w-full bg-surface-container-low/50 py-14">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 space-y-10">
          <div class="max-w-2xl">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Dual Impact Manifesto
            </span>
            <h2 class="text-headline-lg text-on-surface tracking-tight mt-1">
              Benefits to the Rider &amp; to the Planet
            </h2>
            <p class="text-body-md text-on-surface-variant mt-2">
              Every pedal stroke compounds two dividends simultaneously: stronger human health and a
              cooler, quieter biosphere.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Rider Benefits Column -->
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                <h3 class="text-headline-md text-primary font-semibold">For the Rider</h3>
                <span class="text-label-sm text-on-surface-variant">Mind · Body · Wallet</span>
              </div>
              @for (item of riderBenefits; track item.title) {
                <div
                  class="p-6 rounded-3xl bg-surface-container-lowest shadow-xs flex items-start gap-4"
                >
                  <div
                    class="w-11 h-11 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center shrink-0"
                  >
                    <mat-icon class="material-symbols-outlined text-[22px]">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="space-y-1">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <h4 class="text-label-lg text-on-surface font-semibold">{{ item.title }}</h4>
                      <span class="text-label-sm text-primary font-semibold tabular-nums">
                        {{ item.metric }}
                      </span>
                    </div>
                    <p class="text-body-sm text-on-surface-variant">{{ item.detail }}</p>
                  </div>
                </div>
              }
            </div>

            <!-- Planet Benefits Column -->
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                <h3 class="text-headline-md text-secondary font-semibold">For the Planet</h3>
                <span class="text-label-sm text-on-surface-variant">Air · Carbon · Quiet Cities</span>
              </div>
              @for (item of planetBenefits; track item.title) {
                <div
                  class="p-6 rounded-3xl bg-surface-container-lowest shadow-xs flex items-start gap-4"
                >
                  <div
                    class="w-11 h-11 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0"
                  >
                    <mat-icon class="material-symbols-outlined text-[22px]">{{ item.icon }}</mat-icon>
                  </div>
                  <div class="space-y-1">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <h4 class="text-label-lg text-on-surface font-semibold">{{ item.title }}</h4>
                      <span class="text-label-sm text-secondary font-semibold tabular-nums">
                        {{ item.metric }}
                      </span>
                    </div>
                    <p class="text-body-sm text-on-surface-variant">{{ item.detail }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- SUSTAINABILITY TOPIC DIRECTORY -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div class="max-w-2xl mb-8">
          <h2 class="text-headline-lg text-on-surface tracking-tight">
            Explore Sustainability Initiatives &amp; Urban Blueprints
          </h2>
          <p class="text-body-md text-on-surface-variant mt-2">
            Dive into every urban blueprint, vertical parking innovation, and micro-mobility model
            from our sustainability research.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (card of subPageDirectory; track card.route) {
            <a
              [routerLink]="card.route"
              class="group p-7 rounded-[2rem] bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-lg transition-all flex flex-col justify-between gap-5"
            >
              <div class="space-y-3">
                <div
                  class="w-12 h-12 rounded-2xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs"
                >
                  <mat-icon class="material-symbols-outlined text-[24px]">{{ card.icon }}</mat-icon>
                </div>
                <h3 class="text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  {{ card.title }}
                </h3>
                <p class="text-body-sm text-on-surface-variant">{{ card.description }}</p>
              </div>
              <span class="inline-flex items-center gap-1.5 text-label-md text-primary font-semibold">
                <span>Read Initiative</span>
                <mat-icon class="material-symbols-outlined text-[16px]">arrow_forward</mat-icon>
              </span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class Sustainability {
  readonly tabs = SUSTAINABILITY_TABS;
  readonly riderBenefits = RIDER_BENEFITS;
  readonly planetBenefits = PLANET_BENEFITS;
  readonly images = ZOE_IMAGES;

  readonly subPageDirectory = [
    {
      title: 'How Bikes Boost Local Business',
      description:
        'Why neighborhood storefronts, cafes, and local commerce flourish when streets welcome cyclists.',
      route: '/sustainability/cities',
      icon: 'storefront',
    },
    {
      title: 'PEZ-Style Vertical Bike Parking',
      description:
        'Automated elevated Bike Towers that rescue sidewalks from clutter and keep bikes weatherproof.',
      route: '/sustainability/cities/parking',
      icon: 'elevator',
    },
    {
      title: 'Los Angeles: 28 by ’28 Games',
      description:
        'LA Metro transit vision & PeopleForBikes greenway corridors preparing Southern California for 2028.',
      route: '/sustainability/cities/la',
      icon: 'wb_sunny',
    },
    {
      title: 'New York Bike Corridors',
      description:
        'High-density commuter arteries, bridge bikeways, and vertical parking for five-borough living.',
      route: '/sustainability/cities/ny',
      icon: 'location_city',
    },
    {
      title: 'Smart Cities & Micro Mobility',
      description:
        'Reducing congestion, emissions, oil dependence, obesity, heart disease, and diabetes together.',
      route: '/sustainability/micro-mobility',
      icon: 'public',
    },
    {
      title: 'Cycle Rickshaw & E-Mobility',
      description:
        'Durable electric bike cabs creating local driver jobs alongside eTruck & mobile repair ecosystems.',
      route: '/sustainability/micro-mobility/cycle-rickshaw',
      icon: 'electric_rickshaw',
    },
  ];
}
