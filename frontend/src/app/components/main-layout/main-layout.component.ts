import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {HeaderComponent} from '@components/header/header.component';
import {FooterComponent} from '@components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, TranslatePipe, HeaderComponent, FooterComponent],
  styleUrl: './main-layout.component.scss',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  protected readonly year = new Date().getFullYear();
}
