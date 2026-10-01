import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IconsId } from '../../models/icons';

interface WelcomeFeature {
  icon: IconsId;
  // Translation key prefix -> '.title', '.text'.
  key: string;
}

@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-welcome-section',
  styleUrl: './welcome-section.component.scss',
  templateUrl: './welcome-section.component.html',
})
export class WelcomeSectionComponent {
  // Hidden on the About page itself.
  showAboutButton = input(true);

  // Dummy placeholder photo - replace with a real one.
  image: string = 'assets/images/welcome/welcome.jpg';

  features: WelcomeFeature[] = [
    { icon: 'users-solid-full', key: 'welcome.features.team' },
    { icon: 'shield-solid-full', key: 'welcome.features.insured' },
    { icon: 'clock-regular-full', key: 'welcome.features.punctual' },
  ];
}
