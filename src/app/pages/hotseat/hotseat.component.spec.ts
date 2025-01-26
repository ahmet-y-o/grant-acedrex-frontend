import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotseatComponent } from './hotseat.component';

describe('HotseatComponent', () => {
  let component: HotseatComponent;
  let fixture: ComponentFixture<HotseatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotseatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotseatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
