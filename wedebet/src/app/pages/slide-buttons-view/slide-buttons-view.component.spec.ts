import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideButtonsViewComponent } from './slide-buttons-view.component';

describe('SlideButtonsViewComponent', () => {
  let component: SlideButtonsViewComponent;
  let fixture: ComponentFixture<SlideButtonsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideButtonsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideButtonsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
