import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgersCornerComponent } from './ledgers-corner.component';

describe('LedgersCornerComponent', () => {
  let component: LedgersCornerComponent;
  let fixture: ComponentFixture<LedgersCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgersCornerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgersCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
