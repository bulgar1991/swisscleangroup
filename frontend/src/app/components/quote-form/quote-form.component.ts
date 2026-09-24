import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SERVICE_POSTS } from '@components/services-slider/services-slider.items';
import { Web3FormsService } from '@services/web3forms.service';
import { CONTACT_PHONE } from '@/config/contact';
import {
  QUOTE_EMAIL_LABELS,
  QUOTE_EMAIL_SERVICE_NAMES,
  emailDate,
  quoteEmailSubject,
} from './quote-form.email';

interface ServiceOption {
  id: string;
  labelKey: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

@Component({
  imports: [ReactiveFormsModule, TranslatePipe],
  selector: 'app-quote-form',
  styleUrl: './quote-form.component.scss',
  templateUrl: './quote-form.component.html',
})
export class QuoteFormComponent {
  private web3forms = inject(Web3FormsService);
  private fb = inject(FormBuilder);

  phone = CONTACT_PHONE;
  phoneHref = 'tel:' + CONTACT_PHONE.replace(/\s/g, '');
  today = new Date().toISOString().slice(0, 10);

  serviceOptions: ServiceOption[] = [
    ...SERVICE_POSTS.map((service) => ({ id: service.id, labelKey: service.key + '.title' })),
    { id: 'other', labelKey: 'quoteForm.serviceOther' },
  ];

  benefits = ['quoteForm.benefits.free', 'quoteForm.benefits.fast', 'quoteForm.benefits.noCommitment'];

  status = signal<Status>('idle');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s().-]{5,}$/)]],
    service: ['', Validators.required],
    address: [''],
    date: [''],
    message: ['', Validators.maxLength(2000)],
    // Honeypot: hidden from people, bots fill it in.
    botcheck: [false],
  });

  showError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    if (value.botcheck) return;

    this.status.set('sending');
    const serviceName = QUOTE_EMAIL_SERVICE_NAMES[value.service] ?? value.service;
    const labels = QUOTE_EMAIL_LABELS;

    this.web3forms
      .send(quoteEmailSubject(serviceName, value.name.trim()), value.email.trim(), [
        [labels.name, value.name.trim()],
        [labels.email, value.email.trim()],
        [labels.phone, value.phone.trim()],
        [labels.service, serviceName],
        [labels.address, value.address.trim()],
        [labels.date, value.date ? emailDate(value.date) : ''],
        [labels.message, value.message.trim()],
      ])
      .subscribe((sent) => {
        this.status.set(sent ? 'success' : 'error');
        if (sent) this.form.reset();
      });
  }

  reset(): void {
    this.status.set('idle');
  }
}
