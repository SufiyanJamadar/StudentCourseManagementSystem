import { Component, OnInit } from '@angular/core';
import {
  Registration,
  RegistrationService,
} from '../../../core/services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.css',
})
export class RegistrationListComponent implements OnInit {
  registrations: Registration[] = [];
  displayedColumns: string[] = [
    'id',
    'studentName',
    'courseName',
    'teacherName',
    'dateRegistered',
    'actions',
  ];

  constructor(
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrationService.getAll().subscribe((data) => {
      this.registrations = data;
    });
  }

  deleteRegistration(id: number) {
    if (confirm('Are you sure you want to delete this registration?')) {
      this.registrationService.deleteRegistration(id).subscribe(() => {
        this.snackBar.open('Registration Deleted Successfully', '', {
          duration: 3000,
        });
        this.loadRegistrations();
      });
    }
  }

  editRegistration(id:number) {}
}
