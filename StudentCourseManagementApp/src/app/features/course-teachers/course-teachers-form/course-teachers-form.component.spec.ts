import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeachersFormComponent } from './course-teachers-form.component';

describe('CourseTeachersFormComponent', () => {
  let component: CourseTeachersFormComponent;
  let fixture: ComponentFixture<CourseTeachersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTeachersFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseTeachersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
