import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../../../core/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = true;

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getAll().subscribe((data) => {
      this.courses = data;
      console.log(data);
      this.loading = false;
    });
  }

  createCourse() {
    this.router.navigate(['/courseform']);
  }

  deleteCourse(id: number) {
    this.courseService.delete(id).subscribe(() => {
      alert('Are you sure want to delete this');
      this.snackBar.open('Course Deleted Successfully', '', {
        duration: 3500,
      });
      this.loadCourse();
    });
  }

  // editCourse(teacher: Course) {
  //   this.courseService.update(teacher.id, teacher).subscribe(() => {
  //     this.snackBar.open('Course Updated Successfully', '', {
  //       duration: 3500,
  //     });
  //     this.loadCourse();
  //   });
  //   this.router.navigate(['/courseform', teacher.id]);
  // }

  editCourse(course: Course) {
    this.router.navigate(['/courseform', course.id]);
  }
}
