import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentListComponent } from './features/student/student-list/student-list.component';
import { StudentFormComponent } from './features/student/student-form/student-form.component';
import { TeacherListComponent } from './features/teacher/teacher-list/teacher-list.component';
import { TeacherFormComponent } from './features/teacher/teacher-form/teacher-form.component';
import { CourseListComponent } from './features/course/course-list/course-list.component';
import { CourseFormComponent } from './features/course/course-form/course-form.component';
import { RegistrationFormComponent } from './features/registration/registration-form/registration-form.component';
import { RegistrationListComponent } from './features/registration/registration-list/registration-list.component';
import { AssignmentListComponent } from './features/assignment/assignment-list/assignment-list.component';
import { AssignmentFormComponent } from './features/assignment/assignment-form/assignment-form.component';
import { CourseTeachersListComponent } from './features/course-teachers/course-teachers-list/course-teachers-list.component';
import { CourseTeachersFormComponent } from './features/course-teachers/course-teachers-form/course-teachers-form.component';
import { FinalresultformComponent } from './features/finalresult/finalresultform/finalresultform.component';
import { FinalresultlistComponent } from './features/finalresult/finalresultlist/finalresultlist.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'studentlist', component: StudentListComponent },
//   { path: 'studentform', component: StudentFormComponent },
//   { path: 'studentform/:id', component: StudentFormComponent },
//   { path: 'teacherlist', component: TeacherListComponent },
//   { path: 'teacherform', component: TeacherFormComponent },
//   { path: 'teacherform/:id', component: TeacherFormComponent },
//   { path: 'courselist', component: CourseListComponent },
//   { path: 'courseform', component: CourseFormComponent },
//   { path: 'courseform/:id', component: CourseFormComponent },
//   { path: 'registrationform', component: RegistrationFormComponent },
//   { path: 'registrationlist', component: RegistrationListComponent },
//   { path: 'assignmentslist', component: AssignmentListComponent },
//   { path: 'assignmentform', component: AssignmentFormComponent },
//   { path: 'assignmentform/:id', component: AssignmentFormComponent },
//   { path: 'courseteacherslist', component: CourseTeachersListComponent },
//   { path: 'course-teachers-form', component: CourseTeachersFormComponent },
//   { path: 'course-teachers-form/:id', component: CourseTeachersFormComponent },
//   { path: 'finalresultlist', component: FinalresultlistComponent },
//   { path: 'finalresultform', component: FinalresultformComponent },
//   { path: 'finalresultform/:id', component: FinalresultformComponent },
//   { path: '', redirectTo: '/courselist', pathMatch: 'full' },
//   { path: '', redirectTo: '/teacherlist', pathMatch: 'full' },
//   { path: '', redirectTo: '/stuentlist', pathMatch: 'full' },
//   { path: '', redirectTo: '/finalresultlist', pathMatch: 'full' },
// ];

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'studentlist', component: StudentListComponent },
      { path: 'studentform', component: StudentFormComponent },
      { path: 'studentform/:id', component: StudentFormComponent },
      { path: 'teacherlist', component: TeacherListComponent },
      { path: 'teacherform', component: TeacherFormComponent },
      { path: 'teacherform/:id', component: TeacherFormComponent },
      { path: 'courselist', component: CourseListComponent },
      { path: 'courseform', component: CourseFormComponent },
      { path: 'courseform/:id', component: CourseFormComponent },
      { path: 'registrationform', component: RegistrationFormComponent },
      { path: 'registrationlist', component: RegistrationListComponent },
      { path: 'assignmentslist', component: AssignmentListComponent },
      { path: 'assignmentform', component: AssignmentFormComponent },
      { path: 'assignmentform/:id', component: AssignmentFormComponent },
      { path: 'courseteacherslist', component: CourseTeachersListComponent },
      { path: 'course-teachers-form', component: CourseTeachersFormComponent },
      {
        path: 'course-teachers-form/:id',
        component: CourseTeachersFormComponent,
      },
      { path: 'finalresultlist', component: FinalresultlistComponent },
      { path: 'finalresultform', component: FinalresultformComponent },
      { path: 'finalresultform/:id', component: FinalresultformComponent },
    ],
  },

  // fallback route
  { path: '**', redirectTo: '' },
];
