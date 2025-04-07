import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface FinalResult {
  id: number;
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
  grade: string;
  remarks: string;
}

@Injectable({
  providedIn: 'root',
})
export class FinalresultService {
  private apiUrl = `${environment.apiURL}/api/FinalResult`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<FinalResult[]>(`${this.apiUrl}/all`);
  }

  createfinalresult(finalResult: FinalResult): Observable<any> {
    return this.http.post(`${this.apiUrl}/createfinalresult`, finalResult);
  }

  updatefinalresult(id: number, finalResult: FinalResult): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, finalResult);
  }

  deletefinalresult(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getFinalResultById(id: number): Observable<FinalResult> {
    return this.http.get<FinalResult>(
      `${this.apiUrl}/getFinalResultById/${id}`
    );
  }
}
