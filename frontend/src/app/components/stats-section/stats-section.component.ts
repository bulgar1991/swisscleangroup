import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CountUpDirective } from '@directives/count-up.directive';
import { IconsId } from '@models/icons';

interface StatItem {
  icon: IconsId;
  value: number;
  suffix: string;
  // Translation key for the label.
  key: string;
}

@Component({
  imports: [TranslatePipe, CountUpDirective],
  selector: 'app-stats-section',
  styleUrl: './stats-section.component.scss',
  templateUrl: './stats-section.component.html',
})
export class StatsSectionComponent {
  // Each counter starts this much later than the previous one.
  readonly stagger = 250;

  // Dummy numbers - replace with the real ones.
  stats: StatItem[] = [
    { icon: 'smile', value: 1500, suffix: '+', key: 'stats.customers' },
    { icon: 'building', value: 850, suffix: '+', key: 'stats.buildings' },
    { icon: 'team', value: 45, suffix: '', key: 'stats.employees' },
    { icon: 'globe', value: 3, suffix: '', key: 'stats.offices' },
  ];
}
