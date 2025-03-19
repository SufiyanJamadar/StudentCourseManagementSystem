import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Assignment {
  id: number;
  description: string;
  courseId: number;
  deadline?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = `${environment.apiURL}/api/Assignment`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/all`);
  }

  createAssignment(assignment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, assignment);
  }

  updateAssignment(id: number, assignment: Assignment): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, assignment);
  }

  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
