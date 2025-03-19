import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../../../core/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  course: Course = { id: 0, name: '', durationInDays: 0, dailyHours: 0 };

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCourse(+id);
    }
  }

  loadCourse(id: number) {
    this.courseService.getAll().subscribe((courses) => {
      const course = courses.find((c) => c.id === id);
      if (course) {
        this.course = course;
      }
    });
  }

  resetForm() {
    this.course = { id: 0, name: '', durationInDays: 0, dailyHours: 0 };
  }

  // save or update Teacher
  saveCourse() {
    if (this.course.id) {
      this.courseService.update(this.course.id, this.course).subscribe(() => {
        this.snackBar.open('Course Updates Successfully', '', {
          duration: 3500,
        });
        this.router.navigate(['/courselist']);
      });
    } else {
      this.courseService.create(this.course).subscribe(() => {
        this.snackBar.open('Course Created Successfully', '', {
          duration: 3500,
        });
        this.router.navigate(['/courselist']);
      });
    }
  }
}
