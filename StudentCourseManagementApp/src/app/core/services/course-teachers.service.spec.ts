import { TestBed } from '@angular/core/testing';

import { CourseTeachersService } from './course-teachers.service';

describe('CourseTeachersService', () => {
  let service: CourseTeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTeachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
