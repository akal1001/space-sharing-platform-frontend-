import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmeharicComponent } from './ameharic.component';

describe('AmeharicComponent', () => {
  let component: AmeharicComponent;
  let fixture: ComponentFixture<AmeharicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmeharicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmeharicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
