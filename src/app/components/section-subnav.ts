import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SubNavTab} from '../data/ashbike-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-section-subnav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      [attr.aria-label]="ariaLabel()"
      class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2"
    >
      <div
        class="inline-flex items-center gap-1.5 p-1.5 bg-mineral rounded-xl border border-mineral-line overflow-x-auto max-w-full"
      >
        @for (tab of tabs(); track tab.route) {
          <a
            [routerLink]="tab.route"
            routerLinkActive="subnav-tab-active"
            [routerLinkActiveOptions]="{exact: tab.exact ?? false}"
            class="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 [&.subnav-tab-active]:bg-white [&.subnav-tab-active]:text-slate-900 [&.subnav-tab-active]:hover:text-slate-900 [&.subnav-tab-active]:shadow-sm [&.subnav-tab-active]:font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {{ tab.label }}
          </a>
        }
      </div>
    </nav>
  `,
})
export class SectionSubnav {
  readonly tabs = input.required<SubNavTab[]>();
  readonly ariaLabel = input<string>('Section navigation');
}
