import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FinalResult,
  FinalresultService,
} from '../../../core/services/finalresult.service';
import { CourseService } from '../../../core/services/course.service';
import { StudentService } from '../../../core/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

interface Course {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
}

@Component({
  selector: 'app-finalresultform',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './finalresultform.component.html',
  styleUrl: './finalresultform.component.css',
})
export class FinalresultformComponent implements OnInit {
  finalresultForm!: FormGroup;
  isEditMode = false;
  finalresultId: number | null = null;
  loading = false;
  courses: any[] = [];
  students: any[] = [];
  grades = ['A', 'B', 'C', 'D', 'E', 'F'];
  remarks = ['Excellent', 'Good', 'Average', 'Poor'];

  constructor(
    private fb: FormBuilder,
    private finalResultService: FinalresultService,
    private courseService: CourseService,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.finalresultForm = this.fb.group({
      courseId: ['', [Validators.required, Validators.min(1)]],
      studentId: ['', [Validators.required, Validators.min(1)]],
      grade: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadDropdownData().then(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.isEditMode = true;
        this.finalresultId = +id;
        this.loadFinalResult(this.finalresultId);
      }
    });
  }

  private async loadDropdownData(): Promise<void> {
    try {
      const [courses, students] = await Promise.all([
        this.courseService.getAll().toPromise(),
        this.studentService.getAll().toPromise(),
      ]);

      this.courses = courses as Course[];
      this.students = students as Student[];
    } catch (error) {
      console.error('Error loading dropdown data:', error);
      this.snackBar.open('Failed to load dropdown data', '', {
        duration: 3000,
      });
    }
  }

  initialzeForm() {
    this.finalresultForm = this.fb.group({
      courseId: ['', Validators.required],
      studentId: ['', Validators.required],
    });
  }

  loadFinalResult(id: number): void {
    // console.log('Loading Mapping id for ID is', id);

    this.loading = true;
    this.finalResultService.getFinalResultById(id).subscribe({
      next: (mapping: FinalResult) => {
        console.log(' Received Mapping data:', mapping);
        this.finalresultForm.patchValue({
          courseId: mapping.courseId,
          studentId: mapping.studentId,
          grade: mapping.grade,
          remarks: mapping.remarks,
        });
        console.log('Form values after patching:', this.finalresultForm.value);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading mapping:', err);
        this.snackBar.open('Failed to load mapping hhgcdsh', '', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  compareById(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  saveFinalResult() {
    if (this.finalresultForm.invalid) {
      console.log('Form is invalid:', this.finalresultForm.errors);
      return;
    }

    this.loading = true;
    const mappingData = this.finalresultForm.value;

    if (this.isEditMode && this.finalresultId) {
      this.finalResultService
        .updatefinalresult(this.finalresultId, mappingData)
        .subscribe({
          next: () => {
            this.snackBar.open('finalresult updated successfully', '', {
              duration: 3000,
            });
            this.router.navigate(['/finalresultlist']);
          },
          error: () => {
            this.snackBar.open('Failed to update mapping', '', {
              duration: 3000,
            });
            this.loading = false;
          },
        });
    } else {
      this.finalResultService.createfinalresult(mappingData).subscribe({
        next: () => {
          this.snackBar.open('finalresult created successfully', '', {
            duration: 3000,
          });
          this.router.navigate(['/finalresultlist']);
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
    this.finalresultForm.reset();
  }
}
