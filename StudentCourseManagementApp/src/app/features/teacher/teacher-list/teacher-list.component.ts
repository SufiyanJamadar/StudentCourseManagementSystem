import { Component, OnInit } from '@angular/core';
import {
  Teacher,
  TeacherService,
} from '../../../core/services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css',
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = true;

  constructor(
    private teacherservice: TeacherService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherservice.getAll().subscribe((data) => {
      this.teachers = data;
      console.log(data);
      this.loading = false;
    });
  }

  createTeacher() {
    this.router.navigate(['/teacherform']);
  }

  deleteTeacher(id: number) {
    this.teacherservice.delete(id).subscribe(() => {
      alert('Are you sure want to delete this');
      this.snackbar.open('Teacher Deleted Successfully', '', {
        duration: 3500,
      });
      this.loadTeachers();
    });
  }

  // editTeacher(teacher: Teacher) {
  //   this.teacherservice.update(teacher.id, teacher).subscribe(() => {
  //     this.snackbar.open('Teacher Updated Successfully', '', {
  //       duration: 3500,
  //     });
  //     this.loadTeachers();
  //   });
  //   this.router.navigate(['/teacherform', teacher.id]);
  // }

  editTeacher(teacher: Teacher) {
    // Navigate to the form for editing
    this.router.navigate(['/teacherform', teacher.id]);
  }
}
