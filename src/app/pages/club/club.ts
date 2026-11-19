import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {SectionSubnav} from '../../components/section-subnav';
import {BIKES_STORE_TABS} from '../../data/ashbike-data';
import {
  CLUB_EVENTS,
  GALLERY_POSTS,
  GalleryPost,
  RIDER_STORIES,
  RiderStory,
  SCENIC_ROUTES,
  ZOE_IMAGES,
} from '../../data/zoebike-data';
import {ZoeState} from '../../services/zoe-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-club',
  imports: [ReactiveFormsModule, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="storeTabs" ariaLabel="Bikes, Club and Store navigation" />
      <!-- Editorial Hero Section -->
      <section class="relative w-full overflow-hidden bg-surface-container-low">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14 lg:py-20">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <!-- Left Editorial Statement -->
            <div class="lg:col-span-6 space-y-5 z-10">
              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/50 text-secondary"
              >
                <span class="w-2 h-2 rounded-full bg-secondary"></span>
                <span class="text-label-sm uppercase tracking-wider">
                  The Sisterhood of Motion
                </span>
              </div>

              <h1 class="text-headline-xl text-on-surface leading-[1.05] tracking-tight">
                Riding Together, <br />
                <span class="italic font-normal text-primary">Unapologetically.</span>
              </h1>

              <p class="text-body-lg text-on-surface-variant max-w-xl">
                A sanctuary for the stylish, sustainable, and free-spirited. Whether threading
                through cobblestone alleys at dawn or pacing sunset skylines with friends, we ride
                for joy, elegance, and pure reclaimed energy.
              </p>

              <div class="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#events-calendar"
                  class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-on-primary text-label-lg shadow-md hover:bg-primary-container transition-all active:scale-[0.98]"
                >
                  Join a Group Ride
                </a>
                <a
                  href="#club-perks"
                  class="inline-flex items-center justify-center px-7 py-4 rounded-full bg-surface-container text-on-surface text-label-lg hover:bg-surface-container-high transition-all"
                >
                  Discover Club Perks
                </a>
              </div>

              <!-- Micro Stats Row -->
              <div class="grid grid-cols-3 gap-3 pt-4">
                <div>
                  <p class="text-headline-md text-primary font-semibold tabular-nums">14.8k</p>
                  <p class="text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Active Riders
                  </p>
                </div>
                <div>
                  <p class="text-headline-md text-secondary font-semibold tabular-nums">28</p>
                  <p class="text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Metros Covered
                  </p>
                </div>
                <div>
                  <p class="text-headline-md text-tertiary font-semibold tabular-nums">100%</p>
                  <p class="text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Clean Electric
                  </p>
                </div>
              </div>
            </div>

            <!-- Right Hero Visual Mosaic -->
            <div class="lg:col-span-6 relative">
              <div class="relative rounded-[2rem] overflow-hidden shadow-xl bg-surface-container">
                <img
                  class="w-full h-[460px] lg:h-[540px] object-cover"
                  alt="Diverse women pausing with Zoe electric bikes beside a Paris cafe awning"
                  [src]="images.clubHero"
                  referrerpolicy="no-referrer"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent"
                ></div>
                <div
                  class="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-surface/90 backdrop-blur-md flex items-center justify-between shadow-md gap-3"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0"
                    >
                      <mat-icon class="material-symbols-outlined text-[24px]">favorite</mat-icon>
                    </div>
                    <div>
                      <p class="text-label-lg text-on-surface">
                        Club Ride #114: Paris Le Marais
                      </p>
                      <p class="text-body-sm text-on-surface-variant">
                        42 riders · Sunday Morning Croissant Dash
                      </p>
                    </div>
                  </div>
                  <span
                    class="hidden sm:inline-flex px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm whitespace-nowrap"
                  >
                    Recap Open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- The Zoe Stories (In Conversation) -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div class="space-y-1">
            <span class="text-label-md uppercase tracking-wider text-primary">In Conversation</span>
            <h2 class="text-headline-lg text-on-surface">The Zoe Stories</h2>
          </div>
          <p class="text-body-md text-on-surface-variant max-w-md">
            Portraits of intentional living, reclaiming time, and rewriting the rhythm of our
            cities.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Lead Feature: Camille -->
          @let lead = stories[0];
          <article
            class="md:col-span-7 group flex flex-col rounded-[2rem] overflow-hidden bg-surface-container-low shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <button
              type="button"
              (click)="activeStory.set(lead)"
              class="w-full h-full flex flex-col text-left cursor-pointer"
            >
              <div class="relative w-full h-[340px] md:h-[420px] overflow-hidden bg-surface-container">
                <img
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  [alt]="lead.title"
                  [src]="lead.image"
                  referrerpolicy="no-referrer"
                />
                <span
                  class="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-label-sm text-on-surface"
                >
                  {{ lead.locationBadge }}
                </span>
              </div>

              <div class="p-7 flex-1 flex flex-col justify-between space-y-5 w-full">
                <div class="space-y-2">
                  <span class="text-label-sm text-primary uppercase tracking-wider">
                    {{ lead.issueLabel }}
                  </span>
                  <h3
                    class="text-headline-md text-on-surface group-hover:text-primary transition-colors"
                  >
                    {{ lead.title }}
                  </h3>
                  <p class="text-body-md text-on-surface-variant">{{ lead.excerpt }}</p>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <span class="text-label-md text-on-surface font-medium">
                    Model: {{ lead.model }}
                  </span>
                  <span
                    class="inline-flex items-center gap-1 text-label-lg text-primary group-hover:translate-x-1 transition-transform"
                  >
                    Read Profile
                    <mat-icon class="material-symbols-outlined text-[16px]">arrow_forward</mat-icon>
                  </span>
                </div>
              </div>
            </button>
          </article>

          <!-- Side Stacked Profiles -->
          <div class="md:col-span-5 flex flex-col gap-8">
            @for (story of stories.slice(1); track story.id) {
              <article
                class="group rounded-[2rem] overflow-hidden bg-surface-container-low shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <button
                  type="button"
                  (click)="activeStory.set(story)"
                  class="w-full flex flex-col text-left cursor-pointer"
                >
                  <div class="relative w-full h-[220px] overflow-hidden bg-surface-container">
                    <img
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      [alt]="story.title"
                      [src]="story.image"
                      referrerpolicy="no-referrer"
                    />
                    <span
                      class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-label-sm text-on-surface"
                    >
                      {{ story.locationBadge }}
                    </span>
                  </div>
                  <div class="p-5 space-y-2">
                    <span class="text-label-sm text-secondary uppercase tracking-wider">
                      {{ story.issueLabel }}
                    </span>
                    <h3
                      class="text-headline-sm text-on-surface group-hover:text-primary transition-colors"
                    >
                      {{ story.title }}
                    </h3>
                    <p class="text-body-sm text-on-surface-variant line-clamp-2">
                      {{ story.excerpt }}
                    </p>
                  </div>
                </button>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Interactive Events & Group Rides Calendar -->
      <section id="events-calendar" class="w-full bg-surface-container-low py-14">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div
            class="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8"
          >
            <div>
              <span class="text-label-md text-primary uppercase tracking-wider">
                Meet the Community
              </span>
              <h2 class="text-headline-lg text-on-surface">Upcoming Club Rides &amp; Salons</h2>
            </div>

            <!-- City Filter Controls -->
            <div class="flex flex-wrap gap-2">
              @for (filter of cityFilters; track filter.key) {
                <button
                  type="button"
                  (click)="selectedCityFilter.set(filter.key)"
                  class="px-4 py-2 rounded-full text-label-md transition-colors cursor-pointer whitespace-nowrap"
                  [class]="
                    selectedCityFilter() === filter.key
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  "
                >
                  {{ filter.label }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-4">
            @for (ev of filteredEvents(); track ev.id) {
              @let rsvped = state.rsvpedEventIds().includes(ev.id);
              <div
                class="p-5 lg:p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div class="flex items-start sm:items-center gap-5">
                  <div
                    class="flex flex-col items-center justify-center w-16 h-16 rounded-2xl shrink-0"
                    [class]="
                      ev.accentTone === 'primary'
                        ? 'bg-primary-fixed/40 text-on-primary-fixed'
                        : ev.accentTone === 'tertiary'
                          ? 'bg-tertiary-fixed/50 text-on-tertiary-fixed'
                          : 'bg-secondary-container/60 text-on-secondary-fixed'
                    "
                  >
                    <span class="text-label-sm uppercase tracking-wider">{{ ev.month }}</span>
                    <span class="text-headline-sm font-bold tabular-nums">{{ ev.day }}</span>
                  </div>

                  <div class="space-y-1">
                    <div class="flex flex-wrap items-center gap-2 text-label-sm">
                      <span
                        class="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary"
                      >
                        {{ ev.locationBadge }}
                      </span>
                      <span class="text-on-surface-variant">{{ ev.timeInfo }}</span>
                      <span
                        class="px-2.5 py-0.5 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed"
                      >
                        {{ ev.perkBadge }}
                      </span>
                    </div>
                    <h3 class="text-headline-sm text-on-surface">{{ ev.title }}</h3>
                    <p class="text-body-sm text-on-surface-variant">{{ ev.description }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4 justify-between lg:justify-end shrink-0">
                  <div class="text-left lg:text-right">
                    <p class="text-label-sm text-secondary font-medium tabular-nums">
                      {{ rsvped ? ev.spotsLeft - 1 : ev.spotsLeft }} Spots Left
                    </p>
                    <p class="text-label-sm text-on-surface-variant">{{ ev.levelLabel }}</p>
                  </div>
                  <button
                    type="button"
                    (click)="state.toggleEventRsvp(ev.id, ev.title)"
                    class="px-6 py-3 rounded-full text-label-md transition-all active:scale-95 shadow-sm whitespace-nowrap cursor-pointer"
                    [class]="
                      rsvped
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-primary text-on-primary hover:bg-primary-container'
                    "
                  >
                    {{ rsvped ? 'Attending ✓' : 'RSVP Free' }}
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Curated Scenic City Routes -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Route Selector & Waypoints -->
          <div class="lg:col-span-5 space-y-5">
            <div>
              <span class="text-label-md uppercase tracking-wider text-secondary">
                Rider-Tested Pathways
              </span>
              <h2 class="text-headline-lg text-on-surface">Curated Scenic Routes</h2>
              <p class="text-body-sm text-on-surface-variant mt-2">
                Car-light streets, shade-lined boulevards, artisanal stops, and postcard vistas
                hand-mapped by the Zoe collective.
              </p>
            </div>

            <div class="space-y-3">
              @for (route of routes; track route.id; let idx = $index) {
                <button
                  type="button"
                  (click)="selectedRouteIndex.set(idx)"
                  class="w-full text-left p-5 rounded-2xl transition-all cursor-pointer"
                  [class]="
                    selectedRouteIndex() === idx
                      ? 'bg-surface-container ring-1 ring-primary/40 shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  "
                >
                  <div class="flex items-center justify-between mb-1 gap-2">
                    <span class="text-headline-sm text-on-surface font-semibold">
                      {{ route.title }}
                    </span>
                    <span
                      class="px-2.5 py-0.5 rounded-full text-label-sm tabular-nums shrink-0"
                      [class]="
                        idx === 0
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : idx === 1
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      "
                    >
                      {{ route.distance }}
                    </span>
                  </div>
                  <p class="text-body-sm text-on-surface-variant">{{ route.summary }}</p>
                  <div class="mt-3 flex items-center gap-4 text-on-surface-variant text-label-sm">
                    <span class="flex items-center gap-1">
                      <mat-icon class="material-symbols-outlined text-[16px]">
                        nature_people
                      </mat-icon>
                      {{ route.bikePathPct }}
                    </span>
                    <span class="flex items-center gap-1">
                      <mat-icon class="material-symbols-outlined text-[16px]">
                        {{ route.highlightIcon }}
                      </mat-icon>
                      {{ route.highlight }}
                    </span>
                  </div>
                </button>
              }
            </div>

            <button
              type="button"
              (click)="exportGpx()"
              class="w-full py-3.5 rounded-full bg-surface-container text-on-surface text-label-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[18px]">download</mat-icon>
              <span>Export GPX to Zoe App</span>
            </button>
          </div>

          <!-- Map Display -->
          <div class="lg:col-span-7 flex flex-col">
            <div
              class="relative w-full h-[460px] lg:h-full min-h-[460px] rounded-[2rem] overflow-hidden shadow-md bg-surface-container"
            >
              <img
                [src]="images.routeMap"
                [alt]="activeRoute().locationLabel"
                class="w-full h-full object-cover"
                referrerpolicy="no-referrer"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-on-surface/55 via-transparent to-transparent pointer-events-none"
              ></div>

              <!-- Map Overlay Floating Card -->
              <div
                class="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-surface/92 backdrop-blur-md shadow-lg space-y-1.5"
              >
                <div class="flex items-center justify-between">
                  <span class="text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Featured Waypoint · {{ activeRoute().locationLabel }}
                  </span>
                  <span
                    class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm"
                  >
                    {{ activeRoute().waypointStop }}
                  </span>
                </div>
                <h4 class="text-headline-sm text-on-surface">{{ activeRoute().waypointTitle }}</h4>
                <p class="text-body-sm text-on-surface-variant">
                  {{ activeRoute().waypointDescription }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Zoe Club Membership Perks -->
      <section id="club-perks" class="w-full bg-surface-container-high py-14">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16">
          <div class="max-w-2xl mx-auto text-center space-y-2 mb-10">
            <span class="text-label-md text-primary uppercase tracking-wider">
              Belonging with Benefits
            </span>
            <h2 class="text-headline-lg text-on-surface">The Zoe Club Privileges</h2>
            <p class="text-body-md text-on-surface-variant">
              Membership is automatically bestowed upon every Zoe owner — and open to kindred
              cyclists seeking connection and peace of mind.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (perk of perks; track perk.title) {
              <div
                class="p-7 rounded-[2rem] bg-surface-container-lowest shadow-sm hover:-translate-y-1 transition-all space-y-4 flex flex-col justify-between"
              >
                <div class="space-y-3">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center"
                    [class]="perk.iconBgClass"
                  >
                    <mat-icon class="material-symbols-outlined text-[24px]">
                      {{ perk.icon }}
                    </mat-icon>
                  </div>
                  <h3 class="text-headline-sm text-on-surface font-semibold">{{ perk.title }}</h3>
                  <p class="text-body-sm text-on-surface-variant">{{ perk.description }}</p>
                </div>
                <span class="text-label-sm font-semibold tracking-wide" [class]="perk.footerClass">
                  {{ perk.footer }}
                </span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Live Customer Photo Grid (#MyZoeBike) -->
      <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div class="space-y-1">
            <span class="text-label-md uppercase tracking-wider text-primary">In The Wild</span>
            <h2 class="text-headline-lg text-on-surface">#MyZoeBike Gallery</h2>
          </div>
          <p class="text-body-sm text-on-surface-variant">
            Tag your rides on Instagram with
            <span class="font-semibold text-on-surface">#MyZoeBike</span> to be featured in our
            seasonal lookbook.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          @for (post of gallery; track post.handle) {
            <button
              type="button"
              (click)="activeGalleryPost.set(post)"
              class="relative group rounded-[2rem] overflow-hidden aspect-square bg-surface-container text-left cursor-pointer"
            >
              <img
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                [alt]="post.handle + ' in ' + post.city"
                [src]="post.image"
                referrerpolicy="no-referrer"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
              >
                <p class="text-label-sm text-on-primary">
                  {{ post.handle }} · {{ post.city }}
                </p>
              </div>
            </button>
          }
        </div>
      </section>

      <!-- Community Newsletter CTA Salon Banner -->
      <section class="w-full bg-surface-container-low mb-8">
        <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 py-14">
          <div
            class="relative rounded-[2rem] overflow-hidden bg-primary-container p-7 md:p-14 text-on-primary-container shadow-xl"
          >
            <div
              class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/20 pointer-events-none blur-2xl"
            ></div>
            <div
              class="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-secondary/15 pointer-events-none blur-2xl"
            ></div>

            <div class="relative z-10 max-w-2xl space-y-5">
              <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-primary-container/10 text-label-sm uppercase tracking-wider"
              >
                Weekly Dispatch
              </span>
              <h2 class="text-headline-lg font-semibold leading-tight">
                Never Ride Alone. Join the Zoe Club Circle.
              </h2>
              <p class="text-body-md text-on-primary-container/90">
                Sign up for secret route drops, early invitations to weekend group cruises, rider
                profiles, and member discounts delivered softly every Thursday.
              </p>

              <form
                (ngSubmit)="submitNewsletter()"
                class="flex flex-col sm:flex-row items-center gap-2 pt-2"
              >
                <input
                  [formControl]="newsletterEmail"
                  class="w-full sm:flex-1 px-6 py-4 rounded-full bg-surface text-on-surface placeholder:text-outline text-body-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="Your email address (e.g. camille@studio.com)"
                  type="email"
                  aria-label="Email address for Zoe Club Circle"
                />
                <button
                  type="submit"
                  class="w-full sm:w-auto px-8 py-4 rounded-full bg-surface-container-lowest text-primary text-label-lg hover:bg-surface-bright transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Join the Club
                </button>
              </form>

              @if (newsletterFeedback()) {
                <p class="text-label-sm text-on-primary-container/95 font-medium">
                  {{ newsletterFeedback() }}
                </p>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- STORY READER MODAL -->
      @if (activeStory(); as story) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close story"
            (click)="activeStory.set(null)"
            class="fixed inset-0 bg-on-background/45 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto space-y-5"
          >
            <button
              type="button"
              aria-label="Close story"
              (click)="activeStory.set(null)"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>

            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              {{ story.issueLabel }} · {{ story.locationBadge }}
            </span>
            <h3 class="text-headline-md text-on-surface font-semibold">{{ story.title }}</h3>
            <img
              [src]="story.image"
              [alt]="story.name"
              class="w-full h-64 object-cover rounded-2xl"
              referrerpolicy="no-referrer"
            />
            <p class="text-body-md text-on-surface italic">{{ story.excerpt }}</p>

            <div class="space-y-4 pt-2">
              @for (qa of story.fullInterview; track qa.question) {
                <div class="p-4 rounded-2xl bg-surface-container-low space-y-1.5">
                  <p class="text-label-lg text-on-surface font-semibold">{{ qa.question }}</p>
                  <p class="text-body-sm text-on-surface-variant">{{ qa.answer }}</p>
                </div>
              }
            </div>

            <div class="flex items-center justify-between pt-2">
              <span class="text-label-sm text-secondary font-semibold">
                Riding: {{ story.model }}
              </span>
              <button
                type="button"
                (click)="activeStory.set(null)"
                class="px-6 py-2.5 rounded-full bg-primary text-on-primary text-label-md cursor-pointer"
              >
                Back to Stories
              </button>
            </div>
          </div>
        </div>
      }

      <!-- GALLERY LIGHTBOX MODAL -->
      @if (activeGalleryPost(); as post) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close photo"
            (click)="activeGalleryPost.set(null)"
            class="fixed inset-0 bg-on-background/60 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4"
          >
            <button
              type="button"
              aria-label="Close photo"
              (click)="activeGalleryPost.set(null)"
              class="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[18px]">close</mat-icon>
            </button>
            <img
              [src]="post.image"
              [alt]="post.handle"
              class="w-full aspect-square object-cover rounded-2xl"
              referrerpolicy="no-referrer"
            />
            <div>
              <p class="text-label-lg text-primary font-semibold">
                {{ post.handle }} · {{ post.city }}
              </p>
              <p class="text-body-sm text-on-surface-variant mt-1">{{ post.caption }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class Club {
  readonly state = inject(ZoeState);
  private readonly platformId = inject(PLATFORM_ID);

  readonly storeTabs = BIKES_STORE_TABS;
  readonly images = ZOE_IMAGES;
  readonly stories = RIDER_STORIES;
  readonly events = CLUB_EVENTS;
  readonly routes = SCENIC_ROUTES;
  readonly gallery = GALLERY_POSTS;

  readonly selectedCityFilter = signal<'all' | 'berlin' | 'london' | 'amsterdam'>('all');
  readonly selectedRouteIndex = signal(0);
  readonly activeStory = signal<RiderStory | null>(null);
  readonly activeGalleryPost = signal<GalleryPost | null>(null);

  readonly newsletterEmail = new FormControl('', [Validators.required, Validators.email]);
  readonly newsletterFeedback = signal('');

  readonly cityFilters: {key: 'all' | 'berlin' | 'london' | 'amsterdam'; label: string}[] = [
    {key: 'all', label: 'All Cities'},
    {key: 'berlin', label: 'Berlin'},
    {key: 'london', label: 'London'},
    {key: 'amsterdam', label: 'Amsterdam'},
  ];

  readonly perks = [
    {
      icon: 'speed',
      iconBgClass: 'bg-primary-fixed/50 text-primary',
      title: 'Priority Concierge Servicing',
      description:
        'Skip queues. Instant app-scheduled maintenance bookings with loaner Zoe bikes delivered straight to your door or studio.',
      footer: 'Included in Ownership',
      footerClass: 'text-primary',
    },
    {
      icon: 'build_circle',
      iconBgClass: 'bg-secondary-container text-secondary',
      title: 'Bi-Annual Wellness Tune-Ups',
      description:
        'Complimentary seasonal brake flushes, tire conditioning, belt alignment, and firmware optimizations twice a year.',
      footer: 'Spring & Autumn Check',
      footerClass: 'text-secondary',
    },
    {
      icon: 'checkroom',
      iconBgClass: 'bg-tertiary-fixed text-tertiary',
      title: 'Apparel & Merch Privileges',
      description:
        '20% permanent member discount on all limited-edition helmet capsules, rain wear, and merino commuter essentials.',
      footer: 'Exclusive Access',
      footerClass: 'text-tertiary',
    },
    {
      icon: 'celebration',
      iconBgClass: 'bg-primary-fixed-dim/40 text-on-primary-fixed-variant',
      title: 'Rooftop & Retreat Salons',
      description:
        'Invitations to our intimate seasonal rooftop cocktail soirees, mindful morning rides, and country weekend retreats.',
      footer: 'Members + Guest',
      footerClass: 'text-primary',
    },
  ];

  readonly filteredEvents = computed(() => {
    const city = this.selectedCityFilter();
    if (city === 'all') return this.events;
    return this.events.filter((e) => e.cityKey === city);
  });

  readonly activeRoute = computed(() => this.routes[this.selectedRouteIndex()] ?? this.routes[0]);

  exportGpx(): void {
    const route = this.activeRoute();
    if (isPlatformBrowser(this.platformId)) {
      const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="ZoeBike Salon Routes">
  <metadata><name>${route.title}</name></metadata>
  <trk><name>${route.title}</name><desc>${route.summary}</desc></trk>
</gpx>`;
      const blob = new Blob([gpx], {type: 'application/gpx+xml'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${route.id}.gpx`;
      a.click();
      URL.revokeObjectURL(url);
    }
    this.state.showToast(`GPX synced: ${route.title}`);
  }

  submitNewsletter(): void {
    if (this.newsletterEmail.invalid) {
      this.newsletterFeedback.set('Please enter a valid email address.');
      return;
    }
    this.newsletterFeedback.set(
      'Welcome to the Zoe Club Circle! Your first Thursday Dispatch arrives soon.',
    );
    this.state.showToast('Joined Zoe Club Circle!');
    this.newsletterEmail.reset();
  }
}
