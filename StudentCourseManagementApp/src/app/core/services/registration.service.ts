import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Registration {
  id?: number;
  studentName: string;
  courseName: string;
  teacherName: string;
  dateRegistered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = `${environment.apiURL}/api/Registration`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}`);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  deleteRegistration(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateRegistraion(id: number, registration: Registration): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, registration);
  }
}
