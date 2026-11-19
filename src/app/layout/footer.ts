import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {BikeModelKey, ZOE_IMAGES} from '../data/zoebike-data';
import {ZoeState} from '../services/zoe-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  imports: [RouterLink, ReactiveFormsModule, MatIconModule],
  template: `
    <footer class="w-full border-t border-slate-200 bg-slate-50 text-slate-600 mt-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">
          <!-- Brand Info -->
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-2.5">
              <img
                alt="ZoeBike Logo"
                class="h-7 w-7 rounded-lg object-cover border border-slate-200"
                [src]="images.logo"
                referrerpolicy="no-referrer"
              />
              <span class="font-display text-xl font-bold tracking-tight text-slate-900">
                ZoeBike
              </span>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed max-w-sm">
              We hope to have the world fall in love with biking. Saving the Earth and strengthening
              personal health one ride at a time.
            </p>
            <p class="text-xs font-medium text-slate-500">
              <span class="text-seaglass">100% Carbon Neutral Transit</span>
              <span class="mx-1.5 text-slate-300" aria-hidden="true">·</span>
              <span class="text-ocean">CE &amp; UL Certified</span>
            </p>
          </div>

          <!-- Sustainability & Cities -->
          <div class="lg:col-span-2 space-y-3">
            <h3 class="text-sm font-semibold text-slate-900">Sustainability</h3>
            <ul class="space-y-2 text-sm text-slate-600">
              <li>
                <a routerLink="/sustainability" class="hover:text-ocean transition-colors">
                  Shared Bikes &amp; Health
                </a>
              </li>
              <li>
                <a
                  routerLink="/sustainability/cities"
                  class="hover:text-ocean transition-colors"
                >
                  Cities &amp; Local Commerce
                </a>
              </li>
              <li>
                <a
                  routerLink="/sustainability/cities/parking"
                  class="hover:text-ocean transition-colors"
                >
                  PEZ Vertical Bike Towers
                </a>
              </li>
              <li>
                <a
                  routerLink="/sustainability/micro-mobility"
                  class="hover:text-ocean transition-colors"
                >
                  Micro Mobility &amp; Rickshaws
                </a>
              </li>
              <li>
                <a
                  routerLink="/sustainability/cities/la"
                  class="hover:text-ocean transition-colors"
                >
                  LA ’28 &amp; NY Corridors
                </a>
              </li>
            </ul>
          </div>

          <!-- Tech, Bikes & Store -->
          <div class="lg:col-span-2 space-y-3">
            <h3 class="text-sm font-semibold text-slate-900">Tech &amp; Store</h3>
            <ul class="space-y-2 text-sm text-slate-600">
              <li>
                <a routerLink="/tech" class="hover:text-ocean transition-colors">
                  Why Bike &amp; Safety Tech
                </a>
              </li>
              <li>
                <a routerLink="/tech/app" class="hover:text-ocean transition-colors">
                  Apps, HUD &amp; AR/VR
                </a>
              </li>
              <li>
                <a routerLink="/tech/electric-brakes" class="hover:text-ocean transition-colors">
                  Regenerative Brakes
                </a>
              </li>
              <li>
                <a routerLink="/store" class="hover:text-ocean transition-colors">
                  Store &amp; H₂E-Bike Concept
                </a>
              </li>
              <li>
                <a routerLink="/bikes" class="hover:text-ocean transition-colors">
                  Bike Customizer Studio
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="lg:col-span-4 space-y-3">
            <h3 class="text-sm font-semibold text-slate-900">The Salon Dispatch</h3>
            <p class="text-sm text-slate-600">
              Receive notes on mindful commuting, sustainability blueprints, and app drops.
            </p>
            <form (ngSubmit)="submitDispatch()" class="flex items-center gap-2 pt-1">
              <div class="relative flex-1">
                <input
                  [formControl]="emailControl"
                  class="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Enter your email address"
                  type="email"
                  aria-label="Email address for Salon Dispatch"
                />
              </div>
              <button
                type="submit"
                class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                {{ subscribed() ? 'Subscribed ✓' : 'Subscribe' }}
              </button>
            </form>
            @if (emailError()) {
              <p class="text-xs text-rose-600 mt-1">Please enter a valid email address.</p>
            }
          </div>
        </div>

        <!-- Signature Graphics Banner -->
        <div
          class="mb-8 rounded-2xl bg-[#333333] overflow-hidden border border-slate-200 px-4 sm:px-8 py-4 sm:py-5"
        >
          <a
            routerLink="/about"
            aria-label="ZoeBike Electric Mobility — Explore About ZoeBike AI"
            class="block group"
          >
            <img
              [src]="images.footerBanner"
              alt="ZoeBike stylized cyclist silhouette banner"
              class="w-full h-20 sm:h-28 md:h-32 object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.015]"
              referrerpolicy="no-referrer"
            />
          </a>
        </div>

        <!-- Bottom Bar -->
        <div
          class="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500"
        >
          <p>© 2026 ZoeBike &amp; AshBike Mobility. Saving the Earth One Bike at a Time.</p>
          <div class="flex flex-wrap items-center gap-5">
            <a routerLink="/about" class="hover:text-ocean transition-colors">About AI</a>
            <a routerLink="/info" class="hover:text-ocean transition-colors">BicycleBrain Info</a>
            <a routerLink="/info/contact" class="hover:text-ocean transition-colors">Contact</a>
            <a
              routerLink="/info/contact/app-privacy-policy"
              class="hover:text-ocean transition-colors"
            >
              App Privacy Policy
            </a>
            <a routerLink="/info/contact/eula" class="hover:text-ocean transition-colors">EULA</a>
          </div>
        </div>
      </div>

      <!-- Policy / Manifesto Reader Modal -->
      @if (activeDoc()) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close modal"
            (click)="activeDoc.set(null)"
            class="fixed inset-0 bg-on-background/40 backdrop-blur-sm cursor-default"
          ></button>
          <div
            class="relative z-10 bg-surface-container-lowest rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
          >
            <button
              type="button"
              (click)="activeDoc.set(null)"
              aria-label="Close dialog"
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <mat-icon class="material-symbols-outlined text-[20px]">close</mat-icon>
            </button>

            @if (activeDoc() === 'privacy') {
              <h3 class="text-headline-sm text-on-surface font-semibold mb-3">
                Privacy &amp; Connected Telemetry
              </h3>
              <p class="text-body-sm text-on-surface-variant leading-relaxed">
                Your GPS theft-recovery telemetry is end-to-end encrypted and stored strictly for
                anti-theft recovery and Crash SOS alerts. Ride paths are never sold or shared with
                third-party advertisers.
              </p>
            } @else if (activeDoc() === 'terms') {
              <h3 class="text-headline-sm text-on-surface font-semibold mb-3">
                30-Day Salon Trial &amp; Ownership Terms
              </h3>
              <p class="text-body-sm text-on-surface-variant leading-relaxed">
                Every Zoe commuter includes a 30-day home trial with zero-cost doorstep pickup, a
                5-year frame warranty, and 3-year motor &amp; electrical coverage across Europe and
                North America.
              </p>
            } @else {
              <h3 class="text-headline-sm text-on-surface font-semibold mb-3">
                Zoe Sustainability Manifesto
              </h3>
              <p class="text-body-sm text-on-surface-variant leading-relaxed">
                Our frames utilize 78% recycled low-carbon hydroformed aluminum-magnesium alloy
                hand-finished in Florence with waterborne mineral pigments, paired with modular
                recyclable LG 21700 battery cells.
              </p>
            }

            <div class="mt-6">
              <button
                type="button"
                (click)="activeDoc.set(null)"
                class="w-full py-3 rounded-full bg-primary text-on-primary text-label-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </footer>
  `,
})
export class Footer {
  readonly state = inject(ZoeState);
  readonly images = ZOE_IMAGES;

  readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  readonly subscribed = signal(false);
  readonly emailError = signal(false);
  readonly activeDoc = signal<'privacy' | 'terms' | 'sustainability' | null>(null);

  selectModel(model: BikeModelKey): void {
    this.state.preferredModel.set(model);
  }

  submitDispatch(): void {
    if (this.emailControl.invalid) {
      this.emailError.set(true);
      return;
    }
    this.emailError.set(false);
    this.subscribed.set(true);
    this.state.showToast('Welcome to The Salon Dispatch!');
    this.emailControl.reset();
  }
}
