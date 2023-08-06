import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestProjectsComponent } from './suggest-projects.component';

describe('SuggestProjectsComponent', () => {
  let component: SuggestProjectsComponent;
  let fixture: ComponentFixture<SuggestProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestProjectsComponent]
    });
    fixture = TestBed.createComponent(SuggestProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
