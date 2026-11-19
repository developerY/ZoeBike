import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ZOE_IMAGES} from '../data/zoebike-data';
import {ZoeState} from '../services/zoe-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header
      class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6"
      >
        <!-- Zone 1: Brand Wordmark + Logo -->
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            class="md:hidden w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-mineral flex items-center justify-center transition-colors cursor-pointer"
            (click)="state.mobileMenuOpen.set(!state.mobileMenuOpen())"
            aria-label="Toggle navigation menu"
          >
            <mat-icon class="!text-[22px] !w-[22px] !h-[22px] leading-none">{{
              state.mobileMenuOpen() ? 'close' : 'menu'
            }}</mat-icon>
          </button>

          <a
            routerLink="/"
            (click)="state.mobileMenuOpen.set(false)"
            class="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
          >
            <img
              alt="ZoeBike Logo"
              class="h-7 w-7 rounded-lg object-cover border border-slate-200"
              [src]="images.logo"
              referrerpolicy="no-referrer"
            />
            <span class="font-display text-xl font-bold tracking-tight text-slate-900">
              ZoeBike
            </span>
          </a>
        </div>

        <!-- Zone 2: Single-Line Typographic Navigation -->
        <nav
          aria-label="Primary Navigation"
          class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            routerLink="/"
            routerLinkActive="nav-tab-active"
            [routerLinkActiveOptions]="{exact: true}"
            class="hover:text-slate-900 [&.nav-tab-active]:text-slate-900 [&.nav-tab-active]:underline [&.nav-tab-active]:decoration-emerald-600 [&.nav-tab-active]:decoration-2 [&.nav-tab-active]:underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          >
            Home
          </a>
          <a
            routerLink="/sustainability"
            routerLinkActive="nav-tab-active"
            class="hover:text-slate-900 [&.nav-tab-active]:text-slate-900 [&.nav-tab-active]:underline [&.nav-tab-active]:decoration-emerald-600 [&.nav-tab-active]:decoration-2 [&.nav-tab-active]:underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          >
            Sustainability
          </a>
          <a
            routerLink="/tech"
            routerLinkActive="nav-tab-active"
            class="hover:text-slate-900 [&.nav-tab-active]:text-slate-900 [&.nav-tab-active]:underline [&.nav-tab-active]:decoration-emerald-600 [&.nav-tab-active]:decoration-2 [&.nav-tab-active]:underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          >
            Tech
          </a>
          <a
            routerLink="/bikes"
            routerLinkActive="nav-tab-active"
            class="hover:text-slate-900 [&.nav-tab-active]:text-slate-900 [&.nav-tab-active]:underline [&.nav-tab-active]:decoration-emerald-600 [&.nav-tab-active]:decoration-2 [&.nav-tab-active]:underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          >
            Bikes &amp; Store
          </a>
          <a
            routerLink="/info"
            routerLinkActive="nav-tab-active"
            class="hover:text-slate-900 [&.nav-tab-active]:text-slate-900 [&.nav-tab-active]:underline [&.nav-tab-active]:decoration-emerald-600 [&.nav-tab-active]:decoration-2 [&.nav-tab-active]:underline-offset-8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm"
          >
            Info &amp; About
          </a>
        </nav>

        <!-- Zone 3: Primary Emerald CTA & Utility Triggers -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Search ZoeBike"
            (click)="state.searchModalOpen.set(true)"
            class="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-mineral text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">search</mat-icon>
          </button>

          <button
            type="button"
            aria-label="Open shopping bag"
            (click)="state.cartDrawerOpen.set(true)"
            class="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-mineral text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">shopping_bag</mat-icon>
            @if (state.cartCount() > 0) {
              <span
                class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums"
              >
                {{ state.cartCount() }}
              </span>
            }
          </button>

          <button
            type="button"
            aria-label="Open rider profile and saved builds"
            (click)="state.accountDrawerOpen.set(true)"
            class="hidden sm:flex items-center rounded-xl border border-slate-200 p-0.5 hover:border-emerald-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <img
              alt="Rider Profile"
              class="w-8 h-8 rounded-lg object-cover"
              [src]="images.profileAvatar"
              referrerpolicy="no-referrer"
            />
          </button>

          <button
            type="button"
            (click)="state.openTestRideModal()"
            class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Plan a Ride
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (state.mobileMenuOpen()) {
        <div class="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <nav class="flex flex-col gap-1">
            <a
              routerLink="/"
              routerLinkActive="nav-tab-active"
              [routerLinkActiveOptions]="{exact: true}"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Home
            </a>
            <a
              routerLink="/sustainability"
              routerLinkActive="nav-tab-active"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Sustainability &amp; Cities
            </a>
            <a
              routerLink="/tech"
              routerLinkActive="nav-tab-active"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Tech, Apps &amp; Regen Brakes
            </a>
            <a
              routerLink="/bikes"
              routerLinkActive="nav-tab-active"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Bikes &amp; Customizer
            </a>
            <a
              routerLink="/store"
              routerLinkActive="nav-tab-active"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Store &amp; H₂E-Bike Concepts
            </a>
            <a
              routerLink="/club"
              routerLinkActive="nav-tab-active"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Zoe Club &amp; Stories
            </a>
            <a
              routerLink="/info"
              routerLinkActive="nav-tab-active"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 [&.nav-tab-active]:bg-emerald-50 [&.nav-tab-active]:text-emerald-800 [&.nav-tab-active]:font-semibold transition-colors"
            >
              Info, About &amp; Legal
            </a>
          </nav>

          <button
            type="button"
            (click)="state.mobileMenuOpen.set(false); state.openTestRideModal()"
            class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-none">
              calendar_today
            </mat-icon>
            <span>Plan a Ride</span>
          </button>
        </div>
      }
    </header>
  `,
})
export class Navbar {
  readonly state = inject(ZoeState);
  readonly images = ZOE_IMAGES;
}
