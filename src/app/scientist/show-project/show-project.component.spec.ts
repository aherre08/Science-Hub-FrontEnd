import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectComponent } from './show-project.component';

describe('ShowProjectComponent', () => {
  let component: ShowProjectComponent;
  let fixture: ComponentFixture<ShowProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProjectComponent]
    });
    fixture = TestBed.createComponent(ShowProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
