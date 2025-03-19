import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeachersListComponent } from './course-teachers-list.component';

describe('CourseTeachersListComponent', () => {
  let component: CourseTeachersListComponent;
  let fixture: ComponentFixture<CourseTeachersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTeachersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseTeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
