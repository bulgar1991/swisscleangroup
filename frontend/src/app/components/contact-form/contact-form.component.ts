import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Web3FormsService } from '@services/web3forms.service';
import { CONTACT_PHONE } from '@/config/contact';
import { CONTACT_EMAIL_LABELS, contactEmailSubject } from './contact-form.email';

type Status = 'idle' | 'sending' | 'success' | 'error';

/** General "ask us a question" form. For quotes, see QuoteFormComponent. */
@Component({
  imports: [ReactiveFormsModule, TranslatePipe],
  selector: 'app-contact-form',
  styleUrl: './contact-form.component.scss',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private web3forms = inject(Web3FormsService);
  private fb = inject(FormBuilder);

  phone = CONTACT_PHONE;
  phoneHref = 'tel:' + CONTACT_PHONE.replace(/\s/g, '');

  status = signal<Status>('idle');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^[+\d][\d\s().-]{5,}$/)],
    subject: ['', [Validators.required, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
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
    const labels = CONTACT_EMAIL_LABELS;
    const subject = value.subject.trim();

    this.web3forms
      .send(contactEmailSubject(subject, value.name.trim()), value.email.trim(), [
        [labels.name, value.name.trim()],
        [labels.email, value.email.trim()],
        [labels.phone, value.phone.trim()],
        [labels.subject, subject],
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
