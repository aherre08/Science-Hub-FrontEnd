import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowScientistComponent } from './show-scientist.component';

describe('ShowScientistComponent', () => {
  let component: ShowScientistComponent;
  let fixture: ComponentFixture<ShowScientistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowScientistComponent]
    });
    fixture = TestBed.createComponent(ShowScientistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
