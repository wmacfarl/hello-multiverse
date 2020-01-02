import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilePaletteBrowserComponent } from './tile-palette-browser.component';

describe('TilePaletteBrowserComponent', () => {
  let component: TilePaletteBrowserComponent;
  let fixture: ComponentFixture<TilePaletteBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TilePaletteBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilePaletteBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
