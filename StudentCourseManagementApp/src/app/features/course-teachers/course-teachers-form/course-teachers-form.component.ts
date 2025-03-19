import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTeachersService } from '../../../core/services/course-teachers.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-course-teachers-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './course-teachers-form.component.html',
  styleUrl: './course-teachers-form.component.css',
})
export class CourseTeachersFormComponent implements OnInit {
  courseTeacherForm!: FormGroup;
  courses: any[] = [];
  teachers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private courTeacherService: CourseTeachersService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialzeForm();
    this.loadDropdownData();
  }

  initialzeForm() {
    this.courseTeacherForm = this.fb.group({
      courseId: ['', Validators.required],
      teacherId: ['', Validators.required],
    });
  }

  loadDropdownData() {
    this.courseService.getAll().subscribe((res) => (this.courses = res));
    this.teacherService.getAll().subscribe((res) => (this.teachers = res));
  }

  registerCourseTeacher() {
    if (this.courseTeacherForm.invalid) return;

    const registrationData = this.courseTeacherForm.value;
    this.courTeacherService
      .courseTeacherRegistration(this.courseTeacherForm.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Registration Successful', '', { duration: 3000 });
          this.courseTeacherForm.reset();
          this.router.navigate(['/courseteacherslist']);
        },
        error: () => {
          this.snackBar.open('Registration Failed', '', { duration: 3000 });
        },
      });
  }
}
