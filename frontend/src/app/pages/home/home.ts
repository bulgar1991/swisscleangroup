import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CleaningService } from '../../models/service.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private booking = inject(BookingService);

  services = signal<CleaningService[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.booking.getServices().subscribe({
      next: (res) => {
        this.services.set(res.services);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load services right now. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
