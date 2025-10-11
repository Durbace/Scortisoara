import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipuriComponent } from './tipuri.component';

describe('TipuriComponent', () => {
  let component: TipuriComponent;
  let fixture: ComponentFixture<TipuriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipuriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
