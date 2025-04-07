import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import {
  FinalResult,
  FinalresultService,
} from '../../../core/services/finalresult.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalresultlist',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './finalresultlist.component.html',
  styleUrl: './finalresultlist.component.css',
})
export class FinalresultlistComponent implements OnInit {
  finalResult: FinalResult[] = [];
  displayedColumns: string[] = [
    'id',
    'studentName',
    'courseName',
    'grade',
    'remarks',
    'actions',
  ];

  constructor(
    private finalResultService: FinalresultService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFinalResult();
  }

  loadFinalResult() {
    this.finalResultService.getAll().subscribe((data) => {
      this.finalResult = data;
    });
  }

  deleteFinalResult(id: number) {
    if (confirm('Are you sure you want to delete this finalresult?')) {
      this.finalResultService.deletefinalresult(id).subscribe(() => {
        this.snackBar.open('FinalResult Deleted Successfully', '', {
          duration: 3000,
        });
        this.loadFinalResult();
      });
    }
  }

  editfinalresult(id: number) {
    // console.log('Navigatin the edit withy ID', id);
    this.router.navigate(['/finalresultform', id]);
  }

  // Navigate to the create form
  createfinalresult() {
    this.router.navigate(['/finalresultform']);
  }
}
