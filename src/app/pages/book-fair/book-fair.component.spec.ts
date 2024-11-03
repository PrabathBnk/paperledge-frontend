import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFairComponent } from './book-fair.component';

describe('BookFairComponent', () => {
  let component: BookFairComponent;
  let fixture: ComponentFixture<BookFairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
