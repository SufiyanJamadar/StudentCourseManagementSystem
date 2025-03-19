import { Component, OnInit } from '@angular/core';
import {
  Student,
  StudentService,
} from '../../../core/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent implements OnInit {
  student: Student = { id: 0, name: '', email: '', password: '' };

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStudent(+id);
    }
  }

  loadStudent(id: number) {
    this.studentService.getAll().subscribe((students) => {
      const student = students.find((s) => s.id === id);
      if (student) {
        this.student = student;
      }
    });
  }

  resetForm() {
    this.student = { id: 0, name: '', email: '', password: '' };
  }

  // // Save or update a student
  saveStudent() {
    if (this.student.id) {
      this.studentService
        .update(this.student.id, this.student)
        .subscribe(() => {
          this.snackBar.open('Student Updated Successfully', '', {
            duration: 3500,
          });
          this.router.navigate(['/studentlist']);
        });
    } else {
      this.studentService.create(this.student).subscribe(() => {
        this.snackBar.open('Student Created Successfully', '', {
          duration: 3500,
        });
        this.router.navigate(['/studentlist']);
      });
    }
  }
}
