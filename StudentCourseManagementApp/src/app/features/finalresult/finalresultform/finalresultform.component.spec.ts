import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalresultformComponent } from './finalresultform.component';

describe('FinalresultformComponent', () => {
  let component: FinalresultformComponent;
  let fixture: ComponentFixture<FinalresultformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalresultformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalresultformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
