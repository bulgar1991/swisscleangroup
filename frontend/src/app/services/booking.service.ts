import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CleaningService } from '../models/service.model';

export interface ServiceRequestPayload {
  serviceId: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferredDate?: string;
  message?: string;
}

export interface ServiceRequestResponse {
  ok: boolean;
  requestId: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);

  getServices() {
    return this.http.get<{ services: CleaningService[] }>('/api/services');
  }

  submitRequest(payload: ServiceRequestPayload) {
    return this.http.post<ServiceRequestResponse>('/api/request', payload);
  }
}
