import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AssignmentService } from '../../../core/services/assignment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-assignment-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assignment-form.component.html',
  styleUrl: './assignment-form.component.css',
})
export class AssignmentFormComponent implements OnInit {
  assignmentForm: FormGroup;
  isEditMode = false;
  assignmentId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private assignmentService: AssignmentService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.assignmentForm = this.fb.group({
      description: ['', Validators.required],
      courseId: ['', [Validators.required, Validators.min(1)]],
      deadline: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.assignmentId = +id;
      this.loadAssignment(this.assignmentId);
    }
  }

  loadAssignment(id: number) {
    this.loading = true;
    this.assignmentService.getAll().subscribe({
      next: (assignments) => {
        const assignment = assignments.find((a) => a.id === id);
        if (assignment) {
          this.assignmentForm.patchValue({
            description: assignment.description,
            courseId: assignment.courseId,
            deadline: assignment.deadline
              ? new Date(assignment.deadline)
              : null,
          });
        }
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load assignment', '', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  // Save or update assignment
  saveAssignment() {
    if (this.assignmentForm.invalid) return;

    this.loading = true;
    const assignmentData = this.assignmentForm.value;

    if (this.isEditMode && this.assignmentId) {
      // Update existing assignment
      this.assignmentService
        .updateAssignment(this.assignmentId, assignmentData)
        .subscribe({
          next: () => {
            this.snackBar.open('Assignment Updated Successfully', '', {
              duration: 3000,
            });
            this.router.navigate(['/assignmentslist']);
          },
          error: () => {
            this.snackBar.open('Failed to update assignment', '', {
              duration: 3000,
            });
            this.loading = false;
          },
        });
    } else {
      // Create new assignment
      this.assignmentService.createAssignment(assignmentData).subscribe({
        next: () => {
          this.snackBar.open('Assignment Created Successfully', '', {
            duration: 3000,
          });
          this.router.navigate(['/assignmentslist']);
        },
        error: () => {
          this.snackBar.open('Failed to create assignment', '', {
            duration: 3000,
          });
          this.loading = false;
        },
      });
    }
  }

  // Reset the form
  resetForm() {
    this.assignmentForm.reset();
  }
}
