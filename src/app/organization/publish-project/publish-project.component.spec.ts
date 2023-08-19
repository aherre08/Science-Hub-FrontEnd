import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishProjectComponent } from './publish-project.component';

describe('PublishProjectComponent', () => {
  let component: PublishProjectComponent;
  let fixture: ComponentFixture<PublishProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishProjectComponent]
    });
    fixture = TestBed.createComponent(PublishProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
