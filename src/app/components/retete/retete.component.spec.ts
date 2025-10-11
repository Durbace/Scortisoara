import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReteteComponent } from './retete.component';

describe('ReteteComponent', () => {
  let component: ReteteComponent;
  let fixture: ComponentFixture<ReteteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReteteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReteteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
