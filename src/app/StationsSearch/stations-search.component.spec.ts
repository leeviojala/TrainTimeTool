import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsSearchComponent } from './stations-search.component';

describe('TabViewComponent', () => {
  let component: StationsSearchComponent;
  let fixture: ComponentFixture<StationsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
