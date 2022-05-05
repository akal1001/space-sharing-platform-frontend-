import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesviewComponent } from './imagesview.component';

describe('ImagesviewComponent', () => {
  let component: ImagesviewComponent;
  let fixture: ComponentFixture<ImagesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
