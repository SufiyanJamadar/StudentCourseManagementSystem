import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationService } from '../../../core/services/registration.service';
import {
  Student,
  StudentService,
} from '../../../core/services/student.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { CourseService } from '../../../core/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  students: any[] = [];
  teachers: any[] = [];
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private registratinService: RegistrationService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialzeForm();
    this.loadDropdownData();
  }

  initialzeForm() {
    this.registrationForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      teacherId: ['', Validators.required],
    });
  }

  loadDropdownData() {
    this.studentService.getAll().subscribe((res) => (this.students = res));
    this.teacherService.getAll().subscribe((res) => (this.teachers = res));
    this.courseService.getAll().subscribe((res) => (this.courses = res));
  }

  registerUser() {
    if (this.registrationForm.invalid) return;

    const registrationData = this.registrationForm.value;
    this.registratinService.register(this.registrationForm.value).subscribe({
      next: () => {
        this.snackBar.open('Registration Successful', '', { duration: 3000 });
        this.registrationForm.reset();
        this.router.navigate(['/studentlist']);
      },
      error: () => {
        this.snackBar.open('Registration Failed', '', { duration: 3000 });
      },
    });
  }
}
