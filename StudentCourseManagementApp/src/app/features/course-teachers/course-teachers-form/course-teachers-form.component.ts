import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CourseTeachers,
  CourseTeachersService,
} from '../../../core/services/course-teachers.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

interface Course {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  name: string;
}

@Component({
  selector: 'app-course-teachers-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './course-teachers-form.component.html',
  styleUrl: './course-teachers-form.component.css',
})
export class CourseTeachersFormComponent implements OnInit {
  courseTeacherForm!: FormGroup;
  isEditMode = false;
  courseTeacherId: number | null = null;
  loading = false;
  courses: any[] = []; // Load from CourseService
  teachers: any[] = []; // Load from TeacherService

  constructor(
    private fb: FormBuilder,
    private courTeacherService: CourseTeachersService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseTeacherForm = this.fb.group({
      courseId: ['', [Validators.required, Validators.min(1)]],
      teacherId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadDropdownData().then(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.isEditMode = true;
        this.courseTeacherId = +id;
        this.loadCourseTeacher(this.courseTeacherId);
      }
    });
  }

  private async loadDropdownData(): Promise<void> {
    try {
      const [courses, teachers] = await Promise.all([
        this.courseService.getAll().toPromise(),
        this.teacherService.getAll().toPromise(),
      ]);

      this.courses = courses as Course[];
      this.teachers = teachers as Teacher[];
    } catch (error) {
      console.error('Error loading dropdown data:', error);
      this.snackBar.open('Failed to load dropdown data', '', {
        duration: 3000,
      });
    }
  }

  // loadDropdownData(): void {
  //   this.courseService.getAll().subscribe((courses: Course[]) => {
  //     this.courses = courses;
  //   });

  //   this.teacherService.getAll().subscribe((teachers: Teacher[]) => {
  //     this.teachers = teachers;
  //   });
  // }

  initialzeForm() {
    this.courseTeacherForm = this.fb.group({
      courseId: ['', Validators.required],
      teacherId: ['', Validators.required],
    });
  }

  loadCourseTeacher(id: number): void {
    console.log('Loading Mapping id for ID is', id);

    this.loading = true;
    this.courTeacherService.getCourseTeacherById(id).subscribe({
      next: (mapping: CourseTeachers) => {
        console.log(' Received Mapping data:', mapping);
        this.courseTeacherForm.patchValue({
          courseId: mapping.courseId,
          teacherId: mapping.teacherId,
        });
        console.log(
          'Form values after patching:',
          this.courseTeacherForm.value
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading mapping:', err);
        this.snackBar.open('Failed to load mapping', '', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  compareById(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  saveCourseTeacher() {
    if (this.courseTeacherForm.invalid) return;

    this.loading = true;
    const mappingData = this.courseTeacherForm.value;

    if (this.isEditMode && this.courseTeacherId) {
      this.courTeacherService
        .updateCourseTeacher(this.courseTeacherId, mappingData)
        .subscribe({
          next: () => {
            this.snackBar.open('CourseTeacher updated successfully', '', {
              duration: 3000,
            });
            this.router.navigate(['/courseteacherslist']);
          },
          error: () => {
            this.snackBar.open('Failed to update mapping', '', {
              duration: 3000,
            });
            this.loading = false;
          },
        });
    } else {
      this.courTeacherService.courseTeacherRegistration(mappingData).subscribe({
        next: () => {
          this.snackBar.open('CourseTeacher created successfully', '', {
            duration: 3000,
          });
          this.router.navigate(['/courseteacherslist']);
        },
        error: () => {
          this.snackBar.open('Failed to create mapping', '', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
    }
  }

  resetForm() {
    this.courseTeacherForm.reset();
  }
}
