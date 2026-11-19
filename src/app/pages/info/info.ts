import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {SectionSubnav} from '../../components/section-subnav';
import {FUSION_SENSORS, INFO_TABS} from '../../data/ashbike-data';
import {ZoeState} from '../../services/zoe-state';

type InfoSection = 'info' | 'contact' | 'privacy' | 'eula';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-info',
  imports: [RouterLink, ReactiveFormsModule, MatIconModule, SectionSubnav],
  template: `
    <div class="flex flex-col w-full">
      <app-section-subnav [tabs]="tabs" ariaLabel="Info and Legal navigation" />

      @if (activeSection() === 'info') {
        <!-- BICYCLEBRAIN & APP INFO -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14 space-y-12">
          <div class="max-w-3xl space-y-4">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              BiCycleBrain · Emerging Mobility Technology
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              The Fusion of the Smartphone and Bicycle
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              “The future of medicine is in everyone’s pocket today.” By pairing AI, mobile health
              telemetry, and electric bicycles, we solve urban congestion, emissions, and oil
              dependence while combating obesity, heart disease, and diabetes.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-4">
              <h2 class="text-headline-md text-secondary font-semibold">
                Problems Solved by Micro Mobility
              </h2>
              <ul class="space-y-3 text-body-sm text-on-surface-variant">
                <li class="flex items-center gap-2.5">
                  <mat-icon class="material-symbols-outlined text-secondary text-[18px]">check_circle</mat-icon>
                  <span><strong class="text-on-surface">Reduce City Congestion:</strong> Reclaim gridlocked lanes for bikes and people.</span>
                </li>
                <li class="flex items-center gap-2.5">
                  <mat-icon class="material-symbols-outlined text-secondary text-[18px]">check_circle</mat-icon>
                  <span><strong class="text-on-surface">Reduce Pollution:</strong> Zero tailpipe fumes in dense neighborhoods.</span>
                </li>
                <li class="flex items-center gap-2.5">
                  <mat-icon class="material-symbols-outlined text-secondary text-[18px]">check_circle</mat-icon>
                  <span><strong class="text-on-surface">Reduce Reliance on Oil:</strong> Human energy and clean electricity over gasoline.</span>
                </li>
              </ul>
            </div>

            <div class="p-8 rounded-[2rem] bg-surface-container-low space-y-4">
              <h2 class="text-headline-md text-primary font-semibold">
                Everyday Preventive Health Benefits
              </h2>
              <ul class="space-y-3 text-body-sm text-on-surface-variant">
                <li class="flex items-center gap-2.5">
                  <mat-icon class="material-symbols-outlined text-primary text-[18px]">favorite</mat-icon>
                  <span><strong class="text-on-surface">Reduce Obesity:</strong> Daily calorie burn built seamlessly into commutes.</span>
                </li>
                <li class="flex items-center gap-2.5">
                  <mat-icon class="material-symbols-outlined text-primary text-[18px]">favorite</mat-icon>
                  <span><strong class="text-on-surface">Reduce Heart Disease:</strong> Sustained aerobic conditioning on every trip.</span>
                </li>
                <li class="flex items-center gap-2.5">
                  <mat-icon class="material-symbols-outlined text-primary text-[18px]">favorite</mat-icon>
                  <span><strong class="text-on-surface">Reduce Diabetes Risk:</strong> Steady blood-glucose regulation through low-impact rides.</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="space-y-5">
            <h2 class="text-headline-md text-on-surface font-semibold">
              Smartphone Capabilities Powering Modern Cycling
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              @for (sensor of sensors; track sensor.name) {
                <div class="p-6 rounded-2xl bg-surface-container-lowest shadow-xs space-y-1.5">
                  <h3 class="text-label-lg text-on-surface font-semibold">{{ sensor.name }}</h3>
                  <p class="text-body-sm text-on-surface-variant">{{ sensor.role }}</p>
                </div>
              }
            </div>
            <div class="pt-2">
              <a
                routerLink="/tech/features/functions"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary text-label-lg hover:bg-primary-container transition-colors"
              >
                <span>Read Full Smartphone/Bicycle Fusion Treatise</span>
                <mat-icon class="material-symbols-outlined text-[18px]">arrow_forward</mat-icon>
              </a>
            </div>
          </div>
        </section>
      } @else if (activeSection() === 'contact') {
        <!-- CONTACT PAGE -->
        <section class="w-full max-w-[1360px] mx-auto px-5 md:px-10 lg:px-16 pt-8 pb-14">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div class="lg:col-span-5 space-y-4">
              <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
                Get in Touch
              </span>
              <h1 class="text-headline-xl text-on-surface tracking-tight">
                Contact ZoeBike &amp; AshBike
              </h1>
              <p class="text-body-md text-on-surface-variant">
                Questions about sustainability partnerships, Go Swift shared fleets, or our
                companion apps? Reach us directly or send a note using the form.
              </p>
              <div class="p-6 rounded-3xl bg-surface-container-low space-y-2">
                <span class="text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <p class="text-headline-sm text-primary font-semibold">Contact&#64;ashbike.com</p>
                <p class="text-body-sm text-on-surface-variant">
                  Developer Team: ZoeWave / AshBike
                </p>
              </div>
            </div>

            <form
              [formGroup]="contactForm"
              (ngSubmit)="sendContact()"
              class="lg:col-span-7 p-7 sm:p-9 rounded-[2rem] bg-surface-container-lowest shadow-lg space-y-4"
            >
              <h2 class="text-headline-sm text-on-surface font-semibold">Send a Message</h2>
              <div class="space-y-1.5">
                <label for="contact-name" class="text-label-sm text-on-surface-variant block">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  formControlName="name"
                  type="text"
                  placeholder="Alex Rivera"
                  class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div class="space-y-1.5">
                <label for="contact-email" class="text-label-sm text-on-surface-variant block">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  formControlName="email"
                  type="email"
                  placeholder="you@domain.com"
                  class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div class="space-y-1.5">
                <label for="contact-message" class="text-label-sm text-on-surface-variant block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  formControlName="message"
                  rows="4"
                  placeholder="Tell us about your city corridor, fleet concept, or feedback..."
                  class="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                ></textarea>
              </div>
              <button
                type="submit"
                class="px-7 py-3.5 rounded-full bg-primary text-on-primary text-label-lg hover:bg-primary-container transition-colors cursor-pointer"
              >
                {{ contactSent() ? 'Message Sent ✓' : 'Send Note' }}
              </button>
            </form>
          </div>
        </section>
      } @else if (activeSection() === 'privacy') {
        <!-- APP PRIVACY POLICY -->
        <section class="w-full max-w-[1000px] mx-auto px-5 md:px-10 pt-8 pb-14 space-y-8">
          <div class="space-y-2">
            <span class="text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Last Updated: April 2026
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              Privacy Policy for AshBike
            </h1>
            <p class="text-body-lg text-on-surface-variant">
              Our Data Philosophy: You’re in Control. AshBike does not operate external collection
              servers—all of your ride history is stored exclusively on your device.
            </p>
          </div>

          <div class="space-y-6">
            <div class="p-7 rounded-3xl bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                1. Zero External Server Storage
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Your ride routes, speeds, and optional health summaries remain in your phone’s local
                database. Data never leaves your device unless you explicitly request weather
                conditions, nearby cafe lookups via Yelp, or sync with Google Health Connect.
              </p>
            </div>

            <div class="p-7 rounded-3xl bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                2. Location &amp; Health Connect Permissions
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                GPS latitude/longitude tracks distance, speed, and uninterrupted background trip
                recording. Google Health Connect integration is strictly opt-in for reading heart
                rate / calories burned and writing completed bike trips. You can revoke permissions at
                any time in system settings.
              </p>
            </div>

            <div class="p-7 rounded-3xl bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                3. Immediate Local Data Deletion
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                Open the ride list tab inside the app to delete individual rides (top-right trash
                icon) or clear all stored rides from the header action, or uninstall the app to wipe
                all local records immediately.
              </p>
            </div>
          </div>
        </section>
      } @else {
        <!-- EULA -->
        <section class="w-full max-w-[1000px] mx-auto px-5 md:px-10 pt-8 pb-14 space-y-8">
          <div class="space-y-2">
            <span class="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Last Updated: March 31, 2026
            </span>
            <h1 class="text-headline-xl text-on-surface tracking-tight">
              End User License Agreement (EULA)
            </h1>
            <p class="text-body-md text-on-surface-variant">
              Binding agreement between you and ZoeWave / AshBike governing use of the AshBike
              mobile application and related software tools.
            </p>
          </div>

          <div class="space-y-5">
            <div class="p-7 rounded-3xl bg-error-container/40 space-y-2">
              <h2 class="text-headline-sm text-on-error-container font-semibold">
                Safe Operation Warning (Important)
              </h2>
              <p class="text-body-sm text-on-error-container">
                AshBike is intended strictly as a tracking and informational tool. Never interact
                with your mobile screen while actively riding—always stop safely off the roadway
                before viewing app telemetry, maintain full traffic awareness, and obey local cycling
                laws.
              </p>
            </div>

            <div class="p-7 rounded-3xl bg-surface-container-low space-y-2">
              <h2 class="text-headline-sm text-on-surface font-semibold">
                Platform Acknowledgement &amp; License Scope
              </h2>
              <p class="text-body-sm text-on-surface-variant">
                This agreement is concluded solely between you and ZoeWave / AshBike (not Apple Inc.
                or Google LLC). You receive a revocable, non-commercial, non-transferable personal
                license on devices you own or control, subject to our separate Source Available
                License (PSAL) for educational source inspection.
              </p>
            </div>
          </div>
        </section>
      }
    </div>
  `,
})
export class Info {
  private readonly route = inject(ActivatedRoute);
  private readonly state = inject(ZoeState);

  readonly tabs = INFO_TABS;
  readonly sensors = FUSION_SENSORS;
  readonly contactSent = signal(false);

  readonly activeSection = toSignal(
    this.route.data.pipe(map((d) => (d['section'] as InfoSection | undefined) ?? 'info')),
    {initialValue: 'info' as InfoSection},
  );

  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  sendContact(): void {
    if (this.contactForm.invalid) {
      this.state.showToast('Please complete your name, valid email, and message.');
      return;
    }
    this.contactSent.set(true);
    this.state.showToast('Message received! We’ll reply via Contact@ashbike.com.');
    this.contactForm.reset();
  }
}
