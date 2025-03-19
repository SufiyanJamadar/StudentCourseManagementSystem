import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = `${environment.apiURL}/api/Student`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Student[]>(`${this.apiUrl}/all`);
  }

  create(student: Student): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, student);
  }

  update(id: number, student: Student): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, student);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
