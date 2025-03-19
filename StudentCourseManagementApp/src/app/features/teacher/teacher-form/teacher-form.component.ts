import { Component, OnInit } from '@angular/core';
import {
  Teacher,
  TeacherService,
} from '../../../core/services/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css',
})
export class TeacherFormComponent implements OnInit {
  teacher: Teacher = { id: 0, name: '', experienceInYears: 0, rating: 0 };

  constructor(
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTeacher(+id);
    }
  }

  loadTeacher(id: number) {
    this.teacherService.getAll().subscribe((teachers) => {
      const teacher = teachers.find((t) => t.id === id);
      if (teacher) {
        this.teacher = teacher;
      }
    });
  }

  resetForm() {
    this.teacher = { id: 0, name: '', experienceInYears: 0, rating: 0 };
  }

  // save or update Teacher
  saveTeacher() {
    if (this.teacher.id) {
      this.teacherService
        .update(this.teacher.id, this.teacher)
        .subscribe(() => {
          this.snackBar.open('Techer Updates Successfully', '', {
            duration: 3500,
          });
          this.router.navigate(['/teacherlist']);
        });
    } else {
      this.teacherService.create(this.teacher).subscribe(() => {
        this.snackBar.open('Teacher Created Successfully', '', {
          duration: 3500,
        });
        this.router.navigate(['/teacherlist']);
      });
    }
  }
}
