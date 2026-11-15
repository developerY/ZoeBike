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
      class="fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(44,53,49,0.04)]"
    >
      <div
        class="h-20 max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between gap-4"
      >
        <!-- Brand -->
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            class="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
            (click)="state.mobileMenuOpen.set(!state.mobileMenuOpen())"
            aria-label="Toggle navigation menu"
          >
            <mat-icon class="material-symbols-outlined text-[22px]">{{
              state.mobileMenuOpen() ? 'close' : 'menu'
            }}</mat-icon>
          </button>

          <a
            routerLink="/"
            (click)="state.mobileMenuOpen.set(false)"
            class="flex items-center gap-3 group shrink-0"
          >
            <img
              alt="ZoeBike Logo"
              class="h-8 w-auto object-contain"
              [src]="images.logo"
              referrerpolicy="no-referrer"
            />
            <span
              class="text-headline-sm text-on-surface tracking-tight font-semibold whitespace-nowrap"
            >
              ZoeBike
            </span>
          </a>
        </div>

        <!-- Center Capsule Nav -->
        <nav
          aria-label="Primary Navigation"
          class="hidden lg:flex items-center p-1.5 rounded-full bg-surface-container-low/80"
        >
          <a
            routerLink="/"
            routerLinkActive="bg-surface-container text-primary font-semibold shadow-xs"
            [routerLinkActiveOptions]="{exact: true}"
            class="px-5 py-2 rounded-full text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            routerLink="/bikes"
            routerLinkActive="bg-surface-container text-primary font-semibold shadow-xs"
            class="px-5 py-2 rounded-full text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap shrink-0"
          >
            Bikes &amp; Customizer
          </a>
          <a
            routerLink="/tech"
            routerLinkActive="bg-surface-container text-primary font-semibold shadow-xs"
            class="px-5 py-2 rounded-full text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap shrink-0"
          >
            Tech &amp; Safety
          </a>
          <a
            routerLink="/club"
            routerLinkActive="bg-surface-container text-primary font-semibold shadow-xs"
            class="px-5 py-2 rounded-full text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap shrink-0"
          >
            Zoe Club &amp; Stories
          </a>
        </nav>

        <!-- Right Action Cluster -->
        <div class="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            (click)="state.openTestRideModal()"
            class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-lg shadow-[0_2px_6px_-1px_rgba(217,107,67,0.2)] hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Test Ride
          </button>

          <button
            type="button"
            aria-label="Search ZoeBike"
            (click)="state.searchModalOpen.set(true)"
            class="w-11 h-11 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <mat-icon class="material-symbols-outlined text-[20px]">search</mat-icon>
          </button>

          <button
            type="button"
            aria-label="Open shopping bag"
            (click)="state.cartDrawerOpen.set(true)"
            class="w-11 h-11 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors relative cursor-pointer"
          >
            <mat-icon class="material-symbols-outlined text-[20px]">shopping_bag</mat-icon>
            @if (state.cartCount() > 0) {
              <span
                class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center tabular-nums shadow-sm"
              >
                {{ state.cartCount() }}
              </span>
            }
          </button>

          <button
            type="button"
            aria-label="Open rider profile and saved builds"
            (click)="state.accountDrawerOpen.set(true)"
            class="flex items-center pl-0.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <img
              alt="Rider Profile"
              class="w-9 h-9 rounded-full object-cover ring-2 ring-primary-fixed hover:ring-primary transition-all"
              [src]="images.profileAvatar"
              referrerpolicy="no-referrer"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (state.mobileMenuOpen()) {
        <div
          class="lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 px-5 py-5 space-y-3 shadow-lg"
        >
          <nav class="flex flex-col gap-1.5">
            <a
              routerLink="/"
              routerLinkActive="bg-primary-fixed/40 text-primary font-semibold"
              [routerLinkActiveOptions]="{exact: true}"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-4 py-3 rounded-2xl text-label-lg text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Home
            </a>
            <a
              routerLink="/bikes"
              routerLinkActive="bg-primary-fixed/40 text-primary font-semibold"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-4 py-3 rounded-2xl text-label-lg text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Bikes &amp; Customizer
            </a>
            <a
              routerLink="/tech"
              routerLinkActive="bg-primary-fixed/40 text-primary font-semibold"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-4 py-3 rounded-2xl text-label-lg text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Tech &amp; Safety
            </a>
            <a
              routerLink="/club"
              routerLinkActive="bg-primary-fixed/40 text-primary font-semibold"
              (click)="state.mobileMenuOpen.set(false)"
              class="px-4 py-3 rounded-2xl text-label-lg text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Zoe Club &amp; Stories
            </a>
          </nav>

          <button
            type="button"
            (click)="state.mobileMenuOpen.set(false); state.openTestRideModal()"
            class="w-full py-3.5 rounded-full bg-primary text-on-primary text-label-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <mat-icon class="material-symbols-outlined text-[18px]">calendar_today</mat-icon>
            <span>Book Free Test Ride</span>
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
