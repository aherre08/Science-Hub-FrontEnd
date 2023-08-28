import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicationComponent } from './edit-publication.component';

describe('EditPublicationComponent', () => {
  let component: EditPublicationComponent;
  let fixture: ComponentFixture<EditPublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPublicationComponent]
    });
    fixture = TestBed.createComponent(EditPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
