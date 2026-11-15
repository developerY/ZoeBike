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
    <footer class="w-full bg-surface-container-low mt-14">
      <div class="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-14 pb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          <!-- Brand Info -->
          <div class="lg:col-span-4 space-y-5">
            <div class="flex items-center gap-3">
              <img
                alt="ZoeBike Logo"
                class="h-8 w-8 rounded-xl object-cover shadow-xs ring-1 ring-outline-variant/40"
                [src]="images.logo"
                referrerpolicy="no-referrer"
              />
              <span class="text-headline-sm text-on-surface font-semibold">ZoeBike</span>
            </div>
            <p class="text-body-sm text-on-surface-variant max-w-sm">
              Contemporary electric mobility sculpted for joy, elegance, and effortless urban
              living. Designed sustainably with modern craft.
            </p>
            <div class="flex flex-wrap items-center gap-2 pt-1">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-fixed-variant text-label-sm"
              >
                <mat-icon class="material-symbols-outlined text-[14px]">eco</mat-icon>
                100% Carbon Neutral Transit
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed-variant text-label-sm"
              >
                <mat-icon class="material-symbols-outlined text-[14px]">verified</mat-icon>
                CE &amp; UL Certified
              </span>
            </div>
          </div>

          <!-- Bikes & Gear -->
          <div class="lg:col-span-2 space-y-3">
            <h3 class="text-label-lg text-on-surface uppercase tracking-wider">
              Bikes &amp; Gear
            </h3>
            <ul class="space-y-2 text-body-sm text-on-surface-variant">
              <li>
                <a
                  routerLink="/bikes"
                  (click)="selectModel('air')"
                  class="hover:text-primary transition-colors"
                >
                  Zoe Model 01 City
                </a>
              </li>
              <li>
                <a
                  routerLink="/bikes"
                  (click)="selectModel('flow')"
                  class="hover:text-primary transition-colors"
                >
                  Zoe Pure Step-Through
                </a>
              </li>
              <li>
                <a routerLink="/bikes" class="hover:text-primary transition-colors">
                  Custom Palette Studio
                </a>
              </li>
              <li>
                <a routerLink="/bikes" class="hover:text-primary transition-colors">
                  Commuter Accessories
                </a>
              </li>
            </ul>
          </div>

          <!-- Experience -->
          <div class="lg:col-span-2 space-y-3">
            <h3 class="text-label-lg text-on-surface uppercase tracking-wider">Experience</h3>
            <ul class="space-y-2 text-body-sm text-on-surface-variant">
              <li>
                <button
                  type="button"
                  (click)="state.openTestRideModal()"
                  class="hover:text-primary transition-colors text-left cursor-pointer"
                >
                  Book Test Ride
                </button>
              </li>
              <li>
                <a routerLink="/tech" class="hover:text-primary transition-colors">
                  Connected App Hub
                </a>
              </li>
              <li>
                <a routerLink="/club" class="hover:text-primary transition-colors">
                  Community Rides
                </a>
              </li>
              <li>
                <a routerLink="/tech" class="hover:text-primary transition-colors">
                  Care &amp; Maintenance
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="lg:col-span-4 space-y-3">
            <h3 class="text-label-lg text-on-surface uppercase tracking-wider">
              The Salon Dispatch
            </h3>
            <p class="text-body-sm text-on-surface-variant">
              Receive notes on mindful commuting, product drops, and exclusive community retreats.
            </p>
            <form (ngSubmit)="submitDispatch()" class="flex items-center gap-2 pt-1">
              <div class="relative flex-1">
                <input
                  [formControl]="emailControl"
                  class="w-full px-5 py-3 rounded-full bg-surface-container text-on-surface placeholder:text-outline text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Enter your email address"
                  type="email"
                  aria-label="Email address for Salon Dispatch"
                />
              </div>
              <button
                type="submit"
                class="px-5 py-3 rounded-full bg-surface-container-highest text-on-surface text-label-md hover:bg-primary hover:text-on-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {{ subscribed() ? 'Subscribed ✓' : 'Subscribe' }}
              </button>
            </form>
            @if (emailError()) {
              <p class="text-label-sm text-error">Please enter a valid email address.</p>
            }
          </div>
        </div>

        <!-- Bottom Bar -->
        <div
          class="pt-5 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p class="text-label-sm text-on-surface-variant">
            © 2025 ZoeBike Mobility Inc. All rights reserved. Crafted with gentle power.
          </p>
          <div class="flex items-center gap-5">
            <button
              type="button"
              (click)="activeDoc.set('privacy')"
              class="text-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              (click)="activeDoc.set('terms')"
              class="text-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              (click)="activeDoc.set('sustainability')"
              class="text-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Sustainability Manifesto
            </button>
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
