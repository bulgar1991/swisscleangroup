import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-request',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './request.html',
  styleUrl: './request.scss',
})
export class Request implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private booking = inject(BookingService);

  serviceId = signal('');
  submitting = signal(false);
  successMessage = signal<string | null>(null);
  errors = signal<string[]>([]);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    address: [''],
    preferredDate: [''],
    message: [''],
  });

  ngOnInit(): void {
    this.serviceId.set(this.route.snapshot.paramMap.get('serviceId') ?? '');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.successMessage.set(null);
    this.errors.set([]);

    this.booking
      .submitRequest({ serviceId: this.serviceId(), ...this.form.getRawValue() })
      .subscribe({
        next: (res) => {
          this.successMessage.set(res.message);
          this.submitting.set(false);
          this.form.reset();
        },
        error: (err: HttpErrorResponse) => {
          const messages: string[] = err.error?.errors ?? ['Something went wrong. Please try again.'];
          this.errors.set(messages);
          this.submitting.set(false);
        },
      });
  }
}
