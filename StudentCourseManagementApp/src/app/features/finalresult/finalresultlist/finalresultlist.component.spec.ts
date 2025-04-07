import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalresultlistComponent } from './finalresultlist.component';

describe('FinalresultlistComponent', () => {
  let component: FinalresultlistComponent;
  let fixture: ComponentFixture<FinalresultlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalresultlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalresultlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
