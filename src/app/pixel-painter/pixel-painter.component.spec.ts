import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelPainterComponent } from './pixel-painter.component';

describe('PixelPainterComponent', () => {
  let component: PixelPainterComponent;
  let fixture: ComponentFixture<PixelPainterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelPainterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelPainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
