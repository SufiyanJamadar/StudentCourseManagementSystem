import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface CourseTeachers {
  id: number;
  courseName: string;
  teacherName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseTeachersService {
  private apiUrl = `${environment.apiURL}/api/CourseTeachers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<CourseTeachers[]>(`${this.apiUrl}`);
  }

  courseTeacherRegistration(courseteacher: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/courseTeachersRegister`,
      courseteacher
    );
  }

  deleteCourseTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateCourseTeacher(id: number, courseteacher: CourseTeachers) {
    return this.http.put(`${this.apiUrl}/update/${id},`, courseteacher);
  }
}
