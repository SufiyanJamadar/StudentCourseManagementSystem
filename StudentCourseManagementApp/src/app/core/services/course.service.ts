import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  name: string;
  durationInDays: number;
  dailyHours: number;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `${environment.apiURL}/api/Course`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Course[]>(`${this.apiUrl}/all`);
  }

  create(course: Course): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, course);
  }

  update(id: number, course: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
