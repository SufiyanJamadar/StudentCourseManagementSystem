import { Component, OnInit } from '@angular/core';
import {
  CourseTeachers,
  CourseTeachersService,
} from '../../../core/services/course-teachers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-course-teachers-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './course-teachers-list.component.html',
  styleUrl: './course-teachers-list.component.css',
})
export class CourseTeachersListComponent implements OnInit {
  courseTeacher: CourseTeachers[] = [];
  displayedColumns: string[] = ['id', 'courseName', 'teacherName', 'actions'];
  loading = true;

  constructor(
    private courseTeacherService: CourseTeachersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourseTeachers();
  }

  loadCourseTeachers() {
    this.courseTeacherService.getAll().subscribe((data) => {
      this.courseTeacher = data;
    });
  }

  deleteRegistration(id: number) {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.courseTeacherService.deleteCourseTeacher(id).subscribe(() => {
        this.snackBar.open('Registration Deleted Successfully', '', {
          duration: 3000,
        });
        this.loadCourseTeachers();
      });
    }
  }

  editCourseTeachers(id: number) {
    console.log('Navigatin the edit withy ID', id);
    this.router.navigate(['/course-teachers-form', id]);
  }

  // Navigate to the create form
  createCourseTeachers() {
    this.router.navigate(['/course-teachers-form']);
  }
}
