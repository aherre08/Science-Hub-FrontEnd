import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestScientistsComponent } from './suggest-scientists.component';

describe('SuggestScientistsComponent', () => {
  let component: SuggestScientistsComponent;
  let fixture: ComponentFixture<SuggestScientistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestScientistsComponent]
    });
    fixture = TestBed.createComponent(SuggestScientistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
