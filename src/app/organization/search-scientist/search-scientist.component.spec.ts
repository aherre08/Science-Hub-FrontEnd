import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchScientistComponent } from './search-scientist.component';

describe('SearchScientistComponent', () => {
  let component: SearchScientistComponent;
  let fixture: ComponentFixture<SearchScientistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchScientistComponent]
    });
    fixture = TestBed.createComponent(SearchScientistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
