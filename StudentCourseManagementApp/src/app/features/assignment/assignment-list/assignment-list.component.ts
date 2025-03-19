import { Component, OnInit } from '@angular/core';
import {
  Assignment,
  AssignmentService,
} from '../../../core/services/assignment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css',
})
export class AssignmentListComponent implements OnInit {
  assignments: Assignment[] = [];
  displayedColumns: string[] = [
    'id',
    'description',
    'courseId',
    'deadline',
    'actions',
  ];
  loading = true; // Add loading state

  constructor(
    private asignmentService: AssignmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAsssignments();
  }

  loadAsssignments() {
    this.loading = true;
    this.asignmentService.getAll().subscribe({
      next: (data) => {
        this.assignments = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load assignments', '', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  deleteAssignment(id: number) {
    if (confirm('Are you sure want to delete this Assighments?')) {
      this.asignmentService.deleteAssignment(id).subscribe(() => {
        this.snackBar.open('Assignment deleted Successfully', '', {
          duration: 3000,
        });
        this.loadAsssignments();
      });
    }
  }

  editAssignment(id: number) {
    this.router.navigate(['/assignmentform', id]);
  }

  // Navigate to the create form
  createAssignment() {
    this.router.navigate(['/assignmentform']);
  }
}
