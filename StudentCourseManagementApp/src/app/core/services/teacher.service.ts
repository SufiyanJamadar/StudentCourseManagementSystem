import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Teacher {
  id: number;
  name: string;
  experienceInYears: number;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = `${environment.apiURL}/api/Teacher`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Teacher[]>(`${this.apiUrl}/all`);
  }

  create(teacher: Teacher): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, teacher);
  }

  update(id: number, teacher: Teacher): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, teacher);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
