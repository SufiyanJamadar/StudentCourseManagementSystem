import { Component, OnInit } from '@angular/core';
import {
  Student,
  StudentService,
} from '../../../core/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = true;
  searchQuery = '';
  filteredStudents: Student[] = [];

  constructor(
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  createStudent() {
    this.router.navigate(['/studentform']);
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getAll().subscribe((data) => {
      this.students = data;
      // console.log(this.students);
      this.filteredStudents = data;
      this.loading = false;
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => {
      alert('Are you sure want to delete this');
      this.snackbar.open('Student Deleted Successfully', '', {
        duration: 3500,
      });
      this.loadStudents();
    });
  }

  // editStudent(student: Student) {
  //   this.studentService.update(student.id, student).subscribe(() => {
  //     this.snackbar.open('Student Updated Successfully', '', {
  //       duration: 3500,
  //     });
  //   });
  //   this.router.navigate(['/studentform', student.id]);
  // }

  editStudent(student: Student) {
    this.router.navigate(['/studentform', student.id]);
  }

  applyFilter() {
    this.filteredStudents = this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
