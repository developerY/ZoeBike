import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {RouterOutlet} from '@angular/router';
import {Footer} from './layout/footer';
import {GlobalOverlays} from './layout/global-overlays';
import {Navbar} from './layout/navbar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, GlobalOverlays],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly iconRegistry = inject(MatIconRegistry);

  constructor() {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
